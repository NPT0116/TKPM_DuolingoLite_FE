import api from "../../configs/axiosConfig";
import { IAddQuestion } from "../../interfaces/Questions/IBaseQuestion";

import { handleApiError } from "../../ultils/handleApiError";

export const addMultipleChoiceQuestion = async (
  lessonId: string,
  question: IAddQuestion
): Promise<{ data?: any; error?: string }> => {
  try {
    const response = await api.post(
      `/Lesson/${lessonId}/add-question`,
      question
    );
    return { data: response.data };
  } catch (error) {
    const errorMessage = handleApiError(error);
    return { error: errorMessage };
  }
};
