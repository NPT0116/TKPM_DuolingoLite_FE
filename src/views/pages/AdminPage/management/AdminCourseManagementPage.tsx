/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import CourseItem from "../../../components/Admin/Management/CourseItem";
import LessonItem from "../../../components/Admin/Management/LessonItem";
import { ICourseValue, ILessonValue } from "../../../../interfaces/Course";
// import { fakeCourseResponse } from "./MockCourse";
import AddNewButton from "../../../components/Admin/Components/AddNewButton";
import LessonManagement from "./LessonManagement/LessonManagement";
import { getCourseList } from "../../../../services/Course/GetCourseListService";
import { getLessonByCourseId } from "../../../../services/Lesson/GetLessonByCourseIdService";
import RemoveButton from "../../../components/Admin/Components/RemoveButton";
import PopupDialog from "../../../components/Admin/Components/PopupDialog";
import PopupDelete from "./PopupContent/PopupDelete";
import PopupAddCourse from "../../../components/Admin/Components/PopupAddCourse";
import { addCourse } from "../../../../services/Course/AddCourseService";
import { deleteCourse } from "../../../../services/Course/DeleteCourseService";

const AdminCourseManagementPage: React.FC = () => {
  const [errorDeleteMsg, setErrorDeleteMsg] = useState("");
  const [courses, setCourses] = useState<ICourseValue[] | null>(null);
  // Popup confirm
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);

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
  // CSS effect add button

  // Add New
  const addNewCourse = async (courseName: string) => {
    const response = await addCourse(courseName);
    if (response.error) {
      console.log("Error adding course:", response.error);
    } else {
      const newCourse = response.data.value as ICourseValue;
      setCourses((prev) => (prev ? [...prev, newCourse] : [newCourse]));
    }
    setShowAddCourseForm(false);
  };
  const addNewLesson = () => {
    console.log("Add new Lesson !");
  };
  // Remove
  const removeCourse = async (courseId: string) => {
    try {
      await deleteCourse(courseId);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  // Main
  const [isAddCourse, setIsAddCourse] = useState(false);
  const [isAddLesson, setIsAddLesson] = useState(false);
  return (
    <div className=" w-full h-full flex flex-row justify-center items-center">
      {/* Popup Content */}
      {isAdd && (
        <PopupDialog>
          <LessonManagement
            onBack={() => handleBack()}
            selectedCourse={selectedCourse}
            selectedLesson={selectedLesson}
          />
        </PopupDialog>
      )}
      {confirmDelete && (
        <PopupDialog containerWidth="40%" containerHeight="50%">
          <PopupDelete
            title="DELETE THIS COURSE ?"
            course={selectedCourse!}
            onCancel={() => {
              console.log("Cancel delete");
              setConfirmDelete(false);
            }}
            onDelete={() => {
              removeCourse(selectedCourse!.id);
              setConfirmDelete(false);
            }}
          />
        </PopupDialog>
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
          <AddNewButton
            onClick={() => {
              setShowAddCourseForm(true);
              setIsAddCourse(true);
              setTimeout(() => {
                setIsAddCourse(false);
              }, 300);
            }}
            isAdd={isAddCourse}
            content="ADD NEW COURSE"
          />
          {courses?.map((course) => (
            <div
              className="w-full flex flex-row gap-2"
              onClick={() => handleSetSelectedCourse(course)}
            >
              <div className="w-11/12">
                <CourseItem
                  courseName={course.name}
                  courseLevel={course.level}
                />
              </div>
              <div className="w-1/12">
                <RemoveButton
                  onClick={() => {
                    setConfirmDelete(true);
                  }}
                />
              </div>
            </div>
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
                <AddNewButton
                  key={15}
                  onClick={() => {
                    setIsAddLesson(true);
                    setTimeout(() => {
                      setIsAddLesson(false);
                    }, 300);
                    addNewLesson();
                  }}
                  width="150"
                  height="150"
                  isAdd={isAddLesson}
                  content="+"
                />
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
                        lessonQuestionCount={lesson.questionCount!}
                        lessonEp={lesson.xpEarned}
                        onClick={() => setIsAdd(true)}
                      />{" "}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {showAddCourseForm && (
        <PopupDialog containerWidth="fit" containerHeight="fit">
          <PopupAddCourse
            onCancel={() => setShowAddCourseForm(false)}
            onCreate={(name) => {
              addNewCourse(name);
            }}
          />
        </PopupDialog>
      )}
    </div>
  );
};
export default AdminCourseManagementPage;
