import api from "../../configs/axiosConfig";
import { IRankingValue } from "../../interfaces/IRanking";

export const getRankingList = async (): Promise<{
  data: IRankingValue | null;
}> => {
  try {
    const RankingList = await api.get("/Ranking/top");
    return { data: RankingList.data.value };
  } catch (error) {
    console.error("Error fetching ranking list:", error);
    return { data: null };
  }
};
