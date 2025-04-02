import axios from "axios";
import { IQuestion } from "../../interfaces/IQuestion";
import { IMultipleChoiceQuestion } from "../../interfaces/Questions/IMultipleChoiceQuestion";
import { API_BASE_URL } from "../../configs/apiConfig";

const DEFAULT_LESSON_ID = "17ff2224-daab-4fff-9ad5-7acef879e3b7";

export const addMultipleChoiceQuestion = async (
  lessonId: string = DEFAULT_LESSON_ID,
  question: IMultipleChoiceQuestion
): Promise<any> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}Lesson/${lessonId}/add-question`,
      question,
      { headers: { Accept: "*/*", "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add multiple choice question: ", error);
    return null;
  }
};
