import { IAddQuestion } from "../../interfaces/Questions/IBaseQuestion";
import apiClient from "../../ultils/apiClient";
import { handleApiError } from "../../ultils/handleApiError";

export const addMultipleChoiceQuestion = async (
  lessonId: string,
  question: IAddQuestion
): Promise<{ data?: any; error?: string }> => {
  try {
    const response = await apiClient.post(
      `/Lesson/${lessonId}/add-question`,
      question
    );
    return { data: response.data };
  } catch (error) {
    const errorMessage = handleApiError(error);
    return { error: errorMessage };
  }
};
