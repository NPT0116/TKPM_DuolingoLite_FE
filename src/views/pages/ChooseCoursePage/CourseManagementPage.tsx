/** @jsxImportSource @emotion/react */
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
        {courses.map(renderCourseCard)}
      </div>
    </div>
  );
};

export default CourseManagementPage;
