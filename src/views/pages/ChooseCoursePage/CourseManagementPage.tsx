/** @jsxImportSource @emotion/react */
import { CourseMockData } from "./CourseMockData";
import {
  ICourse,
  ICourseValue,
  ILessonInformation,
  ILessonValue,
} from "../../../interfaces/Course";
import CourseInfoCard from "./CourseInfoCard";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCourseList } from "../../../services/Course/GetCourseListService";

const scrollBar = css`
  ::webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
const CourseManagementPage: React.FC = () => {
  const [courses, setCourses] = useState<ICourseValue[]>([]);
  console.log(courses);
  useEffect(() => {
    setCourses(CourseMockData);
  }, []);
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
        {courses.map((course: ICourseValue) => {
          let currentLesson = 9;
          let totalLesson = 10;
          return (
            <CourseInfoCard
              onClick={() => console.log("Logic of HỌC button here !")}
              isBlock={false}
              key={course.id}
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
