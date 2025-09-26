import axios from "axios";

export const authAPI = axios.create({
  baseURL: "http://localhost:3000/auth",
});

export const taskAPI = axios.create({
  baseURL: "http://localhost:3000/tasks",
  withCredentials: true,
});

// Add request interceptor to taskAPI
taskAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/admin",
  withCredentials: true,
});

// Add request interceptor to axiosInstance
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
