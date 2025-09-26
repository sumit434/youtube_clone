import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Define User schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"], // Name is required
  },
  username: {
    type: String,
    required: [true, "Please provide a username"], // Username is required
    unique: true, 
  },
  email: {
    type: String,
    required: [true, "Please provide an email"], // Email is required
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email", // Email validation regex
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"], // Password is required
    minlength: 6, // Minimum password length
    select: false, 
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set default creation date
  },
  channelId: {
    type: mongoose.Schema.ObjectId,
    ref: "Channel", // Reference to Channel model
  }
});

// Encrypt password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next(); 
  }
  const salt = await bcrypt.genSalt(10); // Generate salt
  this.password = await bcrypt.hash(this.password, salt); 
});

// Match entered password with hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate signed JWT token
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE, 
  });
};

export default mongoose.model("User", UserSchema);
