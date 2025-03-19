import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/user.model";

// Load environment variables
dotenv.config();

// Connect to MongoDB
const seedDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB for seeding");

    // Check if admin account exists
    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (adminExists) {
      console.log("Admin account already exists. Skipping seed.");
      await mongoose.disconnect();
      return;
    }

    // Create admin account
    const admin = new User({
      name: "Administrator",
      email: process.env.ADMIN_EMAIL || "admin@admin.com",
      password: process.env.ADMIN_PASSWORD || "admin",
      role: "admin",
    });

    await admin.save();
    console.log("Admin account seeded successfully!");

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
