import { API_BASE_URL } from "../../configs/apiConfig";
import api from "../../configs/axiosConfig";
import { IAddNewOption } from "../../interfaces/Options/IBaseOption";
import { handleApiError } from "../../ultils/handleApiError";

export const addOption = async (
  option: IAddNewOption
): Promise<{ data: { value: IAddNewOption } } | { error: string }> => {
  try {
    const response = await api.post(`${API_BASE_URL}Option`, option);
    return { data: response.data };
  } catch (error) {
    console.error("Error create new option: ", error);
    const errorMessage = handleApiError(error);
    return { error: errorMessage };
  }
};
