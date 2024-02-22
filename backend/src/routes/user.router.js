// Importing libraries
import express from "express";
import trimRequest from "trim-request";

// Importing controllers
import { searchController, balanceController } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/search").get(trimRequest.all,authMiddleware, searchController);
router.route("/balance").get(trimRequest.all,authMiddleware, balanceController);


export default router;