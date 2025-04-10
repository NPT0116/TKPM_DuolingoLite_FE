import api from "../../configs/axiosConfig";
import { IUserRanking } from "../../interfaces/IRanking";

export const getUserRanking = async (): Promise<{
  data: IUserRanking | null;
}> => {
  try {
    const userRanking = await api.get("/Ranking/user-ranking");
    return { data: userRanking.data.value };
  } catch (error) {
    console.log("Error while fetching current user ranking:", error);
    return { data: null };
  }
};
