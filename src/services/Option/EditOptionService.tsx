import api from "../../configs/axiosConfig";
import { IAddNewOption, IOption } from "../../interfaces/Options/IBaseOption";
import { handleApiError } from "../../ultils/handleApiError";

export const editOption = async (
  option: IAddNewOption
): Promise<{ data: { value: IOption } } | { error: string }> => {
  try {
    const { optionId, ...body } = option;

    const response = await api.put(`Option/${optionId}`, body);
    return { data: response.data };
  } catch (error) {
    console.error("Error editing option: ", error);
    const errorMessage = handleApiError(error);
    return { error: errorMessage };
  }
};
