import "./index.css";
import Navbar from "./components/Navbar";
import Posts from "./components/post/Posts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import PostForm from "./components/post/PostForm";
import PostPage from "./components/post/PostPage";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import ProtectedRoute from "./components/Auth/ProtectedRoute"; 
import axios from "axios";
import ProfileForm from "./components/Home/ProfileForm";
import LandingPage from "./components/LandingPage";

function App() {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      <Navbar />

      <Routes>

        <Route path="/" element={isLoggedIn ? <Home /> : <LandingPage />} />

        <Route
          path="/posts"
          element={
            <ProtectedRoute>
              <Posts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/post"
          element={
            <ProtectedRoute>
              <PostForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/post/:id"
          element={
            <ProtectedRoute>
              <PostPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileForm />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
