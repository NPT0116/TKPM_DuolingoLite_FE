import Instruction from "../../../components/LearnPage/Instruction/Instruction";
import { IMultipleChoiceQuestion } from "../../../../interfaces/Questions/IMultipleChoiceQuestion";
import AnswerSection from "../../../components/Learning/MultipleChoice/AnswerSection/AnswerSection";
import AnswerSectionImage3Cols from "../../../components/Learning/MultipleChoice/AnswerSection/AnswerSectionImage";
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
  const hasImageAnswer = data.optionConfigure.image !== false;
  const [isNext, setIsNext] = useState(false);

  useEffect(() => {
    setIsNext(true);
  }, [data.questionId]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full sm:w-full md:w-[600px] min-w-[600px] max-h-[450px] flex flex-col justify-center  ">
        {/* Instruction */}
        <Instruction instruction={data.instruction} />

        {/* Question & Answer Section */}
        {hasImageAnswer ? (
          <AnswerSectionImage3Cols
            data={data}
            setIsButtonActive={setIsButtonActive}
            setIsButtonCorrect={setIsButtonCorrect}
            isNext={isNext}
            setIsNext={setIsNext}
            isSubmit={isSubmit}
          />
        ) : (
          <AnswerSection
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
