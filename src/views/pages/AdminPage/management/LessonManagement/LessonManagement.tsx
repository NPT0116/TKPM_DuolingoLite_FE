import { useEffect, useState } from "react";
import { ICourseValue, ILessonValue } from "../../../../../interfaces/Course";
import { useNavigate } from "react-router-dom";
import { getQuestionDetail } from "../../../../../services/Question/getQuestionDetailService";
import { IQuestion } from "../../../../../interfaces/IQuestion";
import QuestionManagement from "../QuestionManagement/QuestionManagement";
import PopupHeader from "../../../../components/Admin/Components/PopupHeader";
import PopupChoseQuestionType from "../PopupContent/PopupChoseQuestionType";
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
  // Handle content

  // Fetch QuestionList
  const [questionList, setQuestionList] = useState<IQuestion[]>([]);
  useEffect(() => {
    setQuestionList([]);
    // console.log(selectedCourse);
    // console.log(selectedLesson);
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
  const handleReloadLesson = () => {
    console.log("Reload Lesson");
  };
  const handleDeleteLesson = () => {
    console.log("Delete Lesson");
  };
  return (
    <div className="w-[100vw] h-[100vh] bg-white rounded-xl transition-all duration-300">
      {/* Popup Content */}
      {/* Popup add question */}
      {isAddQuestionForm && (
        <PopupChoseQuestionType
          setVisible={() => {
            setIsAddQuestionForm(false);
          }}
          navigatePage={handleClick}
        />
      )}
      {/* Header */}
      <div className="w-full h-1/10">
        <PopupHeader
          isReloadButton={true}
          isDeleteButton={true}
          handleDelete={handleDeleteLesson}
          handleReload={handleReloadLesson}
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
        />
      </div>
    </div>
  );
};
export default LessonManagement;
