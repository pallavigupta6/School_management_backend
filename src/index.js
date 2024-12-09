import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";
import classRoutes from "./routes/classRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import { validateClass } from "./middleware/validators/classValidator.js";
import analyticsRoutes from "./routes/analytics.js";

// Load environment variables
import "dotenv/config";

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/classes", classRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/analytics", analyticsRoutes);

// Base route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to School Management System API" });
});

app.post("/api/classes", validateClass, (req, res) => {
  console.log("Received Payload:", req.body); // Log the received payload
  console.log("Validation Errors:", validationResult(req).array()); // Log validation errors
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
