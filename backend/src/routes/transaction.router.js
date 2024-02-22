// Importing libraries
import express from "express";
import trimRequest from "trim-request";

// Importing controllers
import { addMoneyController,verifyController,sendMoneyController,fetchTransactionsController } from "../controllers/transaction.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/add-money").post(trimRequest.all,authMiddleware, addMoneyController);
router.route("/verify-payment").post(trimRequest.all,authMiddleware, verifyController);
router.route("/send").post(trimRequest.all,authMiddleware, sendMoneyController);
router.route("/get-transactions").get(trimRequest.all,authMiddleware, fetchTransactionsController);


export default router;