import React, { useState } from "react";
import axiosClient from "../../api/axiosClient"; // axios with baseURL + token

const PostForm = () => {

  const [form, setForm] = useState({
    title: "",
    content: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axiosClient.post("/post/createPost", {
        title: form.title,
        content: form.content
      });

      setMessage("✅ Post created successfully!");
      
      // Reset the form
      setForm({ title: "", content: "" });

    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to create post.");
    } finally {
      setLoading(false);
      console.log()
    }
  };

  return (
    <div className="max-w-xl mt-30 mx-auto my-6 bg-[#F0EFEF] border border-gray-300 rounded-md shadow-sm p-6 font-poppins">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Create a Post</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter post title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6552D0] focus:outline-none"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            name="content"
            placeholder="Write your post here..."
            value={form.content}
            onChange={handleChange}
            required
            rows="5"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6552D0] focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? "Posting..." : "Publish"}
        </button>
      </form>

      {/* Success/Error Message */}
      {message && (
        <p className="mt-3 text-sm text-center text-gray-700">{message}</p>
      )}
    </div>
  );
};

export default PostForm;
