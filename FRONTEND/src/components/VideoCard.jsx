import React from "react";
import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
  return (
    <div className="w-full sm:w-60 p-2">
      <Link to={`/videos/${video._id}`}>
        <div className="rounded-lg overflow-hidden shadow hover:shadow-lg transition">
          <img
  src={
    typeof video.thumbnail === "string"
      ? video.thumbnail
      : video.thumbnail?.url || "https://via.placeholder.com/300x200"
  }
  alt={video.title}
  className="w-full h-40 object-cover"
/>

        </div>
        <div className="mt-2">
          <h3 className="text-sm font-semibold line-clamp-2">{video.title}</h3>
          <p className="text-xs text-gray-500">
            {video.channel?.channelName || "Unknown Channel"}
          </p>
        </div>
      </Link>
    </div>
  );
}
