import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-2 bg-white shadow">
      {/* Logo */}
      <Link to="/" className="text-lg font-bold text-red-600">
        YouTube
      </Link>

      {/* Search Bar */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex-1 max-w-md mx-4 relative"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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

      {/* Auth Button */}
      <Link
        to="/login"
        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
      >
        Sign In
      </Link>
    </header>
  );
}
