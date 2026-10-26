import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import garmentRoutes from "./routes/garmentRoutes.js";

//initialize express app
const app = express();

//parse cookies from request
app.use(cookieParser());

//CORS configuration
const allowedOrigins = ["http://127.0.0.1:5500"];
if (process.env.APP_BASE_URL) allowedOrigins.push(process.env.APP_BASE_URL);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

//parse body of request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//set application API's routes
app.use("/api/auth", authRoutes);
app.use("/api/garments", garmentRoutes);

export default app;