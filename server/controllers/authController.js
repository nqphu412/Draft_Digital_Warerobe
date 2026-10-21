import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { generateAccessToken } from "../utils/jwt.js";
import { baseCookieOptions } from "../utils/cookieOptions.js";

// POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;

    if (!username || !password || !confirmPassword) {
      return res.status(400).json({ message: "Please fill all information." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const formattedUsername = username.trim().toLowerCase();

    // Check existing username (case-insensitive)
    const existingUser = await User.findOne({ username: formattedUsername });
    if (existingUser) {
      return res.status(409).json({ message: "This username is already taken." });
    }

    // Hash password and SAVE user to Database
    const hashedPassword = await bcrypt.hash(password, 11);
    const newUser = new User({
      username: formattedUsername,
      password: hashedPassword,
    });
    
    await newUser.save();

    // Create JWT Token & Set Cookie
    const token = generateAccessToken(newUser._id);
    res.cookie("token", token, baseCookieOptions);

    return res.status(201).json({
      message: "Account registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Register service unavailable." });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Please fill all information." });
    }

    const formattedUsername = username.trim().toLowerCase();
    const matchingUser = await User.findOne({ username: formattedUsername });

    if (!matchingUser) {
      return res.status(404).json({ message: "Account does not exist." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, matchingUser.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    const token = generateAccessToken(matchingUser._id);
    res.cookie("token", token, baseCookieOptions);

    return res.status(200).json({
      message: "Login successful.",
      user: { id: matchingUser._id, username: matchingUser.username },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Login service unavailable." });
  }
};

// POST /api/auth/logout
export const logout = (req, res) => {
  res.clearCookie("token", baseCookieOptions);
  return res.status(200).json({
    status: "success",
    message: "Successfully logged out",
  });
};

// GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ status: "error", message: "Cannot find user" });
    }

    return res.status(200).json({ status: "success", user });
  } catch (error) {
    console.error("GetMe Error:", error);
    return res.status(500).json({ status: "error", message: "SERVER SIDE ERROR" });
  }
};