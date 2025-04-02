import axios from "axios";
import { API_BASE_URL } from "../../configs/apiConfig";
import { IMultipleChoiceOption } from "../../interfaces/Options/IMultipleChoiceOption";

export const addOption = async (
  option: IMultipleChoiceOption
): Promise<IMultipleChoiceOption | null> => {
  try {
    const response = await axios.post(`${API_BASE_URL}Option`, option, {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });
    return response.data?.value ?? null;
  } catch (error) {
    console.error("Error create new option: ", error);
    return null;
  }
};
