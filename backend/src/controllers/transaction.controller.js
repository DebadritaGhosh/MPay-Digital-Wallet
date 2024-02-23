import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from 'crypto';

// Importing services
import { findUser } from "../services/user.service.js";

// Importing models
import TransactionModel from "../models/TransactionModel.js";
import UserModel from "../models/UserModel.js";

// Using dotenv
dotenv.config();

// Initialize Razorpay with your Razorpay API key and secret
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});




export const addMoneyController = async (req, res) => {
    try {
        const { amount } = req.body;
		const userId = req.user.userId;

        // Check if userId and amount are provided
        if (!userId || !amount) {
            return res.status(400).json({ message: "userId and amount are required" });
        }

        // Find the user by ID
        const user = await UserModel.findById(userId);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create a Razorpay payment order
        const options = {
            amount: amount * 100,
            currency: 'INR',
            receipt: `wallet_${userId}`,
            payment_capture: 1 // Automatically capture the payment when it's authorized
        };
        const paymentOrder = await razorpay.orders.create(options);
        
        return res.status(200).json({ paymentOrder });
    } catch (error) {
        console.error("Error creating Razorpay payment order:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const verifyController = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto.createHmac("sha256", process.env.KEY_SECRET).update(sign.toString()).digest("hex");
        if (razorpay_signature === expectedSign) {
            return res.json({ "message": "Payment Verified Successful", "status": 200, "data": req.body });
        }
        else {
            return res.json({ "message": "Payment Verified Unccessful", "status": 500 });
        }
    } catch (error) {

        next(error);

    }
}

// sendMoneyController controller
export const sendMoneyController = async (req, res, next) => {
	try {
		const { receiverId, senderId, amount } = req.body;

		// console.log("IN 1st")

		// Find sender and receiver
		const sender = await findUser(senderId);
		const receiver = await findUser(receiverId);

		// Check if sender and receiver exist
		if (!sender || !receiver) {
			return res.status(404).json({ message: "Sender or receiver not found" });
		}

		// Check if sender has sufficient balance
		if (sender.balance < amount) {
			return res.status(400).json({ message: "Insufficient balance" });
		}

		// Deduct amount from sender and add to receiver
		sender.balance -= amount;
		receiver.balance += amount;

		// Save sender and receiver
		await sender.save();
		await receiver.save();

		// Create transaction record
		const transaction = new TransactionModel({
			sender: sender._id,
			receiver: receiver._id,
			amount,
			type: 'debit', // Sender's perspective
			description: 'Funds Transfer'
		});
		await transaction.save();

		// Create reverse transaction for receiver
		const reverseTransaction = new TransactionModel({
			sender: sender._id,
			receiver: receiver._id,
			amount,
			type: 'credit', // Receiver's perspective
			description: 'Funds Received'
		});
		await reverseTransaction.save();

		return res.status(200).json({ message: "Funds transferred successfully" });
	} catch (error) {
		
        next(error);

	}
}

// 
export const fetchTransactionsController = async (req, res) => {
	try {

		const userId = req.user.userId;

		// Finding all transactions involving the user
		const transactions = await TransactionModel.find({
			$or: [{ sender: userId }, { receiver: userId }]
		}).populate('sender receiver', 'name email');

		return res.status(200).json({ transactions });

	} catch (error) {

        next(error);

	}
}