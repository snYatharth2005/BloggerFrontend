import React, { useState } from "react";
import { updateProfile, uploadImage } from "../../api/axiosClient";

const ProfileForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    age: "",
    about: "",
    twitter: "",
    linkedin: "",
    github: "",
    leetcode: "",
  });

  const [imageFile, setImageFile] = useState(null);
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
      await updateProfile(form);
      setMessage("✅ Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Profile update failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      setMessage("❌ Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      await uploadImage(formData);
      setMessage("✅ Profile image uploaded!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Image upload failed.");
    }
  };

  return (
    <div className="max-w-xl mt-30 mx-auto my-6 bg-[#F0EFEF] border border-gray-300 rounded-md shadow-sm p-6 font-poppins">

      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Complete Your Profile
      </h2>

      {/* ========================
          FORM 
      ========================== */}
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={form.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                       focus:ring-2 focus:ring-[#6552D0] focus:outline-none"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Age
          </label>
          <input
            type="number"
            name="age"
            placeholder="Enter age"
            value={form.age}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                       focus:ring-2 focus:ring-[#6552D0] focus:outline-none"
          />
        </div>

        {/* About */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            About
          </label>
          <textarea
            name="about"
            placeholder="Write about yourself..."
            rows="4"
            value={form.about}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                       focus:ring-2 focus:ring-[#6552D0] focus:outline-none"
          ></textarea>
        </div>

        {/* Social Links */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Twitter/X Link
          </label>
          <input
            type="text"
            name="twitter"
            placeholder="https://twitter.com/username"
            value={form.twitter}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                       focus:ring-2 focus:ring-[#6552D0] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn Link
          </label>
          <input
            type="text"
            name="linkedin"
            placeholder="https://linkedin.com/in/username"
            value={form.linkedin}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                       focus:ring-2 focus:ring-[#6552D0] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GitHub Link
          </label>
          <input
            type="text"
            name="github"
            placeholder="https://github.com/username"
            value={form.github}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                       focus:ring-2 focus:ring-[#6552D0] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LeetCode Link
          </label>
          <input
            type="text"
            name="leetcode"
            placeholder="https://leetcode.com/username"
            value={form.leetcode}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                       focus:ring-2 focus:ring-[#6552D0] focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-black text-white rounded-md 
                     font-medium hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>

      {/* ========================
          IMAGE UPLOAD SECTION
      ========================== */}
      <div className="mt-6 space-y-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Profile Photo
        </label>

        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full px-3 py-2 border border-gray-300 rounded-md 
                     focus:ring-2 focus:ring-[#6552D0] focus:outline-none"
        />

        <button
          onClick={handleImageUpload}
          className="w-full py-2 bg-black text-white rounded-md 
                     font-medium hover:bg-gray-800 transition"
        >
          Upload Image
        </button>
      </div>

      {message && (
        <p className="mt-3 text-sm text-center text-gray-700">{message}</p>
      )}
    </div>
  );
};

export default ProfileForm;
