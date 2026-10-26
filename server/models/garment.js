import mongoose from "mongoose";

const GarmentSchema = new mongoose.Schema(
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
    category: {
      type: String,
      required: true,
      enum: ["Tops", "Bottoms", "Dresses", "Hat", "Footwear", "Accessory"],
      index: true,
    },
    colour: {
      type: String,
      enum: [
        "Black",
        "White",
        "Pink",
        "Blue",
        "Grey",
        "Green",
        "Red",
        "Yellow",
        "Brown",
        "Purple",
        "Orange",
      ],
    },
    originalImageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Garment = mongoose.model("Garment", GarmentSchema);
export default Garment;