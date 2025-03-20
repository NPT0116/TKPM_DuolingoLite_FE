import axios from "axios";
import { API_BASE_URL } from "../../configs/apiConfig";

export const finishLesson = async (courseId: string) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.warn("No authentication token found");
      return null;
    }

    const response = await axios.post(
      `${API_BASE_URL}Course/finish-lesson`,
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
    console.log("Error finishing lesson:", error);
    return null;
  }
};
