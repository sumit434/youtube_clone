import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../utils/axios";
import VideoCard from "../components/VideoCard";

export default function HomePage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "";

  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const categories = [
    "All","Tech","Gaming","Music","Automotive","Web Dev","Sports","Design","Comedy","Learning","Cooking","Beauty",
    "Food","Travel","Vlogs","DIY","Finance","Science","Fashion","News","Photography","Fitness","Yoga","Gardening"
  ];

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        let res;
        if (query) res = await api.get(`/search/videos?text=${query}`);
        else if (category && category !== "All") res = await api.get(`/videos/category?category=${category}`);
        else res = await api.get("/videos");

        setVideos(res.data.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load videos. Please try again.");
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [query, category]);

  const handleFilter = (cat) => {
    if (cat === "All") setSearchParams({});
    else setSearchParams({ category: cat });
  };

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = 150;
    if (direction === "left") container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    else container.scrollBy({ left: scrollAmount, behavior: "smooth" });

    setTimeout(() => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth);
    }, 200);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center w-full h-64">
        <p className="text-gray-800 text-lg text-center">Loading...</p>
      </div>
    );

  return (
    <div className="p-5">
      {/* Filter slider with arrows */}
      <div className="relative flex items-center mb-6">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 z-10 h-full px-2 text-gray-700 bg-white/70 rounded-r hover:bg-white"
          >
            &#10094;
          </button>
        )}
        <div ref={scrollRef} className="flex gap-2 overflow-x-hidden scroll-smooth w-full px-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`px-3 py-1 rounded-full transition whitespace-nowrap ${
                category === cat || (!category && cat === "All")
                  ? "bg-black text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 z-10 h-full px-2 text-gray-700 bg-white/70 rounded-l hover:bg-white"
          >
            &#10095;
          </button>
        )}
      </div>

      {/* Videos grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[200px]">
  {videos.length > 0 ? (
    videos.map((video) => <VideoCard key={video._id} video={video} />)
  ) : (
    <div className="col-span-full flex justify-center items-center w-full h-[60vh]">
      <p className="text-gray-800 font-medium text-lg text-center">
        No videos in this category
      </p>
    </div>
        )}
      </div>
    </div>
  );
}
