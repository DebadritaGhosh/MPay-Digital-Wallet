// Import libraries
import express from "express";

// Import Routes
import authRouter from "./auth.router.js";

// app
const router = express.Router();

router.use('/auth',authRouter);


export default router;