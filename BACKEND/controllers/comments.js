import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middleware/async.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

// @desc    Get all comments for a video
// @route   GET /api/v1/comments/:videoId
// @access  Public
export const getComments = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find({ videoId: req.params.videoId })
    .populate("userId", "_id username channelName avatar") 
    .sort("-createdAt");

  res.status(200).json({ success: true, count: comments.length, data: comments });
});
// @desc    Add a comment
// @route   POST /api/v1/comments/:videoId
// @access  Private
export const createComment = asyncHandler(async (req, res, next) => {
  // Find the video first
  const video = await Video.findById(req.params.videoId);
  if (!video) {
    return next(new ErrorResponse(`No video with id ${req.params.videoId}`, 404));
  }

  // Create the comment
  const comment = await Comment.create({
    text: req.body.text,
    userId: req.user._id,
    videoId: req.params.videoId,
  });

  const populatedComment = await Comment.findById(comment._id).populate(
    "userId",
    "username channelName avatar"
  );

  // Return populated comment
  res.status(201).json({ success: true, data: populatedComment });
});


// @desc    Update a comment
// @route   PUT /api/v1/comments/:id
// @access  Private
export const updateComment = asyncHandler(async (req, res, next) => {
  let comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(new ErrorResponse(`No comment with id ${req.params.id}`, 404));
  }

  if (comment.userId.toString() !== req.user._id.toString()) {
    return next(new ErrorResponse("Not authorized to update this comment", 403));
  }

  // Update text
  comment.text = req.body.text || comment.text;
  await comment.save();

  // Return populated user info so frontend doesn’t lose username/avatar
  const populatedComment = await Comment.findById(comment._id).populate(
    "userId",
    "_id username channelName avatar"
  );

  res.status(200).json({ success: true, data: populatedComment });
});


// @desc    Delete a comment
// @route   DELETE /api/v1/comments/:id
// @access  Private
export const deleteComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id).populate(
    "userId",
    "_id username channelName avatar"
  );

  if (!comment) {
    return next(new ErrorResponse(`No comment with id ${req.params.id}`, 404));
  }

  const video = await Video.findById(comment.videoId);
  if (!video) {
    return next(new ErrorResponse(`Associated video not found`, 404));
  }

  if (
    comment.userId._id.toString() !== req.user._id.toString() &&
    video.channelId.toString() !== req.user.channelId.toString()
  ) {
    return next(new ErrorResponse("Not authorized to delete this comment", 403));
  }

  await comment.deleteOne();

  res.status(200).json({ success: true, data: comment });
});
