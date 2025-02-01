const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../db/models/user.model"); // Corrected path

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
    try {
        const { 
            username, 
            email, 
            password, 
            location, 
            userType,
            registrationNumber,
            registrationYear,
            councilName
        } = req.body;

        // Validate input
        if (!username || !email || !password || !location || !userType) {
            return res.status(400).json({ 
                message: "Please enter all required fields" 
            });
        }

        // Validate doctor-specific fields
        if (userType === 'doctor' && (!registrationNumber || !registrationYear || !councilName)) {
            return res.status(400).json({
                message: "Please enter all required doctor fields"
            });
        }

        // Check if username or email exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Username or email already exists",
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user with all fields
        const user = new User({
            username,
            email,
            password: hashedPassword,
            location,
            userType,
            ...(userType === 'doctor' && {
                registrationNumber,
                registrationYear,
                councilName
            })
        });

        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );

        // Send response without password
        const userResponse = {
            id: user._id,
            username: user.username,
            email: user.email,
            location: user.location,
            userType: user.userType,
            ...(user.userType === 'doctor' && {
                registrationNumber: user.registrationNumber,
                registrationYear: user.registrationYear,
                councilName: user.councilName
            })
        };

        res.status(201).json({
            token,
            user: userResponse
        });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            message: "Server error during signup",
            error: error.message
        });
    }
});

// Signin Route
router.post("/signin", async (req, res) => {
	try {
		const { username, password } = req.body;

		// Find user by username
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		// Check password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		// Generate JWT token
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		res.json({
			token,
			user: {
				id: user._id,
				username: user.username,
				email: user.email,
			},
		});
	} catch (error) {
		res.status(500).json({
			message: "Server error",
			error: error.message,
		});
	}
});

module.exports = router;
