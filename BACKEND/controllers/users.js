import asyncHandler from "../middleware/async.js";
import ErrorResponse from "../utils/errorResponse.js";
import User from "../models/User.js";

export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().select("-password");
  res.status(200).json({ success: true, count: users.length, data: users });
});

export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return next(new ErrorResponse(`No user with id ${req.params.id}`, 404));

  res.status(200).json({ success: true, data: user });
});

export const updateUser = asyncHandler(async (req, res, next) => {
  if (req.body.password) delete req.body.password;

  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) return next(new ErrorResponse(`No user with id ${req.params.id}`, 404));

  res.status(200).json({ success: true, data: user });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new ErrorResponse(`No user with id ${req.params.id}`, 404));

  await user.deleteOne();
  res.status(200).json({ success: true, data: {} });
});
