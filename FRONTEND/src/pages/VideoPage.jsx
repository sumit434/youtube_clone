import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VideoCard from "../components/VideoCard.jsx";
import api from "../utils/axios.js";

function VideoPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentVideo, setCurrentVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchVideoAndRelated = async () => {
    try {
      const res = await api.get(`/videos/${id}`);
      const videoData = res.data?.data;
      setCurrentVideo(videoData || null);

      if (videoData && videoData.channelId) {
        const relatedRes = await api.get(`/videos/${videoData.channelId}/videos`);
        const filteredRelated = (relatedRes.data?.data || []).filter(v => v._id !== videoData._id);

        const mappedRelated = filteredRelated.map(video => ({
          videoId: video._id,
          title: video.title,
          thumbnailUrl: video.thumbnail,
          channelName: video.channel?.channelName || "Unknown",
          views: video.views?.toLocaleString() || 0
        }));

        setRelatedVideos(mappedRelated);
      }
    } catch (err) {
      console.error("Error fetching video or related:", err);
      setCurrentVideo(null);
      setRelatedVideos([]);
    } finally {
      setLoading(false);
    }
  };

  fetchVideoAndRelated();
}, [id]);

  const handleVideoCardClick = (videoId) => {
    navigate(`/videos/${videoId}`);
  };
if (loading) {
  return <p>Loading...</p>;
}

if (!currentVideo) {
  return <p>Video not found. Please check your back-end data.</p>;
}

return (
  <div className="p-4 flex flex-col lg:flex-row gap-6">
    <div className="flex-1">
      <div className="relative pt-[56.25%]">
  {currentVideo?.url?.includes("youtube.com") ? (
    <iframe
      className="absolute top-0 left-0 w-full h-full"
      src={currentVideo.url.replace("watch?v=", "embed/")}
      title={currentVideo.title}
      allowFullScreen
    ></iframe>
  ) : (
    <video
      controls
      className="absolute top-0 left-0 w-full h-full"
      src={currentVideo.url}
    ></video>
  )}
</div>
      <h1 className="mt-3 text-lg sm:text-xl font-bold">
        {currentVideo.title}
      </h1>
      <p className="mt-1 text-sm text-gray-600">
        {currentVideo.views?.toLocaleString() || 0} views •{" "}
        {currentVideo.channel?.channelName || "Unknown Channel"}
      </p>
    </div>

    <div className="w-full lg:w-80">
      <h2 className="text-lg font-bold mb-3">Related Videos</h2>
      <div className="flex flex-col gap-4">
        {relatedVideos.length > 0 ? (
          relatedVideos.map((video) => (
            <VideoCard
              key={video._id}
              video={video}
              onClick={() => handleVideoCardClick(video._id)}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500">No related videos found.</p>
        )}
      </div>
    </div>
  </div>
);

}

export default VideoPage;
