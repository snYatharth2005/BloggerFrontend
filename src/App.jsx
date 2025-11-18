import './index.css';
import Navbar from './components/Navbar';
import Posts from './components/post/Posts';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import PostForm from './components/post/PostForm';
import PostPage from './components/post/PostPage';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import ProtectedRoute from './components/Auth/ProtectedRoute';  // NEW
import axios from "axios";
import ProfileForm from './components/Home/ProfileForm';

function App() {

  // Load JWT token on app start and attach to axios
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        
        {/* Protected: Only logged in users can create a post */}
        <Route 
          path="/post" 
          element={
            <ProtectedRoute>
              <PostForm />
            </ProtectedRoute>
          }
        />

        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/profile" element={<ProfileForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </Router>
  );
}

export default App;
