import api from "../../configs/axiosConfig";
import { IRegisteredCourse } from "../../interfaces/Course";

export const getUserRegisterCourse = async (): Promise<{
  value: IRegisteredCourse[];
} | null> => {
  try {
    const { data } = await api.get("User/registered-course");
    return data;
  } catch (error) {
    return null;
  }
};
