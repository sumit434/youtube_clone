import express from "express";

import {
  uploadVideo,
  getVideos,
  updateVideo,
  getVideoById,
  searchVideos,
  deleteVideo,
  getChannelVideos
} from "../controllers/videos.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Combined routes for the base path and for searching
router.route("/").post(protect, uploadVideo).get(getVideos);
router.route("/search").get(searchVideos);

// Consolidate the routes for a single video by its ID
router.route("/:id")
  .get(getVideoById)
  .put(updateVideo)
  .delete(deleteVideo);

router.route("/:id/videos").get(getChannelVideos);

export default router;
