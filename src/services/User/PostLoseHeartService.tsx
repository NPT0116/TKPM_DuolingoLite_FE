import { API_BASE_URL } from "../../configs/apiConfig";

export const postLoseHeart = async (): Promise<any> => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No authentication found");
    }

    const response = await fetch(`${API_BASE_URL}User/lose-heart`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Upload failed: ${error}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error posting lose heart", error);
    throw error;
  }
};
