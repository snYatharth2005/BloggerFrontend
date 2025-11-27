import { toggleLike } from "../../api/axiosClient";

function PostActionBar({ post, setPost, setPosts }) {
  const handleLike = () => {
    const username = localStorage.getItem("username");

    if (setPosts) {
      toggleLike(post.id, username).then((result) => {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === post.id
              ? {
                  ...p,
                  likeCount:
                    result === "liked" ? p.likeCount + 1 : p.likeCount - 1,
                  likedByUser: result === "liked",
                }
              : p
          )
        );
      });
    }

    if (setPost) {
      toggleLike(post.id, username).then((result) => {
        setPost((prev) => ({
        ...prev,
        likeCount: result === "liked" ? prev.likeCount + 1 : prev.likeCount - 1,
        likedByUser: result === "liked",
      }));
      })
    }
  };

  return (
    <div className="mt-4 flex justify-start gap-6 text-gray-500 text-xs">
      <span className="px-2 py-0.5 rounded-full shadow-sm cursor-pointer">
        💬 0
      </span>

      <span className="px-2 py-0.5 rounded-full shadow-sm cursor-pointer">
        🔁 0
      </span>

      <button
        className={`cursor-pointer transition ${
          post.likedByUser
            ? "text-pink-500 bg-pink-100 px-2 py-0.5 rounded-full hover:bg-pink-200 hover:text-pink-600 transition-all duration-300 shadow-sm"
            : "text-gray-500 px-2 py-0.5 rounded-full shadow-sm"
        }`}
        onClick={handleLike}
      >
        ❤️ {post.likeCount}
      </button>
    </div>
  );
}

export default PostActionBar;
