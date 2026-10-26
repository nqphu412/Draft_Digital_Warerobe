import express from "express";
import {
  getGarments,
  getGarmentById,
  createGarment,
  updateGarment,
} from "../controllers/garmentController.js";
import { isAuthenticatedUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Secure all garment routes with auth middleware
router.use(isAuthenticatedUser);

router.route("/")
  .get(getGarments)
  .post(createGarment);

router.route("/:id")
  .get(getGarmentById)
  .put(updateGarment)

export default router;