import { useEffect, useState } from "react";
import { IQuestion } from "../../../../../interfaces/IQuestion";
import QuestionChoice from "./QuestionChoice";
import AdminTestLessonPage from "../../AdminTest/AdminTestLessonPage";
import AddNewButton from "../../../../components/Admin/Components/AddNewButton";
import RemoveButton from "../../../../components/Admin/Components/RemoveButton";
import PopupDialog from "../../../../components/Admin/Components/PopupDialog";
import PopupDelete from "../PopupContent/PopupDelete";
import { deleteQuestion } from "../../../../../services/Lesson/DeleteQuestionService";
import { ILessonValue } from "../../../../../interfaces/Course";

interface IQuestionManagement {
  activeAddQuestionManagement?: () => void;
  selectedLesson?: ILessonValue | null;
  questionList: IQuestion[];
  title?: string;
}

const QuestionManagement: React.FC<IQuestionManagement> = ({
  selectedLesson,
  questionList,
  title,
  activeAddQuestionManagement,
}) => {
  const [selectedQuestion, setSelectedQuestion] = useState<IQuestion | null>(
    null
  );
  const [questionListState, setQuestionListState] =
    useState<IQuestion[]>(questionList);

  // Delete question
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteQuestionError, setDeleteQuestionError] = useState("");
  const [successDeleteQuestion, setSuccessDeleteQuestion] = useState(false);

  useEffect(() => {
    setQuestionListState(questionList);
  }, [questionList]);

  const handleDeleteQuestion = async () => {
    if (!selectedLesson || !selectedQuestion) return;

    const result = await deleteQuestion(
      selectedLesson.id,
      selectedQuestion.order
    );

    if ("error" in result) {
      setDeleteQuestionError(result.error);
    } else {
      setSuccessDeleteQuestion(true);

      setQuestionListState((prev) =>
        prev.filter((q) => q.questionId !== selectedQuestion.questionId)
      );

      setTimeout(() => {
        setConfirmDelete(false);
        setSelectedQuestion(null);
      }, 1000);
    }
  };

  return (
    <div className="w-full h-full  flex flex-row rounded-xl ">
      {confirmDelete && (
        <PopupDialog>
          <PopupDelete
            title={"Do you want to delete this question ?"}
            question={selectedQuestion!}
            onCancel={() => {
              setConfirmDelete(false);
            }}
            onDelete={() => {
              handleDeleteQuestion();
            }}
            errorMessage={deleteQuestionError}
            isDeleteLessonSuccess={successDeleteQuestion}
          />
        </PopupDialog>
      )}
      <div
        className="w-1/4 h-full rounded-bl-xl flex flex-col gap-4 overflow-auto"
        style={{ padding: "10px 20px" }}
      >
        {/* Manipulate Bar */}
        <div className="flex flex-col gap-4">
          {/* Add new Question */}
          <AddNewButton
            isAdd={false}
            content={"+"}
            onClick={() => {
              if (activeAddQuestionManagement) activeAddQuestionManagement();
            }}
          />
          {/* Question List  */}
          {questionListState.map((question, index) => (
            <div
              className="flex flex-row gap-2"
              onClick={() => setSelectedQuestion(question)}
            >
              <div className="w-10/12">
                <QuestionChoice
                  key={question.questionId}
                  onClick={() => setSelectedQuestion(question)}
                  index={index + 1}
                  type={question.type}
                />
              </div>
              <div className="w-2/12">
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
      {/* Question Preview */}
      <div className="w-3/4 h-full rounded-br-xl">
        <AdminTestLessonPage receivedQuestion={selectedQuestion!} />
      </div>
    </div>
  );
};
export default QuestionManagement;
