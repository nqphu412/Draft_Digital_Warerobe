import Garment from "../models/garment.js";
import Outfit from "../models/outfit.js";

// GET /api/garments
export const getGarments = async (req, res) => {
    try {
        const { category, colour } = req.query;

        //isolate query to only garments owned by current user
        let query = { userId: req.user.id };

        //apply category and colour filter
        if (category) {
            query.category = category;
        }
        
        if (colour) {
            query.colour = colour;
        }

        const garments = await Garment.find(query).sort({ createdAt: -1 });

        return res.status(200).json({
            status: "success",
            results: garments.length,
            data: garments,
        });
    } catch (error) {
        console.error("getGarments error: ", error);
        return res.status(500).json({
            status: "error",
            message: "Failed to retrieve closet items.",
        });
    }
};

//GET /api/garments/:id
export const getGarmentById = async (req, res) => {
    try {
        const garment = await Garment.findOne({
            _id: req.params.id,
            userId: req.user.id,
        });

        if (!garment) {
            return res.status(404).json({
                status: "error",
                message: "Garment not found or unauthorised.",
            });
        }

        return res.status(200).json({
            status: "success",
            data: garment,
        });
    } catch (error) {
        console.error("getGarmentById error: ", error);
        return res.status(500).json({
            status: "error",
            message: "Failed to retrieve garment details.",
        });
    }
};

//POST /api/garments
export const createGarment = async (req, res) => {
    try {
        const { name, category, colour, originalImageUrl } = req.body;
        
        if (!category || !originalImageUrl) {
            return res.status(400).json({
                status: "error",
                message: "Category and original image URL are required.",
            });
        }

        const newGarment = await Garment.create({
            userId: req.user.id,
            name, category, colour, originalImageUrl,
        });

        return res.status(201).json({
            status: "success",
            message: "Garment added successfully.",
            data: newGarment,
        });
    } catch (error) {
        console.error("createGarment error: ", error);
        return res.status(400).json({
            status: "error",
            message: error.message || "Failed to create garment.",
        });
    }
};

//PUT /api/garments/:id
export const updateGarment = async (req, res) => {
    try {
        const { name, category, colour, originalImageUrl } = req.body;

        const garment = await Garment.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { name, category, colour, originalImageUrl },
            { new: true, runValidators: true }
        );

        if (!garment) {
            return res.status(404).json({
                status: "error",
                message: "Garment not found or unauthorised.",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Garment updated successfully.",
            data: garment,
        });
    } catch (error) {
        console.error("updateGarment error: ", error);
        return res.status(400).json({
            status: "error",
            message: error.message || "Failed to update garment.",
        });
    }
};