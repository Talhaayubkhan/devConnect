import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.DEV
    ? "http://localhost:4000"
    : import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export default api;
