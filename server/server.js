import express from "express";
import { connectDatabase } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import cors from "cors";

//Package helps load environment variables from a local .env into Node.js's process.env object
import dotenv from "dotenv";
dotenv.config();

//Initialize express app
const app = express();
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  }),
);
app.use(express.json());

//Register all routes
app.use("/api/auth", authRoutes);

//Connect MongoDB before listening to requests
const PORT = process.env.APP_PORT || 3000;
async function startServer() {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
