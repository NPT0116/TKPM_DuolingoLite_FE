import apiClient from "../../ultils/apiClient";
import { handleApiError } from "../../ultils/handleApiError";

export const getLessonByCourseId = async (courseId: string): Promise<any> => {
  try {
    const response = await apiClient.get(`Lesson/${courseId}`);
    return { data: response.data };
  } catch (error) {
    const errorMessage = handleApiError(error);
    return { error: errorMessage };
  }
};
