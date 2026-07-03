import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

// Admin Schema
const dashboardSchema = new mongoose.Schema(
  {
    members: {
        type: Number
    },
    projects: {
        type: Number
    },
    blogs: {
        type: Number
    }
  },
  {
    timestamps: true
  }
);
 // created a test admin 
export const Dashboard =
  mongoose.models.Dashboard ||
  mongoose.model("Admin", dashboardSchema);

