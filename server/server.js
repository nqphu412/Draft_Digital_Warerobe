import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./config/db.js";

const PORT = process.env.APP_PORT || 5000;

async function startServer() {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
