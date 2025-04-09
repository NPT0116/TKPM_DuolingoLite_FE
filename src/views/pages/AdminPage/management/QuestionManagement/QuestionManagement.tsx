import { useState } from "react";
import { IQuestion } from "../../../../../interfaces/IQuestion";
import QuestionChoice from "./QuestionChoice";
import AdminTestLessonPage from "../../AdminTest/AdminTestLessonPage";
import AddNewButton from "../../../../components/Admin/Components/AddNewButton";
import RemoveButton from "../../../../components/Admin/Components/RemoveButton";
import PopupDialog from "../../../../components/Admin/Components/PopupDialog";
import PopupDelete from "../PopupContent/PopupDelete";

interface IQuestionManagement {
  activeAddQuestionManagement?: () => void;
  questionList: IQuestion[];
  title?: string;
}

const QuestionManagement: React.FC<IQuestionManagement> = ({
  questionList,
  title,
  activeAddQuestionManagement,
}) => {
  const [selectedQuestion, setSelectedQuestion] = useState<IQuestion | null>(
    null
  );
  const [confirmDelete, setConfirmDelete] = useState(false);

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
              setConfirmDelete(false);
            }}
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
          {questionList.map((question, index) => (
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
