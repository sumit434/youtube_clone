import asyncHandler from "../middleware/async.js";
import ErrorResponse from "../utils/errorResponse.js";
import User from "../models/User.js";

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().select("-password");
  res.status(200).json({ success: true, count: users.length, data: users });
});

// @desc    Get single user
// @route   GET /api/v1/users/:id
// @access  Private/Admin
export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return next(new ErrorResponse(`No user with id ${req.params.id}`, 404));

  res.status(200).json({ success: true, data: user });
});

