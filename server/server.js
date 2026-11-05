import "dotenv/config"; // loads .env FIRST (must stay the first import)
import app from "./app.js";
import connectDB from "./config/db.js";

if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error("❌ MONGO_URI and JWT_SECRET must be set in the .env file (see .env.example)");
  process.exit(1);
}

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
});
