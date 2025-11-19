import React, { useEffect, useState } from "react";
import { getPosts } from "../../api/axiosClient";
import { Link } from "react-router-dom";

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
      .then((data) => {
        setPosts(data || []);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <h2 className="text-center text-gray-500 mt-8">Loading...</h2>;

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-5 max-w-4xl mx-auto space-y-6 font-poppins">

      {posts.length === 0 ? (
        <p className="text-gray-500 text-center">No posts available</p>
      ) : (
        posts.map((post) => (
          <Link
            to={`/post/${post.id}`}
            key={post.id}
            className="
              block 
              p-4 sm:p-5 
              bg-[#F0EFEF] 
              border border-gray-300 
              rounded-md 
              hover:shadow-md 
              transition 
              w-full
            "
          >
            <div className="flex flex-col h-full">

              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                {post.title}
              </h3>

              <p className="text-gray-600 text-sm sm:text-base line-clamp-2 mt-1">
                {post.content}
              </p>

              <div className="mt-3 flex flex-col sm:flex-row justify-between sm:items-center text-xs sm:text-sm text-gray-500">
                
                <span className="mb-1 sm:mb-0">
                  Posted by <strong>{post.user.username}</strong>
                </span>

                <span className="text-right">{formatDateTime(post.createdAt)}</span>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default Posts;
