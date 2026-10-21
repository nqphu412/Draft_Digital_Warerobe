import express from "express";
const router = express.Router();
const { isAuthenticatedUser } = require("../middlewares/authMiddleware");
const { register, login, logout, getMe } = require("../controllers/authController");

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/me",isAuthenticatedUser, getMe);

export default router;
