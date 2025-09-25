import React, { useState, useEffect } from "react";
import {
  AiFillLike,
  AiOutlineLike,
  AiFillDislike,
  AiOutlineDownload,
  AiOutlineShareAlt,
  AiOutlineDislike,
} from "react-icons/ai";
import { useParams } from "react-router-dom";
import VideoCard from "../components/VideoCard.jsx";
import CommentsSection from "../pages/CommentsSection.jsx";
import api from "../utils/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function VideoPage() {
  const { id } = useParams();
  const { user } = useAuth();

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
        // Fetch current video
        const res = await api.get(`/videos/${id}`);
        const videoData = res.data?.data;
        setCurrentVideo(videoData || null);

        if (videoData) {
          // Likes/Dislikes count
          try {
            const countsRes = await api.get(
              `/likes_dislikes/${videoData._id}/counts`
            );
            setLikesCount(countsRes.data?.data?.likes || 0);
            setDislikesCount(countsRes.data?.data?.dislikes || 0);
          } catch (err) {
            console.warn("Failed to fetch reaction counts:", err);
          }

          // User reaction
          if (user) {
            try {
              const userReactionRes = await api.get(
                `/likes_dislikes/${videoData._id}`
              );
              setUserReaction(userReactionRes.data?.data || null);
            } catch (err) {
              console.warn("Failed to fetch user reaction:", err);
            }
          }

          // Related videos
          if (videoData.channelId) {
            try {
              // 1. Fetch channel videos
              const channelRes = await api.get(
                `/videos/${videoData.channelId}/videos`
              );
              const channelVideos = (channelRes.data?.data || []).filter(
                (v) => v._id !== videoData._id
              );
              // 2. Fetch fallback (all videos)
              const allRes = await api.get(`/videos`);
              const otherVideos = (allRes.data?.data || []).filter(
                (v) => v.channelId !== videoData.channelId
              );
              // Combine: channel videos first, then others
              const combined = [...channelVideos, ...otherVideos].slice(0, 10);
              setRelatedVideos(combined);
            } catch (err) {
              console.warn("Failed to fetch related videos:", err);
            }
          }

          setSubscriberCount(videoData.channel?.subscribers || null);
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

  const handleReaction = async (type) => {
    if (!user) {
      alert("Please log in to react to videos.");
      return;
    }

    try {
      await api.post(`/likes_dislikes/${currentVideo._id}`, { type });

      const countsRes = await api.get(
        `/likes_dislikes/${currentVideo._id}/counts`
      );
      setLikesCount(countsRes.data?.data?.likes || 0);
      setDislikesCount(countsRes.data?.data?.dislikes || 0);

      const userReactionRes = await api.get(
        `/likes_dislikes/${currentVideo._id}`
      );
      setUserReaction(userReactionRes.data?.data || null);
    } catch (error) {
      console.error("Error updating reaction:", error);
    }
  };

  if (loading) return <div className="p-4 text-gray-600">Loading video...</div>;
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

        {/* Channel Info and Description */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-sm text-white">
                {currentVideo.channel?.channelName?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <p className="font-semibold text-base">
                  {currentVideo.channel?.channelName || "Unknown Channel"}
                </p>
                <p className="text-sm text-gray-500">
                  {(subscriberCount || 0).toLocaleString()} subscribers
                </p>
              </div>
              {/* Subscribe + Dummy Buttons */}
              <div className="flex items-center gap-2">
                <button className="bg-red-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-red-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Like/Dislike Section */}
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
                  < AiOutlineDownload className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-gray-100 rounded-lg text-sm text-gray-700">
            <p>{currentVideo.description}</p>
          </div>
        </div>

        {/* CommentsSection */}
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
