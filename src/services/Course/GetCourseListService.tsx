import axios from "axios";
import { API_BASE_URL } from "../../configs/apiConfig";

export const getCourseList = async (): Promise<any> => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("No authentication token found");
    }
    const response = await axios.get(`${API_BASE_URL}Course`, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching course list:", error);
    throw error;
  }
};
