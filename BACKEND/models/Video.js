import mongoose from 'mongoose';

// Define Video schema
const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a video title'], // Title is required
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters'], // Max length validation
  },
  url: {
    type: String,
    required: [true, 'Please provide a video URL'], // Video URL is required
  },
  thumbnail: {
    type: String,
    required: [true, 'Please provide a thumbnail URL'], // Thumbnail URL is required
  },
  channelId: {
    type: String,
    required: true, // ID of the channel that uploaded the video
  },
  status: {
    type: String,
    default: 'public', // Default video status
  },
  views: {
    type: Number,
    default: 0, // Initial view count
  },
  category: {
    type: String,
    default: 'Other', // Default category
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User', // Users who liked the video
    },
  ],
  dislikes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User', // Users who disliked the video
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now, // Creation timestamp
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Update timestamp
  },
  channel: {
    type: mongoose.Schema.ObjectId,
    ref: "Channel", // Reference to the channel document
    required: true, 
  }
});

// Export Video model
export default mongoose.model('Video', VideoSchema);
