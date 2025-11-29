import React, { useState } from "react";
import { postComment } from "../../api/axiosClient";

function CommentInput({ postId, onCommentAdded }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    setLoading(true);

    try {
      await postComment(postId, { content });
      setContent(""); // Clear input

      // Notify parent to refresh comments
      if (onCommentAdded) onCommentAdded();
    } catch (err) {
      console.error("Error posting comment", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3 flex items-center gap-2">
      <input
        type="text"
        placeholder="Write a comment..."
        className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-black focus:border-black outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`px-4 py-2 rounded-md text-white text-sm ${
          loading ? "bg-gray-400" : "bg-black hover:bg-gray-800"
        }`}
      >
        {loading ? "..." : "Post"}
      </button>
    </div>
  );
}

export default CommentInput;
