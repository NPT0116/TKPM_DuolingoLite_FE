import axios from "axios";
import { API_BASE_URL } from "../../configs/apiConfig";
import { IQuestion } from "../../interfaces/IQuestion";

const getQuestionThroughRecordId = async (recordId: string): Promise<any> => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No authentication found");
    }

    const response = await axios.get(
      `${API_BASE_URL}spaced-repetition/reviews-question-due`,
      {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          RecordId: recordId,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get question through recordId:", error);
    return null;
  }
};

export default getQuestionThroughRecordId;

export const fetchQuestionThroughRecordId = async (
  recordId: string,
  setQuestionList: React.Dispatch<React.SetStateAction<IQuestion[]>>
): Promise<void> => {
  try {
    const responseData = await getQuestionThroughRecordId(recordId);
    setQuestionList((prev) => [...prev, responseData.value]);
  } catch (error) {
    console.error("Error fetching question through recordId:", error);
  }
};
