import { IMultipleChoiceQuestion } from "../../../../../interfaces/Questions/IMultipleChoiceQuestion";
import QuestionSection from "../../../LearnPage/QuestionSection/QuestionSection";
import AnswerContainer2Cols from "../AnswerContainer/AnswerContainer2Cols";

interface AnswerSection2ColsProps {
  data: IMultipleChoiceQuestion;
  setIsButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsButtonCorrect: React.Dispatch<React.SetStateAction<boolean>>;
}

const AnswerSection2Cols: React.FC<AnswerSection2ColsProps> = ({
  data,
  setIsButtonActive,
  setIsButtonCorrect,
}) => {
  return (
    <div
      className="flex flex-col gap-[24px] h-[50%]"
      style={{ margin: "auto 0px" }}
    >
      {/* Question Section */}
      <QuestionSection
        questionConfigure={data.questionConfigure}
        audio={data.audio}
        picture={data.picture}
        englishText={data.englishText}
        vietnameseText={data.vietnameseText}
      />
      {/* Answer Section */}
      <AnswerContainer2Cols
        options={data.options}
        setIsButtonActive={setIsButtonActive}
        setIsButtonCorrect={setIsButtonCorrect}
      />
    </div>
  );
};

export default AnswerSection2Cols;
