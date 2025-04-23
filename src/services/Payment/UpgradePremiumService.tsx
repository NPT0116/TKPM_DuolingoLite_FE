import api from "../../configs/axiosConfig";
import { handleApiError } from "../../ultils/handleApiError";

export const upgradePremium = async (
  durationInMonth: number,
  price: number
): Promise<{ success: true } | { error: string }> => {
  try {
    await api.post(`User/upgrade`, { durationInMonth, price });
    return { success: true };
  } catch (error) {
    console.log("Error upgrading premium: ", error);
    const errorMessage = handleApiError(error);
    return { error: errorMessage };
  }
};
