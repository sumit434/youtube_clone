import jwt from "jsonwebtoken";
import asyncHandler from "./async.js";
import ErrorResponse from "../utils/errorResponse.js";
import User from "../models/User.js";

// Protect routes and ensure the user is authenticated
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for Bearer token in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]; 
  }

  if (!token) {
    // No token provided
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request object, selecting only id and channelId
    req.user = await User.findById(decoded.id).select("id channelId");

    if (!req.user) {
      // If user doesn't exist
      return next(new ErrorResponse("No user found with this id", 404));
    }
    next();
  } catch (err) {
    console.error(err);
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
});
