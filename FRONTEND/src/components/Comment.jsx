import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

export default function Comment({ comment, user, comments, setComments, api }) {
  if (!comment) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState(comment?.text || "");

  // Ensure commentAuthorId works whether it's populated or just the ID
  const commentAuthorId =
    typeof comment.userId === "object" ? comment.userId?._id : comment.userId;

  // Fix: user might have _id or id depending on /auth/me fetch
  const loggedInUserId = user?._id || user?.id;

  // Author check
  const isAuthor =
    commentAuthorId &&
    loggedInUserId &&
    String(commentAuthorId) === String(loggedInUserId);

  // Display name for comment
  const channelName =
    comment.userId?.channelName ||     
    comment.userId?.username ||       
    comment.username ||              
    "Unknown";                        

  // Display avatar if exists
  const avatarUrl = comment.userId?.avatar || comment.avatar || null;

  // Delete comment handler
  const handleDeleteComment = async () => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      await api.delete(`/comments/${comment._id}`);
      setComments((prev) => prev.filter((c) => c._id !== comment._id));
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  // Save edited comment
  const handleSaveEdit = async () => {
    if (!editingText.trim()) return;
    try {
      const res = await api.put(`/comments/${comment._id}`, {
        text: editingText,
      });
      setComments((prev) =>
        prev.map((c) => (c._id === comment._id ? res.data.data : c))
      );
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update comment:", err);
    }
  };

  return (
    <div className="flex items-start gap-4 p-4 border-b border-gray-200 last:border-b-0">
      {/* Avatar */}
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={channelName}
          className="w-8 h-8 rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "https://ui-avatars.com/api/?name=" + channelName;
          }}
        />
      ) : (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold">
          {channelName.charAt(0).toUpperCase()}
        </div>
      )}

      <div className="flex-1">
        {/* Username + Edit/Delete buttons */}
        <div className="flex items-center justify-between">
          <span className="font-semibold text-sm">@{channelName}</span>

          {/* Buttons always appear if the logged-in user is author */}
          {isAuthor && (
            <div className="flex gap-2 text-sm">
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <AiOutlineEdit size={16} />
                </button>
              )}
              <button
                onClick={handleDeleteComment}
                className="text-red-500 hover:text-red-700"
                title="Delete"
              >
                <AiOutlineDelete size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Text or edit field */}
        {isEditing ? (
          <div className="flex flex-col gap-2 mt-1">
            <textarea
              className="w-full p-1 border rounded"
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                className="text-blue-600 text-sm"
                onClick={handleSaveEdit}
              >
                Save
              </button>
              <button
                className="text-gray-600 text-sm"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="mt-1 text-sm text-gray-700">{comment.text}</p>
        )}
      </div>
    </div>
  );
}
