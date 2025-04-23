import axios from "axios";
import { API_BASE_URL } from "../../configs/apiConfig";

export const getUserProfile = async (): Promise<any> => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(`${API_BASE_URL}Authentication/me`, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.setItem("userId", response.data.value.id);
    localStorage.setItem("role", response.data.value.role);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

export const fetchUserId = async (
  setUserId: React.Dispatch<React.SetStateAction<string>>
): Promise<void> => {
  try {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(`${API_BASE_URL}Authentication/me`, {
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${authToken}`,
      },
    });

    setUserId(response.data.value.id);
  } catch (error) {
    console.error("Failed to fetch user ID:", error);
  }
};
