import axios from "axios";
import { API_BASE_URL } from "../../configs/apiConfig";
import { IReviewRecordDue } from "../../interfaces/SpaceRepetation/IDueReview";

const getDueReview = async (userId: string): Promise<any> => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get(
      `${API_BASE_URL}spaced-repetition/reviews-records-due`,
      {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          UserId: userId,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("❌ Failed to fetch due reviews:", error);
    return null;
  }
};

export default getDueReview;

export const fetchDueReview = async (
  userId: string,
  setDueReviewRecord: React.Dispatch<
    React.SetStateAction<IReviewRecordDue | null>
  >
): Promise<void> => {
  try {
    const responseData = await getDueReview(userId);
    setDueReviewRecord(responseData.value);
  } catch (error) {
    console.error("Error fetching due review: ", error);
  }
};
