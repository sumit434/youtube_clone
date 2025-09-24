import React, { useState } from "react";

export function UploadVideoPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
    category: "All",
  });

  const categories = [
    "All",
    "Gaming",
    "Music",
    "Education",
    "Entertainment",
    "News",
    "Sports",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", form);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-lg w-full p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Upload Video</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Video Title"
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Video Description"
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            type="text"
            name="videoUrl"
            value={form.videoUrl}
            onChange={handleChange}
            placeholder="Video URL"
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <input
            type="text"
            name="thumbnailUrl"
            value={form.thumbnailUrl}
            onChange={handleChange}
            placeholder="Thumbnail URL"
            className="w-full border rounded-lg px-3 py-2"
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            Upload
          </button>
        </form>
        </div>
    </div>
  );
}
