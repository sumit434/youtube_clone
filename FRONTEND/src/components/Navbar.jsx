import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (newQuery) {
      setSearchParams({ query: newQuery });
    } else {
      setSearchParams({});
    }
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?query=${encodeURIComponent(query)}`);
    } else {
      navigate("/");
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