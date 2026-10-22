import express from "express";
import {
  getOutfits,
  getOutfitById,
  createOutfit,
  updateOutfit,
} from "../controllers/outfitController.js";
import { isAuthenticatedUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Secure all garment routes with auth middleware
router.use(isAuthenticatedUser);

router.route("/")
  .get(getOutfits)
  .post(createOutfit);

router.route("/:id")
  .get(getOutfitById)
  .put(updateOutfit)

export default router;