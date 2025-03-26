import axios from "axios";
import { ILessonReport } from "../../interfaces/SpaceRepetation/ILessonReport";
import { API_BASE_URL } from "../../configs/apiConfig";

export const postLessonReport = async (
  report: ILessonReport
): Promise<void> => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Unauthorized");
    }

    await axios.post(`${API_BASE_URL}spaced-repetition/lesson-report`, report, {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error posting lesson report:", error);
  }
};

export const submitLessonReport = async (
  report: ILessonReport
): Promise<void> => {
  try {
    await postLessonReport(report);
    console.log("post successfully");
  } catch (err) {
    console.log("Error lesson layout posting leson report:", err);
  }
};
