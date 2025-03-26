import axios from "axios";
import { API_BASE_URL } from "../../configs/apiConfig";

export const getUserHeart = async (): Promise<any> => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No authentication found");
    }

    const response = await axios.get(`${API_BASE_URL}User/heart`, {
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting user heart: ", error);
    return null;
  }
};
