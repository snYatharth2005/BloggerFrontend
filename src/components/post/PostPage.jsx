import React, { useEffect, useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { getPostById, likedUsers } from "../../api/axiosClient";
import { userIcon } from "../../assets/assets";
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

const PostPage = () => {
  // for post
  const [activeTab, setActiveTab] = useState("comments");

  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const [searchParam] = useSearchParams();

  const username = searchParam.get("username");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id, username);
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // for users who have liked above post
  const [users, setUsers] = useState([]);
  useEffect(() => {
    likedUsers(id)
      .then((data) => setUsers(data || []))
      .catch((err) =>
        console.error("error while fetching user who have liked the post", err)
      );
  }, []);

  if (loading) return <p className="text-center mt-25">Loading post...</p>;
  if (!post) return <p className="text-center mt-10">Post not found.</p>;

  return (
    <>
      <div className="max-w-3xl mt-30 mx-auto p-6 bg-[#F0EFEF] border border-gray-300 rounded-md shadow-sm font-poppins">
        <div className="flex gap-1 max-w-3xl mx-auto bg-[#F0EFEF] rounded-md font-poppins">
          <Link
            to="/home"
            className="relative px-4 py-2 h-10 mt-4 bg-black text-white rounded-md hover:bg-gray-800 transition group"
          >
            <span>← Posts</span>
          </Link>

          <div className="flex items-center mt-3 gap-4 mb-4">
            <img
              src={post.user.profileImageUrl || user}
              alt={post.user.username}
              className="w-12 h-12 rounded-full border border-gray-300 object-cover"
            />

            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-gray-900 leading-tight">
                {post.user.username}
              </h1>

              <span className="text-xs text-gray-500">
                {formatDateTime(post.createdAt)}
              </span>
            </div>
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed mb-6">{post.content}</p>

        {/* Main Image */}
        {/* {post.imageUrl && (
          <img
          src={post.imageUrl}
          alt="Post Banner"
          className="w-full rounded-lg mb-5 shadow-md"
          />
          )}  */}

        <div className="w-full bg-white rounded-md border border-gray-300 mt-4 overflow-hidden">
          <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
            No Image Available
          </div>
        </div>

        <div className="mt-4 flex justify-start gap-6 text-gray-500 text-xs">
          <PostActionBar post={post} setPost={setPost} />
        </div>
      </div>

      <div className="center mt-5 mx-2">
        <div className="mb-5 border border-gray-200 h-180 overflow-y-auto no-scrollbar rounded-t-md rounded-b-lg max-w-3xl mx-auto p-6 bg-[#F0EFEF] border-b border-r border-l rounded-md shadow-sm font-poppins">
          
          <div className="w-full p-3 bg-[#F0EFEF] flex gap-3 border-b border-gray-300">
            <button
              onClick={() => setActiveTab("comments")}
              className={`px-3 py-1 rounded-full shadow-sm cursor-pointer transition 
              ${activeTab === "comments" ? "bg-black text-white" : "bg-white"}`}
            >
              💬 Comments
            </button>

            <button
              onClick={() => setActiveTab("likes")}
              className={`px-3 py-1 rounded-full shadow-sm cursor-pointer transition 
              ${activeTab === "likes" ? "bg-black text-white" : "bg-white"}`}
            >
              ❤️ Likes
            </button>
          </div>

          <div className="content mt-4">
            {activeTab === "comments" && (
              <div className="w-full bg-white rounded-md border border-gray-300 overflow-hidden">
                <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                  Comments
                </div>
              </div>
            )}

            {activeTab === "likes" && (
              <div>
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between max-w-3xl mx-auto my-1 bg-[#F0EFEF] border border-gray-300 rounded-md shadow-sm font-poppins"
                  >
                    <div className="flex items-center gap-4 p-3">
                      <img
                        src={user.profileImageUrl  || userIcon}
                        alt={user.username}
                        className="w-8 h-10 ml-5 rounded-full border border-gray-300 object-cover"
                      />

                      <div className="flex flex-col">
                        <h1 className="text-lg font-semibold text-gray-900 leading-tight">
                          {user.username}
                        </h1>
                      </div>
                    </div>

                    <span className="text-pink-500 text-lg mr-5">💖</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPage;
