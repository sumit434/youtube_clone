import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Search, Menu, Video, User, LogOut, Settings } from "lucide-react"; 
import { useAuth } from "../context/AuthContext";
import api from "../utils/axios.js";

export default function Navbar({ onToggle }) {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [channel, setChannel] = useState(null);
  const [hasChannel, setHasChannel] = useState(false);
  const [avatar, setAvatar] = useState(null);

  // Avatar generator fallback
  const generateAvatar = (name) =>
    `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(name)}`;

  // Check if user has a channel
  useEffect(() => {
    setHasChannel(!!user?.channelId);
  }, [user]);

  // Update avatar whenever user or channel changes
  useEffect(() => {
    if (channel?.photoUrl) {
      setAvatar(channel.photoUrl); // prioritize channel photo
    } else if (user?.avatar) {
      setAvatar(user.avatar);      // fallback to user avatar
    } else {
      setAvatar(generateAvatar(user?.name || "U")); // fallback to generated avatar
    }
  }, [user, channel]);

  // Fetch channel info if user has channelId
  useEffect(() => {
    const fetchChannel = async () => {
      if (!user?.channelId) return;
      try {
        const res = await api.get(`/channels/${user.channelId}`);
        setChannel(res.data.data); // includes photoUrl
      } catch (err) {
        console.error("Failed to fetch channel:", err);
      }
    };
    fetchChannel();
  }, [user]);

  // Sync query state with URL
  useEffect(() => {
    const urlQuery = searchParams.get("query") || "";
    if (query !== urlQuery) setQuery(urlQuery);
  }, [searchParams, query]);

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setSearchParams(newQuery ? { query: newQuery } : {});
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(query.trim() ? `/?query=${encodeURIComponent(query)}` : "/");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setDropdownOpen(false);
  };

  const handleProfileClick = () => {
    navigate(user?.channelId ? `/channel/${user.channelId}` : "/channel/create");
    setDropdownOpen(false);
  };

  if (loading) return null;


  const avatarUrl =
    channel?.photoUrl?.trim() ||         
    user?.avatar?.trim() ||               
    generateAvatar(user?.name || "U");   

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center bg-neutral-100 justify-between px-5 py-2">
      <div className="flex items-center gap-2">
        <button onClick={onToggle} aria-label="Toggle Sidebar" className="p-1 rounded hover:bg-gray-100">
          <Menu size={28} />
        </button>
        <Link to="/" className="flex ml-5 items-center gap-2">
          <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg" className="w-8 h-6 text-red-600" fill="currentColor">
            <path d="M549.7 124.1c-6.3-23.7-24.9-42.4-48.6-48.7C456.2 64 288 64 288 64s-168.2 0-213.1 11.4c-23.7 6.3-42.3 25-48.6 48.7C15 168.1 15 256 15 256s0 87.9 11.3 131.9c6.3 23.7 24.9 42.4 48.6 48.7C119.8 448 288 448 288 448s168.2 0 213.1-11.4c23.7-6.3 42.3-25 48.6-48.7C561 343.9 561 256 561 256s0-87.9-11.3-131.9zM232 338V174l142 82-142 82z" />
          </svg>
          <span className="text-lg font-bold">YouTube</span>
        </Link>
      </div>
      <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md mx-4 relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search"
          className="w-full border rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
        />
        <button type="submit" className="absolute right-1 top-1 bottom-1 px-3 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300">
          <Search size={18} />
        </button>
      </form>

      <div className="flex items-center gap-1">
        {user ? (
          <>
            {hasChannel ? (
              <button onClick={() => navigate("/upload")} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 py-1 rounded-full shadow-md transition">
                <Video size={20} /> Upload
              </button>
            ) : (
              <button onClick={() => navigate("/channel/create")} className="bg-blue-600 text-white px-3 py-1 rounded-full font-medium hover:bg-blue-700 text-sm">
                Create Channel
              </button>
            )}

            <div className="relative ml-2">
              <button onClick={() => setDropdownOpen(prev => !prev)} className="flex items-center gap-1">
                {/* show avatar if available, else fallback to first letter */}
                {avatar ? (
                  <img src={avatarUrl} alt="User Avatar" className="w-10 h-10 rounded-full  object-cover" />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-400 text-white font-bold">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white z-50">
                  <div className="flex items-center p-4 border-b border-gray-200">
                    {avatar ? (
                      <img src={avatar} alt="User Avatar" className="w-10 h-10 rounded-full object-cover mr-3" />
                    ) : (
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-400 text-white font-bold mr-3">
                        {user?.name?.[0]?.toUpperCase() || "U"}
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>

                  <div className="py-1">
                    <button onClick={handleProfileClick} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <User size={18} className="mr-3" /> My Channel
                    </button>
                    <Link to="#" className="flex items-center px-4 py-2 text-sm text-gray-700 opacity-50 cursor-not-allowed">YouTube Studio</Link>
                    <Link to="#" className="flex items-center px-4 py-2 text-sm text-gray-700 opacity-50 cursor-not-allowed">Purchases and Membership</Link>
                    <Link to="#" className="flex items-center px-4 py-2 text-sm text-gray-700 opacity-50 cursor-not-allowed">Language</Link>
                    <Link to="#" className="flex items-center px-4 py-2 text-sm text-gray-700 opacity-50 cursor-not-allowed">Location</Link>
                    <Link to="#" className="flex items-center px-4 py-2 text-sm text-gray-700 opacity-50 cursor-not-allowed">
                      <Settings size={18} className="mr-3" /> Settings
                    </Link>
                    <button onClick={handleLogout} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <LogOut size={18} className="mr-3" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <button onClick={() => navigate("/login")} className="bg-red-600 text-white px-3 py-0.5 font-medium rounded-2xl hover:bg-red-800">
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}
