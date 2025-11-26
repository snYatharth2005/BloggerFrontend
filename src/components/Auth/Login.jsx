import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import axiosClient from "../../api/axiosClient";


const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const loginPayload = {
      username: form.username,
      password: form.password,
    };

    try {
      setLoading(true);

      const res = await axiosClient.post("/auth/login", loginPayload);

      // backend returns { token: "...." }
      const token = res.data.token;
      localStorage.setItem("token", token);

      // decode username from JWT
      const decoded = jwtDecode(token);
      localStorage.setItem("username", decoded.sub);

      setMessage(`✅ Login successful! ${localStorage.getItem("username")}`);
      
      setTimeout(() => navigate("/home"), 800);

    } catch (err) {
      const msg =
        err?.response?.data ||
        err?.response?.data?.message ||
        "❌ Invalid username or password!";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F0EFEF]">
      <div className="bg-white border border-gray-300 rounded-md shadow-sm p-8 w-full max-w-md transition transform hover:shadow-md hover:scale-[1.01]">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6552D0]"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6552D0]"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
