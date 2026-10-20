import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

const router = express.Router();

// POST /api/register
router.post("/register", async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;

    // All information must be filled
    if (!username || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Please fill all information.",
      });
    }

    // Check if someone else used that username
    const existingUser = await User.findOne({
      username: username,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "This username is already used.",
      });
    }

    // Check password match confirmPassword
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match.",
      });
    }

    // Create new user account
    const harshedPassword = await bcrypt.hash(password, 11);
    const newUser = new User({
      username: username.trim().toLowerCase(),
      password: harshedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      message: "Account registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      message: "Register account is not available at the moment.",
    });
  }
});

// POST /api/login
//router.post();

// POST /api/me
//router.post();

export default router;
