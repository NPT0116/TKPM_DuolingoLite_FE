import api from "../../configs/axiosConfig";
import { handleApiError } from "../../ultils/handleApiError";

export const deleteQuestion = async (
  lessonId: string,
  questionOrder: number
): Promise<{ success: true } | { error: string }> => {
  try {
    await api.delete(`Lesson/${lessonId}/question`, {
      params: { questionOrder: questionOrder },
    });
    return { success: true };
  } catch (error) {
    console.error("Error delete question: ", error);
    const errorMessage = handleApiError(error);
    return { error: errorMessage };
  }
};
