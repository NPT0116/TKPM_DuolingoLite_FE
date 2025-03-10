import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_PORT 
  ? `http://localhost:${import.meta.env.VITE_PORT}/api` 
  : "http://localhost:8082/api";

const api = axios.create({ baseURL: apiBaseUrl });

// Request interceptor to attach the auth token on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
