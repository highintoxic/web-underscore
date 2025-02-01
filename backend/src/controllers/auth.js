const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { successResponse, errorResponse, validationErrorResponse } = require("../utils/response");

/**
 * User signup controller
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const signup = async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json(validationErrorResponse(["Username and password are required"]));
	}

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({ username, password: hashedPassword });
		await user.save();
		return res.status(201).json(successResponse(null, "User created successfully"));
	} catch (error) {
		console.error("Signup Error:", error.message);
		if (error.code === 11000) {
			return res.status(400).json(errorResponse("Username already exists"));
		}
		return res.status(500).json(errorResponse("Internal Server Error"));
	}
};

/**
 * User signin controller
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const signin = async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json(validationErrorResponse(["Username and password are required"]));
	}

	try {
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(401).json(errorResponse("Invalid credentials"));
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json(errorResponse("Invalid credentials"));
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
		return res.status(200).json(successResponse({ token }, "Signin successful"));
	} catch (error) {
		console.error("Signin Error:", error.message);
		return res.status(500).json(errorResponse("Internal Server Error"));
	}
};

module.exports = { signup, signin };
