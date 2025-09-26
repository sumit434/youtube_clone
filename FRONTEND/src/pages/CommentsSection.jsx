import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../utils/axios.js";
import Comment from "../components/Comment.jsx";

export default function CommentsSection() {
  const { id: videoId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");

  // Fetch comments
  useEffect(() => {
    api
      .get(`/comments/${videoId}`)
      .then((res) => setComments(res.data.data?.filter(Boolean) || []))
      .catch((err) => console.error("Failed to fetch comments:", err));
  }, [videoId]);

  // Post new comment
  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    try {
      const res = await api.post(`/comments/${videoId}`, { text: newCommentText });
      if (res.data?.data) {
        setComments(prev => [res.data.data, ...prev]);
        setNewCommentText("");
      }
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  // Redirect to signup if not logged in
  const handleAuthRedirect = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Comments</h2>

      {/* Comment input form */}
      <form
        onSubmit={user ? handlePostComment : handleAuthRedirect}
        className="flex gap-4 items-center mb-6"
      >
        <input
          type="text"
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder={user ? "Add a comment..." : "Sign in to leave a comment..."}
          className={`flex-1 p-2 rounded-full border ${
            user
              ? "border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              : "border-gray-200 focus:outline-none"
          }`}
        />
        <button
          type="submit"
          className={`font-semibold py-2 px-6 rounded-full transition-colors ${
            user
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-600 hover:bg-gray-400"
          }`}
        >
          Comment
        </button>
      </form>

      {/* Comment list */}
      <div className="flex flex-col">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              user={user}
              comments={comments}
              setComments={setComments}
              api={api}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
}
