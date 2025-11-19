import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostById } from "../../api/axiosClient";

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading post...</p>;
  if (!post) return <p className="text-center mt-10">Post not found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-30 p-6 bg-[#F0EFEF] border border-gray-300 rounded-md shadow-sm font-poppins">
      
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h1>

      <div className="text-sm text-gray-500 mb-4">
        <span>
          Posted by <strong>{post.user.username}</strong>
        </span>
        <br />
        <span>Created: {formatDateTime(post.createdAt)}</span>
      </div>

      <p className="text-gray-700 leading-relaxed mb-6">{post.content}</p>

      <Link
        to="/"
        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
      >
        ← Back to Home
      </Link>
    </div>
  );
};

export default PostPage;
