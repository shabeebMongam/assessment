import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db";

import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import studentRoutes from "./routes/student.routes";
import { errorHandler } from "./middleware/error.middleware";
import { authenticate, authorizeAdmin, authorizeStudent } from "./middleware/auth.middleware";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Add Morgan middleware with 'dev' format

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Student Management System API"
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server only after database connection
const startServer = async () => {
  try {
    // Connect to database first
    await connectDB();
    
    // Start server after successful connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
