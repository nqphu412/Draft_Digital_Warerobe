import mongoose from "mongoose";

let isConnected = false;

export async function connectDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env",
    );
  }

  //If it is connected already, use the old connection
  if (isConnected || mongoose.connection.readyState === 1) {
    return mongoose;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);

    isConnected = db.connections[0].readyState === 1;
    console.log("Connection established to MongoDB database successfully!");
    return mongoose;
  } catch (error) {
    console.error("Database connection error: ", error);
    throw error;
  }
}

export async function disconnectDatabase() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
    isConnected = false;
    console.log("Disconnected from MongoDB.");
  }
}
