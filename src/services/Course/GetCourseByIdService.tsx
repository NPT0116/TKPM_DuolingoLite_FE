import axios from "axios";
import { API_BASE_URL } from "../../configs/apiConfig";

export const getCourseById = async (courseId: string): Promise<any> => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.warn("No authentication token found");
      return null;
    }

    const response = await axios.get(`${API_BASE_URL}Course/${courseId}`, {
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error fetching course by id:", error);
    return null;
  }
};
