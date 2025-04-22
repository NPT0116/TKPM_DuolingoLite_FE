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
import { addCourse } from "../../../../services/Course/AddCourseService";
import { deleteCourse } from "../../../../services/Course/DeleteCourseService";
import { addLesson } from "../../../../services/Course/AddLessonService";
import EditButton from "../../../components/Admin/Components/EditButton";
import { editCourse } from "../../../../services/Course/EditCourseService";
import PopupCourseForm from "../../../components/Admin/Components/PopupCourseForm";
import { CRUDType } from "../../../../enums/CRUDType";
import PopupLessonForm from "../../../components/Admin/Components/PopupLessonForm";
import { editLesson } from "../../../../services/Course/EditLessonService";
import { useAdmin } from "../../../../context/AdminContext";

const AdminCourseManagementPage: React.FC = () => {
  const {
    setSelectedCourse,
    setSelectedLesson,
    selectedCourse,
    selectedLesson,
  } = useAdmin();

  // Add Course
  const [addCourseError, setAddCourseError] = useState("");
  const [isAddCourseSuccess, setIsAddCourseSuccess] = useState(false);
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);

  // Add Lesson
  const [addLessonError, setAddLessonError] = useState("");
  const [isAddLessonSuccess, setIsAddLessonSuccess] = useState(false);
  const [showAddLessonForm, setShowAddLessonForm] = useState(false);

  // Edit Course
  const [editCourseError, setEditCourseError] = useState("");
  const [isEditCourseSuccess, setIsEditCourseSuccess] = useState(false);
  const [showEditCourseForm, setShowEditCourseForm] = useState(false);

  // Edit Lesson
  const [editLessonError, setEditLessonError] = useState("");
  const [isEditLessonSuccess, setIsEditLessonSuccess] = useState(false);
  const [showEditLessonForm, setShowEditLessonForm] = useState(false);

  const [courses, setCourses] = useState<ICourseValue[] | null>(null);
  // Popup confirm
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteCourseError, setDeleteCourseError] = useState("");
  const [isDeleteCourseSuccess, setIsDeleteCourseSuccess] = useState(false);

  const fetchCoursesWithLessons = async (): Promise<ICourseValue[]> => {
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
      return coursesWithLessons;
    } catch (error) {
      console.error("Error fetching course list with lessons:", error);
      return [];
    }
  };
  useEffect(() => {
    fetchCoursesWithLessons();
  }, []);
  useEffect(() => {
    if (selectedCourse && selectedLesson) {
      console.log("Lesson ne:");
      console.log(courses);
      const newSelectedCourse = courses?.find(
        (c) => c.id === selectedCourse?.id
      );
      const newSelectedLesson = newSelectedCourse?.lessons.find(
        (l) => l.id === selectedLesson?.id
      );
      // console.log(selectedLesson);
      console.log(newSelectedLesson);
      if (newSelectedLesson) setSelectedLesson(newSelectedLesson);
    }
  });

  // Handle Selected Course & Selected Lesson
  // const [selectedCourse, setSelectedCourse] = useState<ICourseValue | null>(
  //   null
  // );
  // const [selectedLesson, setSelectedLesson] = useState<ILessonValue | null>(
  //   null
  // );
  const handleSetSelectedCourse = (course: ICourseValue) => {
    console.log("Course is Selected !");
    setSelectedCourse(course);
  };
  // Handle State of Pop up
  const [isAdd, setIsAdd] = useState(false);
  const handleBack = () => {};
  const handleTurnOff = () => {
    setSelectedCourse(null);
    setSelectedLesson(null);
    setIsAdd(false);
  };
  useEffect(() => {
    if (selectedCourse && selectedLesson) {
      setIsAdd(true);
    }
  }, [isAdd]);

  // Add New Course
  const addNewCourse = async (courseName: string) => {
    if (!courseName) {
      setAddCourseError("PLEASE ENTER COURSE NAME");
      return;
    }

    setAddCourseError("");
    setIsAddCourseSuccess(false);

    const response = await addCourse(courseName);

    if ("error" in response) {
      console.error("Error adding course:", response.error);
      setAddCourseError(response.error);
      setIsAddCourseSuccess(false);
    } else {
      setIsAddCourseSuccess(true);
      await fetchCoursesWithLessons();

      setTimeout(() => {
        setShowAddCourseForm(false);
      }, 1000);
    }
  };

  // Edit Course
  const handleEditCourse = async (newName: string) => {
    if (!newName) {
      setEditCourseError("PLEASE ENTER COURSE NAME");
      return;
    }

    setEditCourseError("");
    setIsEditCourseSuccess(false);

    const response = await editCourse(selectedCourse!.id, newName);

    if ("error" in response) {
      setEditCourseError(response.error);
      setIsEditCourseSuccess(false);
    } else {
      setIsEditCourseSuccess(true);
      await fetchCoursesWithLessons();

      const refreshedCourse = courses?.find((c) => c.id === selectedCourse?.id);
      if (refreshedCourse) {
        handleSetSelectedCourse(refreshedCourse);
      }

      setTimeout(() => {
        setShowEditCourseForm(false);
      }, 1000);
    }
  };

  // Edit Lesson
  const handleEditLesson = async (title: string, xpEarned: string) => {
    const trimmedTitle = title.trim();
    const xp = Number(xpEarned);

    if (!trimmedTitle) {
      setEditLessonError("Title is require");
      return;
    }

    if (!/^\d+$/.test(xpEarned)) {
      setEditLessonError("XP must be a valid number.");
      return;
    }

    if (xp < 0) {
      setEditLessonError("XP cannot be negative.");
      return;
    }

    const result = await editLesson(
      selectedCourse!.id,
      selectedLesson!.order,
      trimmedTitle,
      xp
    );

    if ("error" in result) {
      setEditLessonError(result.error);
    } else {
      setIsEditLessonSuccess(true);
      const updatedCourses = await fetchCoursesWithLessons();
      const refreshedCourse = updatedCourses.find(
        (c) => c.id === selectedCourse?.id
      );
      if (refreshedCourse) {
        handleSetSelectedCourse(refreshedCourse);
      }

      setTimeout(() => {
        setShowEditLessonForm(false);
      }, 1000);
    }
  };

  const addNewLesson = async (title: string, xpEarned: string) => {
    const trimmedTitle = title.trim();
    const xp = Number(xpEarned);

    if (!trimmedTitle) {
      setAddLessonError("Title is require");
      return;
    }

    if (!/^\d+$/.test(xpEarned)) {
      setAddLessonError("XP must be a valid number.");
      return;
    }

    if (xp < 0) {
      setAddLessonError("XP cannot be negative.");
      return;
    }

    const result = await addLesson(selectedCourse!.id, trimmedTitle, xp);
    if ("error" in result) {
      setAddLessonError(result.error);
    } else {
      setIsAddLessonSuccess(true);

      const updatedCourses = await fetchCoursesWithLessons();
      const refreshedCourse = updatedCourses.find(
        (c) => c.id === selectedCourse?.id
      );
      if (refreshedCourse) {
        handleSetSelectedCourse(refreshedCourse);
      }

      setTimeout(() => {
        setShowAddLessonForm(false);
      }, 1000);
    }
  };
  // Remove
  const removeCourse = async (courseId: string) => {
    const result = await deleteCourse(courseId);
    if ("error" in result) {
      setDeleteCourseError(result.error);
    } else {
      await fetchCoursesWithLessons();
      setIsDeleteCourseSuccess(true);

      setTimeout(() => {
        setConfirmDelete(false);
      }, 1000);
    }
  };

  // Main
  const [isAddCourse, setIsAddCourse] = useState(false);
  const [isAddLesson, setIsAddLesson] = useState(false);
  return (
    <div className=" w-full h-full flex flex-row justify-center items-center">
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
              setAddCourseError("");
              setIsAddCourseSuccess(false);
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
              <div className="w-10/12">
                <CourseItem
                  courseName={course.name}
                  courseLevel={course.level}
                />
              </div>
              <div className="w-1/12">
                <EditButton
                  onClick={() => {
                    setEditCourseError("");
                    setIsEditCourseSuccess(false);
                    setShowEditCourseForm(true);
                  }}
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
                    setAddLessonError("");
                    setIsAddLessonSuccess(false);
                    setIsAddLesson(true);
                    setTimeout(() => {
                      setIsAddLesson(false);
                    }, 300);
                    setShowAddLessonForm(true);
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
                      className="flex flex-col justify-center items-center gap-1 relative"
                      onClick={() => {
                        setSelectedLesson(lesson);
                      }}
                    >
                      <button
                        onClick={() => setShowEditLessonForm(true)}
                        className="absolute top-3 right-3 z-10 group cursor-pointer"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="transition duration-200 ease-in-out group-hover:fill-red-500"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.8637 2.28623L12.1531 1.00038C13.4906 -0.33346 15.659 -0.333457 16.9965 1.00038C18.3339 2.33421 18.3339 4.49679 16.9965 5.83062L15.7071 7.11648L10.8637 2.28623ZM9.34202 3.80383L0.902018 12.2209C0.0785876 13.0421 -0.354215 16.9413 0.363097 17.6567C1.08041 18.3722 4.90788 17.8864 5.7454 17.0512L14.1854 8.63408L9.34202 3.80383Z"
                            className="fill-white group-hover:fill-[#b4b4b4] transition duration-200"
                          ></path>
                        </svg>
                      </button>
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
      {/* Popup Content */}
      {isAdd && (
        <PopupDialog>
          <LessonManagement
            onBack={() => handleBack()}
            turnOff={() => handleTurnOff()}
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
              setDeleteCourseError("");
              setConfirmDelete(false);
            }}
            onDelete={() => {
              removeCourse(selectedCourse!.id);
            }}
            errorMessage={deleteCourseError}
            isDeleteSuccess={isDeleteCourseSuccess}
          />
        </PopupDialog>
      )}
      {showAddCourseForm && (
        <PopupDialog containerWidth="fit" containerHeight="fit">
          <PopupCourseForm
            mode={CRUDType.CREATE}
            onCancel={() => setShowAddCourseForm(false)}
            onCreate={(name) => {
              addNewCourse(name);
            }}
            isSuccess={isAddCourseSuccess}
            errorMessage={addCourseError}
          />
        </PopupDialog>
      )}
      {showAddLessonForm && (
        <PopupDialog containerWidth="fit" containerHeight="fit">
          <PopupLessonForm
            mode={CRUDType.CREATE}
            onCancel={() => setShowAddLessonForm(false)}
            onCreate={(title, xpEarned) => {
              addNewLesson(title, xpEarned);
            }}
            isSuccess={isAddLessonSuccess}
            errorMessage={addLessonError}
          />
        </PopupDialog>
      )}
      {showEditCourseForm && (
        <PopupDialog containerWidth="fit" containerHeight="fit">
          <PopupCourseForm
            mode={CRUDType.UPDATE}
            onCancel={() => setShowEditCourseForm(false)}
            onCreate={(name) => {
              handleEditCourse(name);
            }}
            isSuccess={isEditCourseSuccess}
            errorMessage={editCourseError}
            course={selectedCourse}
          />
        </PopupDialog>
      )}
      {showEditLessonForm && (
        <PopupDialog containerWidth="fit" containerHeight="fit">
          <PopupLessonForm
            mode={CRUDType.UPDATE}
            onCancel={() => setShowEditLessonForm(false)}
            onCreate={(title, xpEarned) => {
              handleEditLesson(title, xpEarned);
            }}
            isSuccess={isEditLessonSuccess}
            errorMessage={editLessonError}
            lesson={selectedLesson}
          />
        </PopupDialog>
      )}
    </div>
  );
};
export default AdminCourseManagementPage;
