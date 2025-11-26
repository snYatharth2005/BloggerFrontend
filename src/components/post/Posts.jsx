import React, { useEffect, useState } from "react";
import axiosClient, { getPosts, toggleLike } from "../../api/axiosClient";
import { Link } from "react-router-dom";
import { user } from "../../assets/assets";
import PostActionBar from "./PostActionBar";

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

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then((data) => setPosts(data || []))
      .catch((err) => console.error("Error fetching posts:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <h2 className="text-center text-gray-500 mt-20">Loading...</h2>;

  return (
    <div className="px-4 sm:px-6 lg:px-8 my-5 max-w-3xl mx-auto space-y-8 font-poppins">
      {posts.length === 0 ? (
        <p className="text-gray-500 text-center">No posts available</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="block w-full bg-[#F0EFEF] border border-gray-300 rounded-xl p-6 hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <img
                  src={post.user.profileImageUrl || user}
                  alt={post.user.username}
                  className="w-9 h-9 p-1 rounded-full border border-gray-300 object-cover"
                />

                <div className="flex flex-col leading-tight">
                  <span className="text-[15px] font-semibold text-gray-900">
                    {post.user.username}
                  </span>
                  <span className="text-xs text-gray-500">
                    @{post.user.username.toLowerCase()}
                  </span>
                </div>
              </div>

              <span className="text-xs text-gray-500 whitespace-nowrap">
                {formatDateTime(post.createdAt)}
              </span>
            </div>

            <Link to={`/post/${post.id}?username=${post.user.username}`} key={post.id}>
              <div className="text-lg font-bold text-gray-900 mb-2">
                “{post.title}”
              </div>

              <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line mb-4">
                {post.content
                  .split("\n")
                  .slice(0, 4)
                  .map((line, index) => (
                    <div key={index}>- {line.trim()}</div>
                  ))}
                <span className="ml-90">...read more</span>
              </div>
            </Link>

            <div className="w-full bg-white rounded-md border border-gray-300 mt-4 overflow-hidden">
              <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                No Image Available
              </div>
            </div>

            <div className="mt-4 flex justify-start gap-6 text-gray-500 text-xs">
              <PostActionBar post={post} setPosts={setPosts} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Posts;
