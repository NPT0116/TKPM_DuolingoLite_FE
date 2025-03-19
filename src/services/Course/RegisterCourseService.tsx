import axios from "axios";
import { API_BASE_URL } from "../../configs/apiConfig";

export const registerCourseService = async (courseId: string): Promise<any> => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.warn("No authentication token found");
      return null;
    }

    const response = await axios.post(
      `${API_BASE_URL}Course/register`,
      { courseId: courseId },
      {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error registering course:", error);
    return null; // Tránh crash app nếu lỗi xảy ra
  }
};
