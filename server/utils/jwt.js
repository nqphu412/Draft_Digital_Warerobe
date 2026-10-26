import jwt from "jsonwebtoken";

export const generateAccessToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES || "7d"
        }
    );
};

export const generateRefreshToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
        {
            expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES || "30d"
        }
    );
};