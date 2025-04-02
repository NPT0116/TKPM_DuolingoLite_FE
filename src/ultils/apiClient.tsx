import axios from "axios";
import { API_BASE_URL } from "../configs/apiConfig";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

export default apiClient;
