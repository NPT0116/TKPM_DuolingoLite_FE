import api from "../../configs/axiosConfig";
import { ILessonValue } from "../../interfaces/Course";
import { handleApiError } from "../../ultils/handleApiError";

export const editLesson = async (
  courseId: string,
  lessonOrder: number,
  newTitle: string,
  newXpEarned: number
): Promise<{ data: { value: ILessonValue } } | { error: string }> => {
  try {
    const response = await api.put(
      `/Course/${courseId}/lesson/${lessonOrder}`,
      { newTitle: newTitle, newXpEarned: newXpEarned }
    );
    return { data: response.data };
  } catch (error) {
    console.error("Error editing lesson: ", error);
    const errorMessage = handleApiError(error);
    return { error: errorMessage };
  }
};
