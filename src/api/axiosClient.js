import axios from "axios";

const axiosClient = axios.create({
  baseURL: "backendbyteblog.railway.internal", // backend base URL
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
    const token = localStorage.getItem("token");
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

export const getPostById = async (id, username) => {
  try {
    const response = await axiosClient.get(`/post/${id}?username=${username}`);
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
  const token = localStorage.getItem("token");
  const response = await axiosClient.post("/profile/uploadImage", formData, {
    headers: { "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// export const updateLikes = async (id) =>{
//   try{
//     await axiosClient.put(`post/updateLike/${id}`,{}, {
//     headers: { "Content-Type": "multipart/form-data",
//       Authorization: `Bearer ${token}` },
//   });
//   } catch(e) {
//     console.error(`Error While liking the post with id ${id}:`, e);
//     throw e;
//   }
// }

export const toggleLike = async (postId, username) => {
  const token = localStorage.getItem("token");

  const response = await axiosClient.put(
    `post/toggleLike/${postId}?username=${username}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data; // "liked" or "unliked"
};

export const likedUsers = async (id) => {
  const response = await axiosClient.get(`post/likedUser/${id}`);
  return response.data;
}


export default axiosClient;
