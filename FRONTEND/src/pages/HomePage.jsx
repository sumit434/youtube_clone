import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";

export default function HomePage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        let url = "http://localhost:8000/api/v1/videos"; // default
        if (query) {
          url = `http://localhost:8000/api/v1/search/videos?text=${query}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        if (data.success) {
          setVideos(data.data || []);
        } else {
          setVideos([]);
        }
      } catch (err) {
        console.error("Error fetching videos:", err);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [query]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.length > 0 ? (
        videos.map((video) => <VideoCard key={video._id} video={video} />)
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No videos found
        </p>
      )}
    </div>
  );
}
