import api from "../../configs/axiosConfig";
import { handleApiError } from "../../ultils/handleApiError";

export const deleteCourse = async (
  courseId: string
): Promise<{ success: true } | { error: string }> => {
  try {
    await api.delete(`/Course/${courseId}`);
    return { success: true };
  } catch (error) {
    console.error("Error delete course:", error);
    const errorMessage = handleApiError(error);
    return { error: errorMessage };
  }
};
