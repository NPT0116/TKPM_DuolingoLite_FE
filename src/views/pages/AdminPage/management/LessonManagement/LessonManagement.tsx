import { useEffect, useState } from "react";
import { ICourseValue, ILessonValue } from "../../../../../interfaces/Course";
import { useNavigate } from "react-router-dom";
import { getQuestionDetail } from "../../../../../services/Question/getQuestionDetailService";
import { IQuestion } from "../../../../../interfaces/IQuestion";
import QuestionManagement from "../QuestionManagement/QuestionManagement";
import PopupHeader from "../../../../components/Admin/Components/PopupHeader";
import PopupChoseQuestionType from "../PopupContent/PopupChoseQuestionType";
import PopupDelete from "../PopupContent/PopupDelete";
import PopupDialog from "../../../../components/Admin/Components/PopupDialog";
import { deleteLesson } from "../../../../../services/Course/DeleteLessonService";
interface ILessonManagement {
  onBack?: () => void;
  selectedCourse?: ICourseValue | null;
  selectedLesson?: ILessonValue | null;
}
const LessonManagement: React.FC<ILessonManagement> = ({
  onBack,
  selectedCourse,
  selectedLesson,
}) => {
  const [errorDeleteLesson, setErrorDeleteLesson] = useState("");
  const [isDeleteLessonSuccess, setIsDeleteLessonSuccess] = useState(false);

  // Fetch QuestionList
  const [questionList, setQuestionList] = useState<IQuestion[]>([]);
  const fetchLesson = async () => {
    console.log("Fetching Question !");
    if (selectedLesson) {
      for (let i = 1; i <= selectedLesson.questionCount!; i++) {
        const { data } = await getQuestionDetail(selectedLesson.id, i);
        if (data) {
          setQuestionList((prev) => [...prev, data]);
        }
      }
    }
  };
  useEffect(() => {
    setQuestionList([]);
    fetchLesson();
  }, [selectedLesson]);

  //  Handle Add Quiz
  const navigate = useNavigate();
  const handleClick = (type: string) => {
    const url = `/admin/course/${selectedCourse?.id}/lesson/${selectedLesson?.id}/${type}`;
    navigate(url);
  };
  const [isAddQuestionForm, setIsAddQuestionForm] = useState(false);
  // Handle Reload and Delete Lesson
  const [confirmDelete, setConfirmDelete] = useState(false);
  // Handle Delete
  const handleDeleteLesson = async () => {
    const result = await deleteLesson(
      selectedCourse!.id,
      selectedLesson!.order
    );
    if ("error" in result) {
      setErrorDeleteLesson(result.error);
    } else {
      setIsDeleteLessonSuccess(true);
      fetchLesson();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };
  return (
    <div className="w-[100vw] h-[100vh] bg-white rounded-xl transition-all duration-300">
      {/* Popup Content */}
      {confirmDelete && (
        <PopupDialog containerWidth="40%" containerHeight="30%">
          <PopupDelete
            title={"Delete this Lesson ?"}
            onCancel={() => {
              setConfirmDelete(false);
            }}
            onDelete={handleDeleteLesson}
            errorMessage={errorDeleteLesson}
            isDeleteLessonSuccess={isDeleteLessonSuccess}
          />
        </PopupDialog>
      )}

      {/* Popup add question */}
      {isAddQuestionForm && (
        <PopupChoseQuestionType
          setVisible={() => {
            setIsAddQuestionForm(false);
          }}
          navigatePage={handleClick}
        />
      )}
      {/* Popup Confirm */}
      {/* Header */}
      <div className="w-full h-1/10">
        <PopupHeader
          isReloadButton={true}
          isDeleteButton={true}
          handleDelete={() => {
            setErrorDeleteLesson("");
            setConfirmDelete(true);
          }}
          handleReload={() => {
            console.log("Reload Lesson");
          }}
          headerTitle={`${selectedLesson?.title}'s Questions`}
        />
      </div>
      {/* Main Content */}
      <div className="w-full h-9/10">
        <QuestionManagement
          activeAddQuestionManagement={() => {
            setIsAddQuestionForm(true);
          }}
          questionList={questionList}
          selectedLesson={selectedLesson}
        />
      </div>
    </div>
  );
};
export default LessonManagement;
