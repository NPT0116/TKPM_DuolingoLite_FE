import axios from "axios";
import { API_BASE_URL } from "../../configs/apiConfig";
import { getUserProfile } from "../Authentication/AuthService";
import { IUserProfile } from "../../interfaces/Auth/IUserProfile";

export const getUserCurrentCourse = async (
  userData: IUserProfile | string
): Promise<any> => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.warn("No authentication token found");
      return null;
    }
    const userId = typeof userData === "string" ? userData : userData.id;
    const response = await axios.get(
      `${API_BASE_URL}Course/current/${userId}`,
      {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
        validateStatus: (status) => true,
      }
    );

    if (response.status === 404) {
      console.warn("Course not found (404)");
      return null;
    }

    if (response.status !== 200) {
      console.error("Unexpected response:", response.status);
      return null;
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching user course list:", error);
    return null; // Tránh throw lỗi để không làm crash app
  }
};
