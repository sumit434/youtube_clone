import  { useState, useEffect } from "react";
import {
  AiFillLike,
  AiOutlineLike,
  AiFillDislike,
  AiOutlineDownload,
  AiOutlineShareAlt,
  AiOutlineDislike,
} from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import VideoCard from "../components/VideoCard.jsx";
import CommentsSection from "../pages/CommentsSection.jsx";
import api from "../utils/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function VideoPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [currentVideo, setCurrentVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscriberCount, setSubscriberCount] = useState(null);

  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
  const [userReaction, setUserReaction] = useState(null);

useEffect(() => {
  const fetchVideoAndRelated = async () => {
    setLoading(true);
    try {
      // Fetch the video
      const res = await api.get(`/videos/${id}`);
      const videoData = res.data?.data;
      setCurrentVideo(videoData || null);

      if (videoData?.channelId) {
        // Fetch full channel for accurate subscribers
        try {
          const channelRes = await api.get(`/channels/${videoData.channelId}`);
          const fullChannel = channelRes.data?.data || channelRes.data || null;
          if (fullChannel) {
            setSubscriberCount(fullChannel.subscribersCount || 0);

            // Merge full channel info into currentVideo
            setCurrentVideo((prev) =>
              prev ? { ...prev, channel: fullChannel } : prev
            );
          }
        } catch (err) {
          console.warn("Failed to fetch full channel info:", err);
        }

        // Related videos
        try {
          const channelResVideos = await api.get(
            `/videos/${videoData.channelId}/videos`
          );
          const channelVideos = (channelResVideos.data?.data || []).filter(
            (v) => v._id !== videoData._id
          );

          const allRes = await api.get(`/videos`);
          const otherVideos = (allRes.data?.data || []).filter(
            (v) => v.channelId !== videoData.channelId
          );

          const combined = [...channelVideos, ...otherVideos].slice(0, 10);
          setRelatedVideos(combined);
        } catch (err) {
          console.warn("Failed to fetch related videos:", err);
        }
      }

      // Likes/dislikes counts
      try {
        const countsRes = await api.get(`/likes_dislikes/${videoData._id}/counts`);
        setLikesCount(countsRes.data?.data?.likes || 0);
        setDislikesCount(countsRes.data?.data?.dislikes || 0);
      } catch (err) {
        console.warn("Failed to fetch reaction counts:", err);
      }

      // User reaction
      if (user) {
        try {
          const userReactionRes = await api.get(`/likes_dislikes/${videoData._id}`);
          setUserReaction(userReactionRes.data?.data || null);
        } catch (err) {
          console.warn("Failed to fetch user reaction:", err);
        }
      }

    } catch (err) {
      console.error("Error fetching video or related:", err);
      setCurrentVideo(null);
      setRelatedVideos([]);
      setSubscriberCount(null);
    } finally {
      setLoading(false);
    }
  };

  fetchVideoAndRelated();
}, [id, user]);

// Handling Like and dislike reaction
const handleReaction = async (type) => {
  if (!user) {
    alert("Please log in to react to videos.");
    return;
  }
  if (userReaction === type) {
    // Toggle off if already clicked
    setUserReaction(null);
    if (type === "like") setLikesCount((prev) => prev - 1);
    else setDislikesCount((prev) => prev - 1);
  } else {
    // Switch reaction or new reaction
    if (type === "like") {
      setLikesCount((prev) => prev + 1);
      if (userReaction === "dislike") setDislikesCount((prev) => prev - 1);
    } else {
      setDislikesCount((prev) => prev + 1);
      if (userReaction === "like") setLikesCount((prev) => prev - 1);
    }
    setUserReaction(type);
  }
  try {
    await api.post(`/likes_dislikes/${currentVideo._id}`, { type });
  } catch (error) {
    console.error("Error updating reaction:", error);
  }
};
  if (loading)
    return <div className="p-4 text-gray-600">Loading video...</div>;
  if (!currentVideo)
    return <p className="p-4 text-red-500">Video not found.</p>;

  return (
    <div className="p-4 flex flex-col lg:flex-row gap-6">
      {/* Main Video */}
      <div className="flex-1">
        <div className="relative pt-[56.25%]">
          <video
            controls
            className="absolute top-0 left-0 w-full rounded-md h-full object-cover"
            src={currentVideo.url}
            poster={currentVideo.thumbnail}
            title={currentVideo.title}
          />
        </div>
        <div className="mt-4">
          <h1 className="text-lg sm:text-xl font-bold">{currentVideo.title}</h1>
          <p className="text-sm text-gray-600 mt-1">
            {currentVideo.views?.toLocaleString() || 0} views
          </p>
        </div>

        {/* Channel Info + Actions + Description */}
    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
      <div className="flex items-center justify-between">
    <div className="flex items-center gap-4">
      {/* Clickable Channel Info */}
    <div
      className="flex items-center gap-3 cursor-pointer"
      onClick={() => navigate(`/channel/${currentVideo.channel?._id}`)}
    >
      <img
        src={
          currentVideo.channel?.photoUrl?.trim() ||
          `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(
            currentVideo.channel?.channelName || "U"
          )}&backgroundType=solid`
        }
        alt={currentVideo.channel?.channelName || "User Avatar"}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <p className="font-semibold text-base">
          {currentVideo.channel?.channelName || "Unknown Channel"}
        </p>
        <p className="text-sm text-gray-500">
          {(subscriberCount || 0).toLocaleString()} subscribers
        </p>
      </div>
    </div>

      {/* Subscribe Button */}
      <button className="bg-red-600 text-white text-md font-semibold py-1 px-3 rounded-full hover:bg-red-700 transition-colors">
        Subscribe
      </button>
    </div>

    {/* Right: Like/Dislike/Share/Download Buttons */}
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1">
        <button
          onClick={() => handleReaction("like")}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          title="Like"
        >
          {userReaction === "like" ? (
            <AiFillLike className="w-5 h-5 text-blue-600" />
          ) : (
            <AiOutlineLike className="w-5 h-5" />
          )}
        </button>
        <span className="text-sm text-gray-600">{likesCount}</span>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => handleReaction("dislike")}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          title="Dislike"
        >
          {userReaction === "dislike" ? (
            <AiFillDislike className="w-5 h-5 text-gray-600" />
          ) : (
            <AiOutlineDislike className="w-5 h-5" />
          )}
        </button>
        <span className="text-sm text-gray-600">{dislikesCount}</span>
      </div>

      <button
        onClick={() => {}}
        className="flex items-center gap-1 ml-2 px-1 pr-2 py-1 rounded-full hover:bg-gray-300 transition"
      >
        <AiOutlineShareAlt className="w-5 h-5" />
      </button>

      <button
        onClick={() => {}}
        className="flex items-center gap-1 px-1.5 py-1 rounded-full hover:bg-gray-300 transition"
      >
        <AiOutlineDownload className="w-5 h-5" />
      </button>
    </div>
  </div>

    {/* Video Description */}
    <div className="mt-4 p-4 bg-gray-100 rounded-lg text-sm text-gray-700">
        <p>{currentVideo.description}</p>
      </div>
    </div>

   {/* Comments Section */}
    <CommentsSection />
    </div>
    
    {/* Related Videos */}
    <div className="w-full lg:w-80">
      <h2 className="text-lg font-bold mb-3">Related Videos</h2>
      <div className="flex flex-col gap-4">
        {relatedVideos.length > 0 ? (
          relatedVideos.map((video) => <VideoCard key={video._id} video={video} />)
          ) : (
          <p className="text-sm text-gray-500">No related videos found.</p>
        )}
        </div>
      </div>
    </div>
  );
}
