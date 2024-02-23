// Importing systems
import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from 'crypto';
import createHttpError from "http-errors";

// Importing services
import { findUser } from "../services/user.service.js";

// Importing models
import TransactionModel from "../models/TransactionModel.js";

// Using dotenv
dotenv.config();

// Importing and initializing Razorpay with api key and secret
const razorpay = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_KEY_SECRET
});


export const addMoneyController = async (req, res) => {
	try {
		const { amount } = req.body;
		const userId = req.user.userId;

		// Checking if userId and amount are provided
		if (!userId || !amount) {
			throw createHttpError.BadRequest("userId and amount are required");
		}

		// Finding the user by ID
		// const user = await UserModel.findById(userId);
		const user = await findUser(userId);

		// Checking if user exists
		if (!user) {
			throw createHttpError.NotFound("User not found");
		}

		// Creating a Razorpay payment order
		const options = {
			amount: amount * 100,
			currency: 'INR',
			receipt: crypto.randomBytes(10).toString("hex"),
			payment_capture: 1 // Automatically capturing the payment when it's authorized
		};

		const paymentOrder = await razorpay.orders.create(options);

		return res.status(200).json({ paymentOrder });

	} catch (error) {
		next(error);
	}
}


export const verifyController = async (req, res) => {
	try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount } = req.body;
		const userId = req.user.userId;


		if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !amount) {
			throw createHttpError.BadRequest("all fields are required");
		}

		const sign = razorpay_order_id + '|' + razorpay_payment_id;
		const expectedSign = crypto.createHmac("sha256", process.env.KEY_SECRET).update(sign.toString()).digest("hex");
		if (razorpay_signature === expectedSign) {

			const user = await findUser(userId);

			if (!user) {
				throw createHttpError.NotFound("User not found");
			}

			// Adding Razorpay details
			user.razorpay_details.push({
				razorpay_order_id,
				razorpay_payment_id,
				razorpay_signature
			});

			await user.save();

			res.status(200).json({
				message: "Payment successful",
				status: "ok",
				data: {
					razorpay_order_id,
					razorpay_payment_id,
					razorpay_signature
				}
			});

		}
		else {
			throw createHttpError.BadRequest("Payment unsuccessful");
		}
	} catch (error) {
		next(error);
	}
}

// sendMoneyController controller
export const sendMoneyController = async (req, res, next) => {
	try {
		const { receiverId, amount } = req.body;
		const senderId = req.user.userId;

		// Finding sender and receiver
		const sender = await findUser(senderId);
		const receiver = await findUser(receiverId);

		// Checking if sender and receiver exist
		if (!sender || !receiver) {
			throw createHttpError.NotFound("Sender or receiver not found");
		}

		// Checking if sender has sufficient balance
		if (sender.balance < amount) {
			throw createHttpError.BadRequest("Insufficient balance");
		}

		// Deducting amount from sender and add to receiver
		sender.balance -= parseInt(amount);
		receiver.balance += parseInt(amount);

		// Saving sender and receiver
		await sender.save();
		await receiver.save();

		// Creating transaction record
		const transaction = new TransactionModel({
			sender: sender._id,
			receiver: receiver._id,
			amount: amount,
			type: 'debit',
			description: 'Fund Send'
		});
		await transaction.save();

		// Creating reverse transaction for receiver
		const reverseTransaction = new TransactionModel({
			sender: sender._id,
			receiver: receiver._id,
			amount: amount,
			type: 'credit',
			description: 'Fund Received'
		});
		await reverseTransaction.save();


		res.status(200).json({
			message: "Funds transferred successfully",
			status: "ok",
			data: {
				sender: sender._id,
				receiver: receiver._id,
				amount: amount,
			}
		});


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