const express = require("express"); // Create server and handle APIs
const mongoose = require("mongoose"); // Connect with MongoDB
require("dotenv").config(); // Access to database from .env

const app = express();

app.use(express.json()); // Help express parse JSON from frontend
app.use(express.static("public")); // Link it to the frontend

// Check whether MongoDB is connected
app.get("/api/status", (req, res) => {
  res.json({
    message: "Server is running!",
    mongoConnected: mongoose.connection.readyState === 1,
  });
});

// Start the server and connect to MongoDB
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB Atlas!");

    app.listen(process.env.PORT || 3000, () => {
      console.log("Open http://localhost:3000");
    });
  } catch (error) {
    console.error("Connection failed:", error.message);
  }
}

startServer();
