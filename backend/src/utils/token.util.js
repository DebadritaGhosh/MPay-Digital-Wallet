// Importing libraries
import jwt from "jsonwebtoken";

// Importing configs
import logger from "../configs/logger.config.js";

// Making jwt asynchronous
export const sign = async (payload, expiresIn, secret) => {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, secret, {
			expiresIn: expiresIn
		}, (error, token) => {
			if (error) {
				reject(error);
				logger.error(error);
			} else {
				resolve(token);
			}
		})
	});
}


export const verify = async (token, secret) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, secret, (error, payload) => {
			if (error) {
				logger.error(error);
				resolve(null);
			} else {
				resolve(payload);
			}
		});
	});
}