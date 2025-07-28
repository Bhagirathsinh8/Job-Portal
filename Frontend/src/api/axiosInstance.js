import { ROUTES } from "@/utils/constant";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: ROUTES.BASE, // change this to your backend URL
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add token to requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default axiosInstance;
