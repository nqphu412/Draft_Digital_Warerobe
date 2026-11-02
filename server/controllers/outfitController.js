import Garment from "../models/garment.js";
import Outfit from "../models/outfit.js";

const GARMENT_FIELDS = "name category colour originalImageUrl";

//check every garment in items exists and belongs to the user
const garmentsBelongToUser = async (items, userId) => {
    const uniqueIds = [...new Set(items.map((item) => String(item.garmentId)))];
    const validGarmentsCount = await Garment.countDocuments({
        _id: { $in: uniqueIds },
        userId,
    });
    return validGarmentsCount === uniqueIds.length;
};

//GET /api/outfits
export const getOutfits = async (req, res) => {
    try {
        const { occasion } = req.query;

        //isolate query to only outfits owned by current user
        let query = { userId: req.user.id };

        //apply occasion filter
        if (occasion) {
            query.occasion = occasion;
        }

        const outfits = await Outfit.find(query)
            .populate({ path: "items.garmentId", select: GARMENT_FIELDS })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            status: "success",
            results: outfits.length,
            data: outfits,
        });
    } catch (error) {
        console.error("getOutfits error: ", error);
        return res.status(500).json({
            status: "error",
            message: "Failed to retrieve outfits.",
        });
    }
};

//POST /api/outfits
export const createOutfit = async (req, res) => {
    try {
        const { name, occasion, items, previewImageUrl } = req.body;

        //validate items array
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                status: "error",
                message: "An outfit must contain at least one garment item.",
            });
        }

        //verify all garments in the array belong to the logged-in user
        if (!(await garmentsBelongToUser(items, req.user.id))) {
            return res.status(400).json({
                status: "error",
                message: "One or more selected garments do not exist or belong to another user.",
            });
        }

        const newOutfit = await Outfit.create({
            userId: req.user.id,
            name, occasion, items, previewImageUrl,
        });

        //populate garment details before returning
        await newOutfit.populate({ path: "items.garmentId", select: GARMENT_FIELDS });

        return res.status(201).json({
            status: "success",
            message: "Outfit added successfully.",
            data: newOutfit,
        });
    } catch (error) {
        console.error("createOutfit error: ", error);
        return res.status(400).json({
            status: "error",
            message: error.message || "Failed to create outfit.",
        });
    }
};

//GET /api/outfits/:id
export const getOutfitById = async (req, res) => {
    try {
        const outfit = await Outfit.findOne({
            _id: req.params.id,
            userId: req.user.id,
        }).populate({ path: "items.garmentId", select: GARMENT_FIELDS });

        if (!outfit) {
            return res.status(404).json({
                status: "error",
                message: "Outfit not found or unauthorised.",
            });
        }

        return res.status(200).json({
            status: "success",
            data: outfit,
        });
    } catch (error) {
        console.error("getOutfitById error: ", error);
        return res.status(500).json({
            status: "error",
            message: "Failed to get outfit.",
        });
    }
};

//PUT /api/outfits/:id
export const updateOutfit = async (req, res) => {
    try {
        const { name, occasion, items, previewImageUrl } = req.body;

        if (items !== undefined) {
            if (!Array.isArray(items) || items.length === 0) {
                return res.status(400).json({
                    status: "error",
                    message: "An outfit must contain at least one garment item.",
                });
            }

            if (!(await garmentsBelongToUser(items, req.user.id))) {
                return res.status(400).json({
                    status: "error",
                    message: "One or more garments belong to another user or do not exist.",
                });
            }
        }

        const outfit = await Outfit.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { name, occasion, items, previewImageUrl },
            { new: true, runValidators: true }
        ).populate({ path: "items.garmentId", select: GARMENT_FIELDS });

        if (!outfit) {
            return res.status(404).json({
                status: "error",
                message: "Outfit not found or unauthorised.",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Outfit updated successfully.",
            data: outfit,
        });
    } catch (error) {
        console.error("updateOutfit error: ", error);
        return res.status(400).json({
            status: "error",
            message: error.message || "Failed to update outfit.",
        });
    }
};

//DELETE /api/outfits/:id
export const deleteOutfit = async (req, res) => {
    try {
        const deletedOutfit = await Outfit.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id,
        });

        if (!deletedOutfit) {
            return res.status(404).json({
                status: "error",
                message: "Outfit not found or unauthorised.",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Outfit deleted successfully.",
        });
    } catch (error) {
        console.error("deleteOutfit error: ", error);
        return res.status(500).json({
            status: "error",
            message: "Failed to delete outfit.",
        });
    }
};
