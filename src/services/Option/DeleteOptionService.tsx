import api from "../../configs/axiosConfig";
import { handleApiError } from "../../ultils/handleApiError";

export const deleteOption = async (
  optionId: string
): Promise<{ success: true } | { error: string }> => {
  try {
    await api.delete(`Option/${optionId}`);
    return { success: true };
  } catch (error) {
    console.log("Error deleting option: ", error);
    const errorMessage = handleApiError(error);
    return { error: errorMessage };
  }
};
