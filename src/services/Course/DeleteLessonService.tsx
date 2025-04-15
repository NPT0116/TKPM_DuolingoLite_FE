import api from "../../configs/axiosConfig";
import { handleApiError } from "../../ultils/handleApiError";

export const deleteLesson = async (
  courseId: string,
  lessonOrder: number
): Promise<{ success: true } | { error: string }> => {
  try {
    await api.delete(`/Course/${courseId}/lesson/${lessonOrder}`);
    return { success: true };
  } catch (error) {
    console.log("Error delete last lesson:", error);
    const errorMessage = handleApiError(error);
    return { error: errorMessage };
  }
};
