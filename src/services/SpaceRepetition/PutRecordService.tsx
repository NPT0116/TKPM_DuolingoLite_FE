import axios from "axios";
import { API_BASE_URL } from "../../configs/apiConfig";

export const putRecord = async (
  recordId: string,
  isCorrect: boolean
): Promise<void> => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Unauthorized");
    }

    await axios.put(
      `${API_BASE_URL}spaced-repetition/record/${recordId}/review`,
      { isCorrect: isCorrect },
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log("Error putting record:", error);
  }
};

export const putRecordThroughRecordId = async (
  recordId: string,
  isCorrect: boolean
): Promise<void> => {
  try {
    await putRecord(recordId, isCorrect);
  } catch (error) {
    console.error("Error putting record in review layout: ", error);
  }
};
