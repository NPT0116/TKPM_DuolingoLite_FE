import { useEffect, useState } from "react";
import CourseItem from "../../../components/Admin/Management/CourseItem";
import LessonItem from "../../../components/Admin/Management/LessonItem";
import { ICourseValue, ILessonValue } from "../../../../interfaces/Course";
// import { fakeCourseResponse } from "./MockCourse";
import StepButton from "../../../components/Admin/Components/StepButton";
import LessonManagement from "./LessonManagement";
import { getCourseList } from "../../../../services/Course/GetCourseListService";
import { getLessonByCourseId } from "../../../../services/Lesson/GetLessonByCourseIdService";
const AdminCourseManagementPage: React.FC = () => {
  const [courses, setCourses] = useState<ICourseValue[] | null>(null);

  useEffect(() => {
    const fetchCoursesWithLessons = async () => {
      try {
        const data = await getCourseList();
        const courseList = data.value;

        const coursesWithLessons = await Promise.all(
          courseList.map(async (course: ICourseValue) => {
            const lessonResult = await getLessonByCourseId(course.id);
            console.log("Lessons: ", lessonResult.data.value);
            return {
              ...course,
              lessons: lessonResult?.data.value || [],
            };
          })
        );
        setCourses(coursesWithLessons);
      } catch (error) {
        console.error("Error fetching course list with lessons:", error);
      }
    };

    fetchCoursesWithLessons();
    // console.log("Fetch Mock Courses");
    // setCourses(fakeCourseResponse.value);
  }, []);

  // console.log(courses);
  // Handle Selected Course
  const [selectedCourse, setSelectedCourse] = useState<ICourseValue | null>(
    null
  );
  const handleSetSelectedCourse = (course: ICourseValue) => {
    console.log("Course is Selected !");
    setSelectedCourse(course);
  };
  // Handle Selected Lesson
  const [selectedLesson, setSelectedLesson] = useState<ILessonValue | null>(
    null
  );
  // Handle State of Pop up
  const [isAdd, setIsAdd] = useState(false);
  const handleBack = () => {
    setIsAdd(false);
  };

  // Main
  return (
    <div className=" w-full h-full flex flex-row justify-center items-center">
      {/* Popup Content */}
      {isAdd && (
        <div className="w-full h-full absolute left-0 top-0 z-10">
          <div className="absolute left-0 top-0 w-[100vw] h-[100vh] flex justify-center items-center !z-20">
            <LessonManagement
              onBack={() => handleBack()}
              selectedCourse={selectedCourse}
              selectedLesson={selectedLesson}
            />
          </div>
          <div className="absolute left-0 top-0 z-10 w-[100vw] h-[100vh]  bg-black opacity-50 flex justify-center items-center"></div>
        </div>
      )}
      {/* Main Content */}
      <div className="h-full w-2/3 border-[#E5E5E5] border-r-2">
        <div className="w-full h-1/10 text-center flex justify-center items-center font-bold 2xl:text-3xl text-2xl text-black border-b-2 border-[#E5E5E5]">
          Picking Course for Editing
        </div>
        <div
          className="w-full h-9/10  flex flex-col gap-4 overflow-auto"
          style={{ padding: "20px 50px" }}
        >
          {courses?.map((course) => (
            <CourseItem
              courseName={course.name}
              courseLevel={course.level}
              onClick={() => handleSetSelectedCourse(course)}
            />
          ))}
        </div>
      </div>
      <div className="h-full w-1/3 ">
        {selectedCourse ? (
          <div className="w-full flex gap-4 justify-center items-center h-1/10 text-center  font-bold 2xl:text-2xl text-xl border-b-2 border-[#E5E5E5]">
            {selectedCourse.name}
            <img
              width={30}
              src="https://schools-cdn.duolingo.com/images/7568e088430bd955149ed4d8d3605131.svg"
              alt=""
            />
          </div>
        ) : null}

        <div className="w-full h-9/10  flex flex-col justify-center items-center">
          {selectedCourse === null ? (
            <img
              src="https://schools-cdn.duolingo.com/images/7312c6d737065b44d09cba76b1304973.svg"
              alt=""
            />
          ) : (
            <div
              className="relative w-full h-full overflow-auto flex flex-col gap-2"
              style={{ padding: "20px 0 0 0" }}
            >
              <div
                className=" w-full  gap-4 flex flex-wrap justify-center items-center "
                style={{ padding: "0 10px 10px 10px" }}
              >
                {selectedCourse.lessons
                  .slice()
                  .sort((a, b) => a.order - b.order)
                  .map((lesson) => (
                    <div
                      className="flex flex-col justify-center items-center gap-1"
                      onClick={() => setSelectedLesson(lesson)}
                    >
                      <LessonItem
                        lessonTitle={lesson.title}
                        lessonQuestionCount={lesson.questionCount}
                        lessonEp={lesson.xpEarned}
                        onClick={() => setIsAdd(true)}
                      />{" "}
                      {/* <StepButton
                        content="ADD QUIZ"
                        width="90%"
                        onClick={() => setIsAdd(true)}
                      /> */}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AdminCourseManagementPage;
