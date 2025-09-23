import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/axios.js";
import VideoCard from "../components/VideoCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function ChannelPage() {
  const { id } = useParams();
  const { user } = useAuth(); 
  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);

useEffect(() => {
  let mounted = true;
  const controller = new AbortController();

  async function fetchChannelData() {
    try {
      const channelIdToFetch = id || user?.channelId;

      const channelRes = await api.get(`/channels/${channelIdToFetch}`, {
        signal: controller.signal,
      });

      if (!mounted) return;

      const channelData = channelRes.data?.data || channelRes.data || null;
      setChannel(channelData);


      let videosRes;
      try {
        videosRes = await api.get(`/videos?channelId=${channelIdToFetch}`, {
          signal: controller.signal,
        });
      } catch (err) {
        if (err.response?.status === 404) {
          videosRes = { data: { data: [] } }; 
          throw err;
        } 
      }
      const videosData = videosRes.data?.data || [];
      setVideos(Array.isArray(videosData) ? videosData : []);

    } catch (err) {
      if (err.name === "CanceledError") return;
      console.error("Failed to fetch channel data:", err);
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


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-gray-800">Channel not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-6 mb-8">
        <div className="w-20 h-20 rounded-full bg-blue-900 text-white font-bold text-4xl flex items-center justify-center">
          {channel.channelName
            ? channel.channelName.charAt(0).toUpperCase()
            : "C"}
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-800">{channel.channelName}</h1>
          <p className="text-gray-600 mt-1">{channel.description}</p>
          <span className="text-gray-400 text-sm">{videos.length} Videos</span>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Videos</h2>
      </div>
  );
}
