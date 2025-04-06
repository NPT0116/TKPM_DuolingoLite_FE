import api from "../../configs/axiosConfig";
import { IQuestion } from "../../interfaces/IQuestion";

export const getQuestionDetail = async (
  lessonId: string,
  questionOrder: number
): Promise<{ data: IQuestion | null }> => {
  try {
    const questionData = await api.get(
      `/Question/questions/list-questions/${lessonId}`,
      {
        params: { questionOrder },
      }
    );
    return { data: questionData.data.value };
  } catch (error) {
    console.error("Error fetching question detail:", error);
    return { data: null };
  }
};
