import axios from "axios";1

// Fix the logical OR placement
const url = import.meta.env.VITE_PORT ? `http://localhost:${import.meta.env.VITE_PORT}/api` : "http://localhost:8082/api"
const api = axios.create({
    baseURL:  url
});
const token = localStorage.getItem("authToken");
if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer: ${token}`
}
axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
  
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default api;