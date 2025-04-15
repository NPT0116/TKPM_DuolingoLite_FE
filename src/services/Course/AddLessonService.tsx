import api from "../../configs/axiosConfig";
import { ILessonValue } from "../../interfaces/Course";
import { handleApiError } from "../../ultils/handleApiError";

export const addLesson = async (
  courseId: string,
  title: string,
  xpEarned: number
): Promise<{ data: ILessonValue } | { error: string }> => {
  try {
    const response = await api.post(`Course/${courseId}/lesson`, {
      title: title,
      xpEarned: xpEarned,
    });
    return { data: response.data.value };
  } catch (error) {
    console.error("Error add lesson: ", error);
    const errorMessage = handleApiError(error);
    return { error: errorMessage };
  }
};
