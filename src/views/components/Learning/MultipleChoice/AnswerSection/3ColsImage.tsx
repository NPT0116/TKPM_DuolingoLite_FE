import { IMultipleChoiceQuestion } from "../../../../../interfaces/Questions/IMultipleChoiceQuestion";
import AnswerImageContainer3Cols from "../AnswerContainer/AnswerImageContainer3Cols";

interface AnswerSectionImage3ColsProps {
  data: IMultipleChoiceQuestion;
  setIsButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsButtonCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  isNext: boolean;
}

const AnswerSectionImage3Cols: React.FC<AnswerSectionImage3ColsProps> = ({
  data,
  setIsButtonActive,
  setIsButtonCorrect,
  isNext,
}) => {
  return (
    <AnswerImageContainer3Cols
      options={data.options}
      setIsButtonActive={setIsButtonActive}
      setIsButtonCorrect={setIsButtonCorrect}
      isNext={isNext}
    />
  );
};

export default AnswerSectionImage3Cols;
