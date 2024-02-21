// Importing services
import { generateToken, verifyToken } from "../services/token.service.js";
import { createUser, signUser } from "../services/auth.service.js";
import { findUser } from "../services/user.service.js";

// Register controller
export const registerController = async (req, res, next) => {
    try {
        const { name, email, picture, password } = req.body;
        const newUser = await createUser({ name, email, picture, password });
        const access_token = await generateToken({ userId: newUser._id }, "1d", process.env.ACCESS_TOKEN_SECRET);
        const refresh_token = await generateToken({ userId: newUser._id }, "30d", process.env.REFRESH_TOKEN_SECRET);
        res.cookie('refreshtoken', refresh_token, {
            httpOnly: true,
            path: "/api/v1/auth/refreshtoken",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        console.table({ access_token, refresh_token });

        res.status(201).json({
            message: "registration success.",
            status: "ok",
            data: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                picture: newUser.picture,
                access_token: access_token,
                refresh_token: refresh_token,
            }
        });
    } catch (error) {
        next(error);
    }
}

// Login controller
export const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await signUser({ email, password });
        console.log(user);

        const access_token = await generateToken({ userId: user._id }, "1d", process.env.ACCESS_TOKEN_SECRET);
        const refresh_token = await generateToken({ userId: user._id }, "30d", process.env.REFRESH_TOKEN_SECRET);

        // res.cookie('refreshtoken', refresh_token, {
        //     httpOnly: true,
        //     path: "/api/v1/auth/refreshtoken",
        //     maxAge: 30 * 24 * 60 * 60 * 1000,
        // });


        res.status(200).json({
            message: "login success.",
            status: "ok",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture,
                access_token: access_token,
                refresh_token: refresh_token,
            }
        });

    } catch (error) {
        next(error);
    }
}


export const refreshTokenController = async (req, res, next) => {
	try {
        const { refresh_token } = req.body;
		if (!refresh_token) throw createHttpError.Unauthorized("Please login");
		const check = await verifyToken(refresh_token, process.env.REFRESH_TOKEN_SECRET);
		const user = await findUser(check.userId);
		const access_token = await generateToken({ userId: user._id }, "1d", process.env.ACCESS_TOKEN_SECRET);
		res.status(200).json({
            message: "Access token generation success.",
            status: "ok",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture,
                access_token: access_token,
                refresh_token: refresh_token,
            }
        });
	} catch (error) {
		next(error);
	}
}


export const forgetPasswordController = async () => {
    console.log("Forget Password Controller");
}