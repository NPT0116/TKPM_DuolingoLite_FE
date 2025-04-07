import { useState } from "react";
import { IQuestion } from "../../../../../interfaces/IQuestion";
import QuestionChoice from "./QuestionChoice";
import AdminTestLessonPage from "../../AdminTest/AdminTestLessonPage";

interface IPreviewQuestion {
  questionList: IQuestion[];
  title?: string;
}

const PreviewQuestion: React.FC<IPreviewQuestion> = ({
  questionList,
  title,
}) => {
  const [selectedQuestion, setSelectedQuestion] = useState<IQuestion | null>(
    null
  );
  return (
    <div className="w-full h-full  flex flex-row rounded-xl">
      <div
        className="w-1/4 h-full rounded-bl-xl flex flex-col gap-4 overflow-auto"
        style={{ padding: "10px 20px" }}
      >
        <div className="text-center font-bold text-2xl">{title} Questions</div>
        <div className="flex flex-col gap-4">
          {questionList.map((question, index) => (
            <QuestionChoice
              onClick={() => setSelectedQuestion(question)}
              index={index + 1}
              type={question.type}
            />
          ))}
        </div>
      </div>
      <div className="w-3/4 h-full rounded-br-xl">
        {/* {selectedQuestion?.instruction} */}
        <AdminTestLessonPage receivedQuestion={selectedQuestion!} />
      </div>
    </div>
  );
};
export default PreviewQuestion;
