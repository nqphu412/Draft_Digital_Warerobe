import mongoose from "mongoose";

const OutfitSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: false,
      trim: true,
      maxLength: [200, "Item name cannot exceed 200 characters"],
    },
    occassion: {
      type: String,
      enum: ["Casual", "Formal", "Party", "Sport", "Other"],
      default: "Casual",
      index: true,
    },
    items: [
      {
        garmentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
          required: true,
        },
      },
    ],
    previewImageUrl: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

const Outfit = mongoose.model("Outfit", OutfitSchema);
export default Outfit;