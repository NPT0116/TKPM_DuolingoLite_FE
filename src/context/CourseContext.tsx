import { createContext, useContext, useState } from "react";
import { ICourse, ICourseValue, IRegisteredCourse } from "../interfaces/Course";

interface CourseContextProps {
  switchCourse: ICourseValue | null;
  registeredCourses: IRegisteredCourse[] | null;
  setSwitchCourse: (course: ICourseValue | null) => void;
  setRegisteredCourses: (courses: IRegisteredCourse[]) => void;
}
const CourseContext = createContext<CourseContextProps>({
  switchCourse: null,
  registeredCourses: null,
  setSwitchCourse: () => {},
  setRegisteredCourses: () => {},
});
export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [switchCourse, setSwitchCourse] = useState<ICourseValue | null>(null);
  const [registeredCourses, setRegisteredCourses] = useState<
    IRegisteredCourse[] | null
  >(null);
  return (
    <CourseContext.Provider
      value={{
        switchCourse,
        registeredCourses,
        setSwitchCourse,
        setRegisteredCourses,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
export const useCourseContext = () => useContext(CourseContext);
