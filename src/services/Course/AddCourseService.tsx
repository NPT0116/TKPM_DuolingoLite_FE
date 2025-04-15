import api from "../../configs/axiosConfig";
import { ICourseValue } from "../../interfaces/Course";
import { handleApiError } from "../../ultils/handleApiError";

export const addCourse = async (
  name: string
): Promise<{ data: { value: ICourseValue } } | { error: string }> => {
  try {
    const response = await api.post("/Course", { name });
    return { data: response.data };
  } catch (error) {
    console.error("Error adding course:", error);
    const errorMessage = handleApiError(error);
    return { error: errorMessage };
  }
};
