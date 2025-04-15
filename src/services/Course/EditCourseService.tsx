import api from "../../configs/axiosConfig";
import { ICourseValue } from "../../interfaces/Course";
import { handleApiError } from "../../ultils/handleApiError";

export const editCourse = async (
  courseId: string,
  newName: string
): Promise<{ data: { value: ICourseValue } } | { error: string }> => {
  try {
    const response = await api.put(`/Course/${courseId}`, { newName: newName });
    return { data: response.data };
  } catch (error) {
    console.error("Error editing course: ", error);
    const errorMessage = handleApiError(error);
    return { error: errorMessage };
  }
};
