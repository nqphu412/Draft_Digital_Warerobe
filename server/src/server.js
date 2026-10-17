import express from "express";
import {connectDatabase} from "./config/db.js";

//Package helps load environment variables from a local .env into Node.js's process.env object
import dotenv from "dotenv";
dotenv.config();

//Initialize express app
const app = express();
app.use(express.json());

//Connect MongoDB before listening to requests
connectDatabase();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server listening on port ${PORT}"));
