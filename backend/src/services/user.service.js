// Importing libraries
import createHttpError from "http-errors";
import validator from "validator";

// Importing models
import { UserModel } from "../models/index.js";


export const updateProfile = async (user_id, userDetails) => {
	const { name, email, picture, password } = userDetails;
	console.log("userDetails!! ====================> ", userDetails);

	let updatedDetails = {};

	// Check if name is valid
	if (name && validator.isLength(name, {
		min: 2,
		max: 16
	})) {
		updatedDetails.name = name;
	}

	// Check if email is valid
	if (email && validator.isEmail(email)) {
		updatedDetails.email = email;
	}

	// Check password length
	if (password && validator.isLength(password, {
		min: 6,
		max: 128
	})) {
		updatedDetails.password = password;
	}

	// Check picture
	if (picture) {
		updatedDetails.picture = picture;
	}

	const user = await UserModel.findById(user_id);

	if (!user) {
		throw createHttpError.NotFound("User not found.");
	}


	// Updating user object (Inside that we have current user's details)
	Object.keys(updatedDetails).forEach((key) => {
		if (updatedDetails[key] !== undefined && updatedDetails[key] !== null && updatedDetails[key] !== "") {
			user[key] = updatedDetails[key];
		}
	});

	console.log("USER ====================> ", user);
	console.log("updatedDetails ====================> ", updatedDetails);

	const updatedUserData = await user.save();

	return updatedUserData;
}


export const findUser = async (userId) => {
	const user = await UserModel.findById(userId);
	if (!user) throw createHttpError.BadRequest("Please fill all fields.");
	return user;
}