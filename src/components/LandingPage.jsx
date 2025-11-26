import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F0EFEF] px-6 text-center">

      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Welcome to <span className="text-[#6552D0]">ByteBlog</span>
      </h1>

      <p className="text-gray-700 text-lg md:text-xl max-w-xl mb-8">
        A simple and elegant blogging platform where you can share your thoughts, 
        read interesting posts, and connect with writers.
      </p>

      <div className="flex gap-4 mt-4">

        <Link
          to="/login"
          className="px-6 py-2 bg-black text-white rounded-md font-semibold 
                     hover:bg-gray-800 transition-all"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="px-6 py-2 bg-white border border-gray-400 text-gray-800 
                     rounded-md font-semibold 
                     hover:bg-gray-100 transition-all"
        >
          Register
        </Link>

      </div>

      <footer className="mt-10 text-sm text-gray-500">
        © 2025 ByteBlog · Created by Yatharth
      </footer>

    </div>
  );
};

export default LandingPage;
