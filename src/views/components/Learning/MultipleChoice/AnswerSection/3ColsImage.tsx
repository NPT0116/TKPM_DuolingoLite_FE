import { IMultipleChoiceQuestion } from "../../../../../interfaces/Questions/IMultipleChoiceQuestion";
import AnswerImageContainer3Cols from "../AnswerContainer/AnswerImageContainer3Cols";

interface AnswerSectionImage3ColsProps {
  data: IMultipleChoiceQuestion;
  setIsButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsButtonCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  isNext: boolean;
  setIsNext: React.Dispatch<React.SetStateAction<boolean>>;
}

const AnswerSectionImage3Cols: React.FC<AnswerSectionImage3ColsProps> = ({
  data,
  setIsButtonActive,
  setIsButtonCorrect,
  isNext,
  setIsNext,
}) => {
  return (
    <AnswerImageContainer3Cols
      options={data.options}
      setIsButtonActive={setIsButtonActive}
      setIsButtonCorrect={setIsButtonCorrect}
      isNext={isNext}
      setIsNext={setIsNext}
      isEnglish={data.optionConfigure.englishText}
    />
  );
};

export default AnswerSectionImage3Cols;
