import api from "../../configs/axiosConfig";
import { handleApiError } from "../../ultils/handleApiError";

export const postRecordActivity = async (): Promise<
  { success: true } | { error: string }
> => {
  try {
    await api.post(`UserActivity/record-activity`);
    return { success: true };
  } catch (error) {
    console.error("Error posting record activity: ", error);
    const errorMessage = handleApiError(error);
    return { error: errorMessage };
  }
};
