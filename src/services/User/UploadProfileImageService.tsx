import { API_BASE_URL } from "../../configs/apiConfig";

export const uploadProfileImage = async (file: File): Promise<any> => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No authentication found");
    }
    const formData = new FormData();
    formData.append("Avatar", file);

    const response = await fetch(`${API_BASE_URL}User/profile-image/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Upload failed: ${error}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error uploading profile image:", error);
    throw error;
  }
};
