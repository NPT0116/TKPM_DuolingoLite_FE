import { MutableRefObject } from "react";
import { IMultipleChoiceQuestion } from "../../../../../interfaces/Questions/IMultipleChoiceQuestion";
import QuestionSection from "../../../LearnPage/QuestionSection/QuestionSection";
import AnswerImageContainer3Cols from "../AnswerContainer/AnswerImageContainer3Cols";

interface AnswerSectionImage3ColsProps {
  data: IMultipleChoiceQuestion;
  setIsButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsButtonCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  isNext: boolean;
  setIsNext: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmit: boolean;
}

const AnswerSectionImage: React.FC<AnswerSectionImage3ColsProps> = ({
  data,
  setIsButtonActive,
  setIsButtonCorrect,
  isNext,
  setIsNext,
  isSubmit,
}) => {
  return (
    <div className="flex flex-col w-full h-full justify-between">
      <div className="h-1/7 w-full">
        <QuestionSection
          words={data.words}
          questionConfigure={data.questionConfigure}
          audio={data.audio}
          picture={data.picture}
          englishText={data.englishText}
          vietnameseText={data.vietnameseText}
        />
      </div>
      <div className="h-6/7 w-full">
        <AnswerImageContainer3Cols
          options={data.options}
          setIsButtonActive={setIsButtonActive}
          setIsButtonCorrect={setIsButtonCorrect}
          isNext={isNext}
          setIsNext={setIsNext}
          isEnglish={data.optionConfigure.englishText}
          isSubmit={isSubmit}
        />
      </div>
    </div>
  );
};

export default AnswerSectionImage;
