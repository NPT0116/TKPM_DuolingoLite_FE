import api from "../../configs/axiosConfig";
import { handleApiError } from "../../ultils/handleApiError";

export const deleteCourse = async (
  courseId: string
): Promise<{ data?: any; error?: string }> => {
  try {
    const response = await api.delete(`/Course/${courseId}`);
    return { data: response.data };
  } catch (error) {
    console.error("Error delete course:", error);
    const errorMessage = handleApiError(error);
    return { error: errorMessage };
  }
};
