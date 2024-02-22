// Importing libraries
import createHttpError from "http-errors";
import validator from "validator";
import bcrypt from "bcrypt";

// Importing models
import { UserModel } from "../models/index.js";

const DEFAULT_PICTURE = "https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png"

export const createUser = async (userData) => {

	const { name, email, picture,phone_number, password } = userData;

	// Check if fields are empty
	if (!name || !email || !password) {
		throw createHttpError.BadRequest("Please fill all fields");
	}

	// Check name length
	if (!validator.isLength(name, {
		min: 2,
		max: 16
	})) {
		throw createHttpError.BadRequest("Please make sure your name in between 2 to 16 character");
	}

	// Check if email is valid
	if (!validator.isEmail(email)) {
		throw createHttpError.BadRequest("Please provide a valid email address.");
	}
	
	// Check if phone number is valid
	if (!validator.isMobilePhone(phone_number)) {
		throw createHttpError.BadRequest("Please provide a valid phone number.");
	}

	// Check if user already exists
	const checkDB = await UserModel.findOne({ email });

	if (checkDB) {
		throw createHttpError.Conflict("Please provide a different email address, This email already exists");
	}

	if (!validator.isLength(password, {
		min: 6,
		max: 128
	})) {
		throw createHttpError.BadRequest("Please make sure your password in between 6 to 128 character");
	}

	const user = await new UserModel({
		name,
		email,
		picture: picture || DEFAULT_PICTURE,
		phone_number,
		password
	}).save();

	return user;


}


export const signUser = async (userData) => {

	const { email, password } = userData;

	const user = await UserModel.findOne({email : email.toLowerCase()});
	// .exec().lean();
	
	// Check if email exists
	if(!user){
		throw createHttpError.BadRequest("Invalid credentials.");
	}

	// Compare password
	let passwordMatches = await bcrypt.compare(password, user.password);

	if(!passwordMatches){
		throw createHttpError.BadRequest("Invalid password.");
	}

	return user;
}