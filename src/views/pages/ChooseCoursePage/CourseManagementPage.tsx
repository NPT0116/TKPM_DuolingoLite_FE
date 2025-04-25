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
import { getUserRegisterCourse } from "../../../services/User/GetUserRegisterdCourse";
import { useCourseContext } from "../../../context/CourseContext";
import CourseInfoCard from "./CourseInfoCard";
import CourseSuccessInfoCard from "./CourseSuccessInfoCard";
import { ICourseValue, IRegisteredCourse } from "../../../interfaces/Course";

const scrollBar = css`
  ::-webkit-scrollbar {
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
  const [userRegisteredCourses, setUserRegisteredCourses] = useState<
    IRegisteredCourse[] | null
  >(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseList, registeredResult] = await Promise.all([
          getCourseList(),
          getUserRegisterCourse(),
        ]);

        setCourses(courseList.value);
        if (registeredResult) {
          setUserRegisteredCourses(registeredResult.value);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCourseSelected = async (course: ICourseValue) => {
    const alreadyRegistered = userRegisteredCourses?.some(
      (rc) => rc.courseId === course.id
    );

    if (!alreadyRegistered) {
      await registerCourse(course.id);
    }

    setSwitchCourse(course);
    if (userRegisteredCourses) {
      setRegisteredCourses(userRegisteredCourses);
    }
    navigate("/home");
  };

  const renderCourseCard = (course: ICourseValue) => {
    const matchingCourse = userRegisteredCourses?.find(
      (rc) => rc.courseId === course.id
    );
    const totalLesson = course.lessons.length;

    if (matchingCourse) {
      const { lessonOrder: currentLesson, isCompleted } = matchingCourse;

      if (isCompleted) {
        return (
          <CourseSuccessInfoCard
            key={course.id}
            courseName={course.name}
            onClick={() => handleCourseSelected(course)}
          />
        );
      } else {
        return (
          <CourseInfoCard
            key={course.id}
            courseName={course.name}
            currentLesson={currentLesson}
            totalLesson={totalLesson}
            isBlock={false}
            onClick={() => handleCourseSelected(course)}
          />
        );
      }
    }

    // Nếu chưa đăng ký khóa này:
    return (
      <CourseInfoCard
        key={course.id}
        courseName={course.name}
        currentLesson={0}
        totalLesson={totalLesson}
        isBlock={true}
        onClick={() => handleCourseSelected(course)}
      />
    );
  };

  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center overflow-auto"
      style={{ padding: "5px 20px 20px 20px" }}
    >
      <div className="font-bold text-3xl w-full h-1/12 flex justify-center items-center border-b-2 border-[#37464F]">
        Danh sách các khóa học
      </div>
      <div
        className="font-bold w-full h-10/12 flex flex-col justify-start items-center gap-4 overflow-auto"
        style={{ padding: "10px 0", marginTop: "20px" }}
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
          }
          return (
            <CourseInfoCard
              courseInfoCardTemplate={
                courseInfoCardTemplate[index % courseInfoCardTemplate.length]
              }
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
