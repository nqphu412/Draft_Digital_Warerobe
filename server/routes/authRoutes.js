import express from "express";
const router = express.Router();
import { isAuthenticatedUser } from "../middlewares/authMiddleware.js";
import { register, login, logout, getMe } from "../controllers/authController.js";

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/me",isAuthenticatedUser, getMe);

export default router;
