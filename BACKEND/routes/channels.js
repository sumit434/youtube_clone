import express from "express";
import {
  createChannel,
  getChannel,
  updateChannel,
  deleteChannel,
} from "../controllers/channels.js";

import { getChannelVideos } from "../controllers/videos.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createChannel); 

router.route("/:id")
  .get(getChannel)         
  .put(protect, updateChannel) 
  .delete(protect, deleteChannel);

router.route("/:id/videos").get(getChannelVideos);

export default router;
