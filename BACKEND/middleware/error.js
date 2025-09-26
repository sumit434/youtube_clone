import ErrorResponse from "../utils/errorResponse.js";

// Custom error handling middleware
const errorHandler = (err, req, res, next) => {
  let error = { ...err }; 

  error.message = err.message; // Ensure message is included

  console.log(err); 

  // Handle Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Handle Mongoose duplicate key error
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  // Send error response if headers not already sent
  if (!res.headersSent) {
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Server Error",
    });
  }
};

export default errorHandler;
