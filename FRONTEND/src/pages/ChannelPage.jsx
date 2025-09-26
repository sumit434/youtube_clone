import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axios.js";
import VideoCard from "../components/VideoCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { Video } from "lucide-react";

export default function ChannelPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);

  // Generate fallback avatar if no photo exists
  const generateAvatar = (username) =>
    `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(
      username
    )}&backgroundType=solid`;

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function fetchChannelData() {
      try {
        const channelIdToFetch = id || user?.channelId;

        // Fetch channel
        const channelRes = await api.get(`/channels/${channelIdToFetch}`, {
          signal: controller.signal,
        });
        if (!mounted) return;

        const channelData = channelRes.data?.data || channelRes.data || null;
        setChannel(channelData);

        // Fetch videos
        let videosRes;
        try {
          videosRes = await api.get(`/videos/${channelIdToFetch}/videos`, {
            signal: controller.signal,
          });
        } catch (err) {
          if (err.response?.status === 404) {
            videosRes = { data: { data: [] } };
          } else if (err.name === "CanceledError" || err.code === "ERR_CANCELED") {
            return;
          } else {
            throw err;
          }
        }
        const videosData = videosRes?.data?.data || [];
        setVideos(Array.isArray(videosData) ? videosData : []);
      } catch (err) {
        if (err.name !== "AbortError" && err.code !== "ERR_CANCELED") {
          console.error("Failed to fetch channel data:", err);
        }
        setChannel(null);
        setVideos([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchChannelData();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [id, user]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );

  if (!channel)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-gray-800">Channel not found</h1>
      </div>
    );

  const isLoggedUserChannel = user?.channelId === channel._id;

  // Banner: use user.banner if exists, else channel.bannerUrl if not empty, else fallback
  const bannerUrl =
    (isLoggedUserChannel
      ? user?.banner || (channel.bannerUrl?.trim() ? channel.bannerUrl : null)
      : channel.bannerUrl?.trim() ? channel.bannerUrl : null) ||
    `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(
      isLoggedUserChannel ? user.username || user.name : channel.channelName
    )}&backgroundType=solid&chars=0`;
    
// Avatar: prioritize channel.photoUrl, fallback to user.avatar, then fallback
const avatarUrl =
  channel.photoUrl?.trim() ||
  (isLoggedUserChannel ? user?.avatar?.trim() : null) ||
  generateAvatar(channel.channelName);

  return (
    <div className="container mx-auto p-4 mt-8">
      {/* Channel Banner */}
      <div className="h-32 md:h-40 w-full mb-4 rounded-lg overflow-hidden">
        <img
          src={bannerUrl}
          alt="Channel Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Channel Info Card */}
      <div className="bg-gray-100 pb-2 rounded-lg flex items-center justify-between mb-6 px-4 py-3">
        <div className="flex items-center gap-4">
          <img
            src={avatarUrl}
            alt={channel.channelName}
            className="w-21 h-21 rounded-full"
            onError={(e) => {
              e.currentTarget.src = generateAvatar(channel.channelName);
            }}
          />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-800">
              {channel.channelName}
            </h1>
            <p className="text-gray-600">{channel.description}</p>
            <span className="text-gray-400 text-sm">
              {channel.subscribersCount || 0} Subscribers • {videos.length} Videos
            </span>
          </div>
        </div>

        {isLoggedUserChannel && (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => navigate("/upload")}
              className="flex items-center gap-2 hover:bg-blue-700 text-neutral-400 hover:text-white border-1 border-gray-300 font-medium px-3 py-1 rounded-full transition"
              title="Upload Video"
            >
              <Video size={30} />
            </button>
          </div>
        )}
      </div>

      {/* Videos Section */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div key={video._id} className="relative group">
              <VideoCard video={video} />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No videos uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
}
