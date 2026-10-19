import express from "express";
import { connectDatabase } from "./config/db.js";

//Package helps load environment variables from a local .env into Node.js's process.env object
import dotenv from "dotenv";
dotenv.config();

//Initialize express app
const app = express();
app.use(express.json());

//Connect MongoDB before listening to requests
connectDatabase();

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
