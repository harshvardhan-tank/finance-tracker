import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

// Allow the frontend to call this API
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5174")
  .split(",")
  .map((o) => o.trim().replace(/\/$/, ""));

app.use(
  cors({
    origin: (origin, callback) => {
      // allow tools like Postman (no origin) and the listed frontends
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
  })
);
app.use(express.json());

// Health check – open this in the browser to see if the backend is running
app.get("/", (req, res) => res.json({ message: "💰 Finance Tracker API is running" }));

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
