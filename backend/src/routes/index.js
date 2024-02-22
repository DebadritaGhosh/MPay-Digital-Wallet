// Import libraries
import express from "express";

// Import Routes
import authRouter from "./auth.router.js";
import transactionRouter from "./transaction.router.js";
import userRouter from "./user.router.js";

// router
const router = express.Router();

router.use('/auth',authRouter);
router.use('/transaction',transactionRouter);
router.use('/users',userRouter);


export default router;