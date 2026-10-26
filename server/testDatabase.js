import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDatabase, disconnectDatabase } from "./config/db.js";

dotenv.config();

async function testDatabase() {
  try {
    await connectDatabase();

    const db = mongoose.connection.db;

    console.log("Database:", db.databaseName);

    // List all collection names
    const collections = await db.listCollections().toArray();

    console.log(
      "Collections:",
      collections.map((collection) => collection.name),
    );

    // Find the collection used by the Garment model
    const garments = await db
      .collection("garments")
      .find({})
      .limit(10)
      .toArray();

    console.log("\nGarment documents:");
    console.dir(garments, { depth: null, colors: true });
  } catch (error) {
    console.error("Test failed:", error.message);
  } finally {
    await disconnectDatabase();
  }
}

testDatabase();
