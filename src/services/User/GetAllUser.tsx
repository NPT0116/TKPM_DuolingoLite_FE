import api from "../../configs/axiosConfig";

export const GetAllUser = async (): Promise<any[] | null> => {
  try {
    const { data } = await api.get("User/all/?PageSize=200");
    console.log("Get all user: ");
    return data.value.items;
  } catch (error) {
    console.log("Error while get all user: ", error);
    return null;
  }
};
