import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Search, Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ onToggle }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");

  // Handle search input change
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery) setSearchParams({ query: newQuery });
    else setSearchParams({});
  };

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/?query=${encodeURIComponent(query)}`);
    else navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-2">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggle}
          aria-label="Toggle Sidebar"
          className="p-1 rounded hover:bg-gray-100"
        >
          <Menu size={28} />
        </button>
        <Link to="/" className="flex items-center gap-2">
          <svg
            viewBox="0 0 576 512"
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-6 text-red-600"
            fill="currentColor"
          >
            <path d="M549.7 124.1c-6.3-23.7-24.9-42.4-48.6-48.7C456.2 64 288 64 288 64s-168.2 0-213.1 11.4c-23.7 6.3-42.3 25-48.6 48.7C15 168.1 15 256 15 256s0 87.9 11.3 131.9c6.3 23.7 24.9 42.4 48.6 48.7C119.8 448 288 448 288 448s168.2 0 213.1-11.4c23.7-6.3 42.3-25 48.6-48.7C561 343.9 561 256 561 256s0-87.9-11.3-131.9zM232 338V174l142 82-142 82z" />
          </svg>
          <span className="text-lg font-bold">YouTube</span>
        </Link>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex-1 max-w-md mx-4 relative"
      >
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search"
          className="w-full border rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
        />
        <button
          type="submit"
          className="absolute right-1 top-1 bottom-1 px-3 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <Search size={18} />
        </button>
      </form>

      {/* Right side: Sign In / User */}
      <div>
        {user ? (
          <div className="flex items-center gap-2">
            {user.avatar && (
              <img 
                src={user.avatar} 
                alt="User Avatar" 
                className="w-8 h-8 rounded-full" 
              />
            )}
            <button
              onClick={logout}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}
