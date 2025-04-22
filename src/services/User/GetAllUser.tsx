import api from "../../configs/axiosConfig";
import { IUser } from "../../interfaces/IUser";

export const GetAllUser = async (): Promise<{
  data: IUser | null;
}> => {
  try {
    const { data } = await api.get("User/all/?PageSize=200");
    return { data: data.value.items };
  } catch (error) {
    console.log("Error while get all user: ", error);
    return { data: null };
  }
};
