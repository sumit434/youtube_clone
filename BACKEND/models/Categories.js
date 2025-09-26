import mongoose from "mongoose";

// Define Category schema
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a category name"], // Validation: name is required
      unique: true, 
      trim: true, 
    },
    description: {
      type: String,
      trim: true, // Remove leading/trailing whitespace
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Export Category model
export default mongoose.model("Category", CategorySchema);
