// Importing libraries
import express from "express";
import trimRequest from "trim-request";

// Importing controllers
import { registerController,loginController, refreshTokenController } from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/register").post(trimRequest.all,registerController);
router.route("/login").post(trimRequest.all,loginController);
router.route("/refreshtoken").post(trimRequest.all,refreshTokenController);


export default router;