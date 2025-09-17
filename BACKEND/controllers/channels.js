import Channel from "../models/Channels.js";
import User from "../models/User.js";
import asyncHandler from "../middleware/async.js";
import ErrorResponse from "../utils/errorResponse.js";

// @desc      Create new channel
// @route     POST /api/v1/channels
// @access    Private
export const createChannel = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const existingChannel = await Channel.findOne({ userId });
  if (existingChannel) {
    return next(new ErrorResponse("User already has a channel", 400));
  }
  const channel = await Channel.create({ ...req.body, userId });
  await User.findByIdAndUpdate(userId, { channelId: channel._id });
  res.status(201).json({ success: true, channel });
})

// ... (rest of the controller functions)
// @desc    Get a channel by ID
// @route   GET /api/v1/channels/:id
// @access  Public
export const getChannel = asyncHandler(async (req, res, next) => {
  const channel = await Channel.findById(req.params.id).populate(
    "userId",
    "name email"
  );
  if (!channel) {
    return next(new ErrorResponse(`No channel with id of ${req.params.id}`, 404));
  }
  res.status(200).json({ success: true, data: channel });
});

// @desc    Update channel
// @route   PUT /api/v1/channels/:id
// @access  Private
export const updateChannel = asyncHandler(async (req, res, next) => {
  let channel = await Channel.findById(req.params.id);

  if (!channel) {
    return next(
      new ErrorResponse(`Channel not found with id of ${req.params.id}`, 404)
    );
  }
  if (channel.userId.toString() !== req.user._id.toString()) {
    return next(
      new ErrorResponse(
        `User ${req.user._id} is not authorized to update this channel`,
        401
      )
    );
  }
  channel = await Channel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: channel,
  });
});

// @desc    Delete channel
// @route   DELETE /api/v1/channels/:id
// @access  Private
export const deleteChannel = asyncHandler(async (req, res, next) => {
  const channel = await Channel.findById(req.params.id);

  if (!channel) {
    return next(new ErrorResponse(`No channel with id of ${req.params.id}`, 404));
  }
  if (channel.userId.toString() !== req.user._id.toString()) {
    return next(new ErrorResponse("Not authorized to delete this channel", 401));
  }
  await channel.deleteOne();
  res.status(200).json({ success: true, data: {} });
});