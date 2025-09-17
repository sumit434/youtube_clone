import asyncHandler from "../middleware/async.js";
import ErrorResponse from "../utils/errorResponse.js";
import Video from "../models/Video.js";


// @desc      Get all videos
// @route     GET /api/v1/videos
// @access    Public
export const getVideos = asyncHandler(async (req, res, next) => {

res.set('Cache-Control', 'no-store');

  const videos = await Video.find().populate('channel', 'channelName photoUrl');
  console.log("Fetched videos:", videos);

  if (!videos || videos.length === 0) {
    return next(new ErrorResponse("No videos found", 404));
  }
  res.status(200).json({ success: true, count: videos.length, data: videos });
});

// @desc      Get single video
// @route     GET /api/v1/videos/:id
// @access    Public
export const getVideoById = asyncHandler(async (req, res, next) => {

  const video = await Video.findById(req.params.id).populate('channel', 'channelName photoUrl');

  console.log("Fetched video:", video);

  if (!video) {
    return next(new ErrorResponse("Video not found", 404));
  }

  res.status(200).json({ success: true, data: video });
});

// @desc      Create new video
// @route     POST /api/v1/videos
// @access    Private
export const uploadVideo = asyncHandler(async (req, res, next) => {

  if (!req.user.channelId) {
    return next(
      new ErrorResponse("Please create a channel before uploading a video", 400)
    );
  }
  
  req.body.channel = req.user.channelId;
  const video = await Video.create(req.body);

  res.status(201).json({ success: true, data: video });
});


// @desc      Update a video
// @route     PUT /api/v1/videos/:id
// @access    Private
export const updateVideo = asyncHandler(async (req, res, next) => {
  let video = await Video.findById(req.params.id);

  if (!video) {
    return next(new ErrorResponse("Video not found", 404));
  }

  if (!req.user.channel || !req.user.channelId) {
    return next(new ErrorResponse("Not authorized to update this video", 401));
  }

  if (video.channel.toString() !== req.user.channelId.toString()) {
    return next(new ErrorResponse("Not authorized to update this video", 401));
  }
  video = await Video.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: video });
});

// @desc      Delete a video
// @route     DELETE /api/v1/videos/:id
// @access    Private
export const deleteVideo = asyncHandler(async (req, res, next) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    return next(new ErrorResponse("Video not found", 404));
  }

  if (!req.user || !req.user.channelId) {
    return next(new ErrorResponse("Not authorized to delete this video", 401));
  }

  if (video.channel.toString() !== req.user.channelId.toString()) {
    return next(new ErrorResponse("Not authorized to delete this video", 401));
  }

  await video.deleteOne();

  res.status(200).json({ success: true, data: {} });
});


