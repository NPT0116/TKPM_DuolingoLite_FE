import Instruction from "../../../components/LearnPage/Instruction/Instruction";
import { IMultipleChoiceQuestion } from "../../../../interfaces/Questions/IMultipleChoiceQuestion";
import AnswerSection2Cols from "../../../components/Learning/MultipleChoice/AnswerSection/2Cols";
import AnswerSectionImage3Cols from "../../../components/Learning/MultipleChoice/AnswerSection/3ColsImage";
import { useEffect, useState } from "react";

interface MultipleChoiceProps {
  data: IMultipleChoiceQuestion;
  setIsButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsButtonCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmit: boolean;
}

const MultipleChoicePage: React.FC<MultipleChoiceProps> = ({
  setIsButtonActive,
  setIsButtonCorrect,
  data,
  isSubmit,
}) => {
  // const data = mockData.value;
  const hasQuestionContent =
    data.questionConfigure.audio ||
    data.questionConfigure.englishText ||
    data.questionConfigure.vietnameseText;

  const [isNext, setIsNext] = useState(false);

  useEffect(() => {
    setIsNext(true);
  }, [data.questionId]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[600px] h-[450px] flex flex-col gap-[24px] ">
        {/* Instruction */}
        <Instruction instruction={data.instruction} />

        {/* Question & Answer Section */}
        {hasQuestionContent ? (
          <AnswerSection2Cols
            data={data}
            setIsButtonActive={setIsButtonActive}
            setIsButtonCorrect={setIsButtonCorrect}
            isNext={isNext}
            setIsNext={setIsNext}
            isSubmit={isSubmit}
          />
        ) : (
          <AnswerSectionImage3Cols
            data={data}
            setIsButtonActive={setIsButtonActive}
            setIsButtonCorrect={setIsButtonCorrect}
            isNext={isNext}
            setIsNext={setIsNext}
            isSubmit={isSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default MultipleChoicePage;
