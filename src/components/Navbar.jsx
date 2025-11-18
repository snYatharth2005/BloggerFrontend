import React from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import contact, { logo } from "../assets/assets";

const Navbar = () => {
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/login"; // or navigate("/login")
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-transparent px-8 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-8 bg-[#F0EFEF] border border-gray-300 rounded-md px-6 py-3 shadow-sm">
          <NavLink to="/" className="flex items-center space-x-2">
            <img src={logo} alt="logo" className="h-10 w-10" />
            <span className="text-xl font-semibold text-gray-900">
              ByteBlog
            </span>
          </NavLink>

          <ul className="hidden md:flex space-x-6 text-gray-600 font-medium">
            <li>
              <NavLink to="/pricing" className="hover:text-black transition">
                Pricing
              </NavLink>
            </li>
            <li>
              <NavLink to="/post" className="hover:text-black transition">
                Post<span className="ml-1">+</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/cases" className="hover:text-black transition">
                Cases
              </NavLink>
            </li>
            <li>
              <NavLink to="/code" className="hover:text-black transition">
                Code
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="flex  items-center space-x-4 bg-[#F0EFEF] border border-gray-300 rounded-md px-6 py-3 shadow-sm">
          <select className="cursor-pointer border  border-gray-300 rounded-md px-2 py-1 text-sm text-gray-700 bg-white focus:outline-none">
            <option>All</option>
            <option>My Post</option>
            <option>By Following</option>
          </select>

          <ThemeToggle />

          <button className="p-2 cursor-pointer rounded-full border border-gray-300 hover:bg-gray-100 transition">
            <img src={contact} alt="contact" className="w-6 h-6" />
          </button>

          {username ? (
            <div className="relative group inline-block">
              {/* MAIN BUTTON */}
              <span
                className="relative inline-block cursor-pointer overflow-hidden
    px-6 py-2 font-semibold text-white bg-black rounded-md
    transition-all duration-300 hover:scale-95"
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                  Hi, {username}
                </span>

                <span
                  className="absolute inset-0 bg-white translate-y-full
      transition-transform duration-300 ease-in-out
      group-hover:translate-y-0"
                ></span>
              </span>

              {/* DROPDOWN */}
              <div
                className="
      absolute left-0 right-0 top-full -mt-[-5px]
      opacity-0 invisible pointer-events-none -translate-y-2
      group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto
      group-hover:translate-y-0
      transition-all duration-300 ease-out
    "
              >
                <NavLink
                  to="/profile"
                  className="w-full text-left px-11 py-2 bg-black text-white rounded-md
      hover:bg-gray-800 transition cursor-pointer"
                >
                  Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="cursor-pointer w-full text-left mt-3 px-6 py-2 bg-white text-black rounded-md transition hover:scale-95"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="relative group cursor-pointer overflow-hidden px-6 py-2 font-semibold text-white bg-black rounded-md transition-all duration-300 hover:scale-95"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                Login
              </span>
              <span className="absolute inset-0 bg-white translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0"></span>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
