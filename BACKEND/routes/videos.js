import express from "express";

import {
  uploadVideo,
  getVideos,
  updateVideo,
  getVideoById,
  deleteVideo
} from "../controllers/videos.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Combined routes for the base path and for searching
router.route("/").post(protect, uploadVideo).get(getVideos);


// Consolidate the routes for a single video by its ID
router.route("/:id")
  .get(getVideoById)
  .put(updateVideo)
  .delete(deleteVideo);


export default router;
