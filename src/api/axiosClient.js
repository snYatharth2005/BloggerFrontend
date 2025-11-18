import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://bloggerbackend-production.up.railway.app", // backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔥 Automatically attach token before each request
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔥 Centralized error response handler
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 token expiry → Auto logout
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      window.location.href = "/login"; // redirect to login
    }

    return Promise.reject(error);
  }
);


export const getPosts = async () => {
  try {
    const response = await axiosClient.get("/post/viewAllPost");
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// ✅ Get a single post by ID
export const getPostById = async (id) => {
  try {
    const response = await axiosClient.get(`/post/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with id ${id}:`, error);
    throw error;
  }
};

export const updateProfile = async (data) => {
  const response = await axiosClient.put("/profile/update", data);
  return response.data;
};

export const uploadImage = async (formData) => {
  const response = await axiosClient.post("/profile/uploadImage", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export default axiosClient;
