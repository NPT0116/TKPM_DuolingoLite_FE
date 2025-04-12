/** @jsxImportSource @emotion/react */
import { CourseMockData } from "./CourseMockData";
import {
  ICourse,
  ICourseValue,
  ILessonInformation,
  ILessonValue,
  IRegisteredCourse,
} from "../../../interfaces/Course";
import CourseInfoCard from "./CourseInfoCard";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCourseList } from "../../../services/Course/GetCourseListService";
import {
  finishCourse,
  registerCourse,
} from "../../../services/Course/RegisterCourseService";
import { getUserCurrentCourse } from "../../../services/Course/GetUserCourseService";
import { IUserProgress } from "../../../interfaces/IUser";
import { getUserRegisterCourse } from "../../../services/User/GetUserRegisterdCourse";

const scrollBar = css`
  ::webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
const CourseManagementPage: React.FC = () => {
  const [courses, setCourses] = useState<ICourseValue[]>([]);
  const [userRegisterdCourses, setUserRegisterCourses] = useState<
    IRegisteredCourse[] | null
  >();
  const navigate = useNavigate();
  console.log(courses);
  // useEffect(() => {
  //   setCourses(CourseMockData);
  // }, []);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courseList = await getCourseList();
        console.log(courseList.value);
        setCourses(courseList.value);
      } catch (err) {
        console.log("Failed to fetch course list: " + err);
      }
    };

    const fetchUserRegisterdCourse = async () => {
      try {
        const result = await getUserRegisterCourse();
        console.log("User's Register Course: ");
        console.log(result);
        if (result) {
          setUserRegisterCourses(result.value);
        }
      } catch (error) {
        console.log("Error while fetching user current course: ", error);
      }
    };
    fetchCourses();
    fetchUserRegisterdCourse();
  }, []);
  const handleCourseSelected = async (course: ICourseValue) => {
    await finishCourse(course.id);
    await registerCourse(course.id);
    navigate("/home");
  };
  return (
    <div
      className="w-full h-full  flex flex-col justify-center items-center overflow-auto "
      style={{ padding: "5px 20px 20px 20px" }}
    >
      <div className="font-bold text-3xl w-full h-1/12 flex justify-center items-center border-b-2 border-[#37464F] ">
        Danh sách các khóa học
      </div>
      <div
        className="font-bold w-full h-10/12 flex flex-col justify-start items-center  gap-4 overflow-auto"
        style={{ padding: "10px 0" }}
        css={scrollBar}
      >
        {courses.map((course: ICourseValue, index) => {
          let isBlock = true;
          let currentLesson = 0;
          const totalLesson = course.lessons.length;
          const matchingCourse = userRegisterdCourses?.find(
            (registerCourse) => registerCourse.courseId === course.id
          );
          if (matchingCourse) {
            currentLesson = matchingCourse.lessonOrder;
            isBlock = false;
            console.log(
              "Current lesson of: ",
              course.id,
              " is ",
              currentLesson
            );
          }
          return (
            <CourseInfoCard
              key={course.id}
              onClick={() => {
                handleCourseSelected(course);
              }}
              isBlock={false}
              courseName={course.name}
              currentLesson={currentLesson} // order of current lesson
              totalLesson={totalLesson}
            />
          );
        })}
      </div>
    </div>
  );
};
export default CourseManagementPage;
