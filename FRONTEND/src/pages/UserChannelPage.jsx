import React from "react";

export default function UserChannelPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Create Your Channel
        </h2>
        <form className="space-y-4">
          <input
            type="text"
            name="channelName"
            placeholder="Channel Name"
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <textarea
            name="description"
            placeholder="Channel Description"
            className="w-full border rounded-lg px-3 py-2"
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            Create Channel
          </button>
        </form>
      </div>
    </div>
  );
}
