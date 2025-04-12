import api from "../../configs/axiosConfig";
import { handleApiError } from "../../ultils/handleApiError";

export const addCourse = async (
  name: string
): Promise<{ data?: any; error?: string }> => {
  try {
    const response = await api.post("/Course", { name });
    return { data: response.data };
  } catch (error) {
    console.error("Error adding course:", error);
    const errorMessage = handleApiError(error);
    return { error: errorMessage };
  }
};
