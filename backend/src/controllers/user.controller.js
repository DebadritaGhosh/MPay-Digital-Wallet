import { UserModel } from "../models/index.js";


export const searchController = async (req, res, next) => {

	try {

		const { query, page = 1, limit = 10 } = req.query;
		const pageNumber = parseInt(page);
		const limitNumber = parseInt(limit);
		const skip = (pageNumber - 1) * limitNumber;

		// Creating a query object for searching by email or phone number
		const searchQuery = {
			$or: [
				{ email: { $regex: query, $options: 'i' } },
				{ phone_number: { $regex: query, $options: 'i' } }
			]
		};

		// Projection to include only specified fields
		const projection = { _id: 1, name: 1, email: 1, picture: 1, phone_number: 1 };

		// Finding users matching the search query with pagination
		const users = await UserModel.find(searchQuery, projection)
			.skip(skip)
			.limit(limitNumber);

		// Counting total matching users (for pagination)
		const totalUsers = await UserModel.countDocuments(searchQuery);

		// Calculating total pages
		const totalPages = Math.ceil(totalUsers / limitNumber);

		return res.status(200).json({
			users,
			currentPage: pageNumber,
			totalPages,
			totalUsers
		});

	} catch (error) {

		console.error("Error searching users:", error);
		return res.status(500).json({ message: "Internal server error" });

	}

}


export const balanceController = async (req, res) => {

    try {

        const userId = req.user.userId;

        // Findng user by userId
        const user = await UserModel.findById(userId);

        // Checking if the user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Returning the user's balance
        return res.status(200).json({ balance: user.balance });

    } catch (error) {

        console.error("Error checking user's balance:", error);
        return res.status(500).json({ message: "Internal server error" });

    }
	
}