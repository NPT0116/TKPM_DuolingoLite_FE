import { IMultipleChoiceQuestion } from "../../../../../interfaces/Questions/IMultipleChoiceQuestion";
import QuestionSection from "../../../LearnPage/QuestionSection/QuestionSection";
import AnswerContainer2Cols from "../AnswerContainer/AnswerContainer2Cols";

interface AnswerSection2ColsProps {
  data: IMultipleChoiceQuestion;
  setIsButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsButtonCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  isNext: boolean;
  setIsNext: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmit: boolean;
}
const AnswerSection2Cols: React.FC<AnswerSection2ColsProps> = ({
  data,
  setIsButtonActive,
  setIsButtonCorrect,
  isNext,
  setIsNext,
  isSubmit,
}) => {
  console.log(data);
  return (
    <div className="flex flex-col gap-[24px] ">
      {/* Question Section */}
      <QuestionSection
        words={data.words}
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
        isNext={isNext}
        setIsNext={setIsNext}
        isEnglish={data.optionConfigure.englishText}
        isSubmit={isSubmit}
      />
    </div>
  );
};

export default AnswerSection2Cols;
