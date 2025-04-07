import axios from "axios";
import { API_BASE_URL } from "../../configs/apiConfig";
import { IMultipleChoiceOption } from "../../interfaces/Options/IMultipleChoiceOption";
import { IMatchingOption } from "../../interfaces/Options/IMatchingOption";

export const getOptionByEnglishText = async (
  englishText: string
): Promise<IMultipleChoiceOption[] | IMatchingOption[] | null> => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}Option`, {
      params: { englishText },
      headers: {
        Accept: "*/*",
      },
    });
    return data.value;
  } catch (error) {
    console.error("Error getting option by english text:", error);
    return null;
  }
};
