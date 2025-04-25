/** @jsxImportSource @emotion/react */
import { CourseMockData } from "./CourseMockData";
import {
  ICourseInfoCardTemplate,
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
import { registerCourse } from "../../../services/Course/RegisterCourseService";
import { getUserCurrentCourse } from "../../../services/Course/GetUserCourseService";
import { IUserProgress } from "../../../interfaces/IUser";
import { getUserRegisterCourse } from "../../../services/User/GetUserRegisterdCourse";
import { useCourseContext } from "../../../context/CourseContext";
import CourseSuccessInfoCard from "./CourseSuccessInfoCard";

const scrollBar = css`
  ::webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const CourseManagementPage: React.FC = () => {
  // Course Image - Color Mapping
  const courseInfoCardTemplate: ICourseInfoCardTemplate[] = [
    {
      courseImageUrl:
        "https://d35aaqx5ub95lt.cloudfront.net/images/pathSections/exampleSentences/801070f230984a26ae39fff41cbb1dc6.svg",
      courseColor: "#58CB00",
    },
    {
      courseImageUrl:
        "https://d35aaqx5ub95lt.cloudfront.net/images/pathSections/exampleSentences/3d544b217f0f66952b44b0caa5681fa2.svg",
      courseColor: "#27E97B",
    },
    {
      courseImageUrl:
        "https://d35aaqx5ub95lt.cloudfront.net/images/pathSections/exampleSentences/45a3c65a8dbd5f2eab7d98d7c732f449.svg",
      courseColor: "#E619DF",
    },
    {
      courseImageUrl:
        "https://d35aaqx5ub95lt.cloudfront.net/images/pathSections/exampleSentences/2caa8beaa5242118ba32b0aa79c10c03.svg",
      courseColor: "#89E219",
    },
    {
      courseImageUrl:
        "https://d35aaqx5ub95lt.cloudfront.net/images/pathSections/exampleSentences/84513fc7eaf3242eefcc91065cd64d19.svg",
      courseColor: "#FF8ACF",
    },
    {
      courseImageUrl:
        "https://d35aaqx5ub95lt.cloudfront.net/images/pathSections/exampleSentences/b73daf15e4e5d58e93c293745a3304af.svg",
      courseColor: "blue",
    },
  ];

  const { setSwitchCourse, setRegisteredCourses } = useCourseContext();
  const [courses, setCourses] = useState<ICourseValue[]>([]);
  const [userRegisterdCourses, setUserRegisterCourses] = useState<
    IRegisteredCourse[] | null
  >();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courseList = await getCourseList();
        setCourses(courseList.value);
      } catch (err) {
        console.log("Failed to fetch course list: " + err);
      }
    };

    const fetchUserRegisterdCourse = async () => {
      try {
        const result = await getUserRegisterCourse();
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
    console.log("User enrolled into course ", course.id);
    const checkRegistered = userRegisterdCourses?.some(
      (registeredCourse: IRegisteredCourse) => {
        return registeredCourse.courseId === course.id;
      }
    );
    if (!checkRegistered) await registerCourse(course.id);
    setSwitchCourse(course);
    setRegisteredCourses(userRegisterdCourses!);
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
          let isCompleted = false;
          const totalLesson = course.lessons.length;
          const matchingCourse = userRegisterdCourses?.find(
            (registerCourse) => registerCourse.courseId === course.id
          );
          if (matchingCourse) {
            isCompleted = matchingCourse.isCompleted;
            currentLesson = matchingCourse.lessonOrder;
            isBlock = false;
          }
          if (isCompleted) {
            return (
              <CourseSuccessInfoCard
                key={course.id}
                courseName={course.name}
                onClick={() => handleCourseSelected(course)}
              />
            );
          } else
            return (
              <CourseInfoCard
                courseInfoCardTemplate={
                  courseInfoCardTemplate[index % courseInfoCardTemplate.length]
                }
                key={course.id}
                onClick={() => {
                  handleCourseSelected(course);
                }}
                isBlock={isBlock}
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
