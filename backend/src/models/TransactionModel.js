import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;


const transactionSchema = new mongoose.Schema({
    sender: {
        type: ObjectId,
        ref: 'UserModel',
        required: true
    },
    receiver: {
        type: ObjectId,
        ref: 'UserModel',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['credit', 'debit'],
        required: true
    },
    description: {
        type: String
    },
}, {
	collection: "transactions",
	timestamps: true,
});


const TransactionModel = mongoose.models.transactionSchema || mongoose.model("TransactionModel", transactionSchema);
export default TransactionModel;