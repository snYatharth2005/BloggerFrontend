import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080", // backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

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

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      window.location.href = "/login"; 
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
