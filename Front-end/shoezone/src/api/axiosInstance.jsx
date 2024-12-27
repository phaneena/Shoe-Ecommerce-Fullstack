import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Use the BASE_URL from .env
  withCredentials: true,
  timeout: 5000,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

export default axiosInstance;
