import Instruction from "../../../components/LearnPage/Instruction/Instruction";
import { IMultipleChoiceQuestion } from "../../../../interfaces/Questions/IMultipleChoiceQuestion";
import { useEffect, useState } from "react";
import AnswerSectionImage from "../../../components/Learning/MultipleChoice/AnswerSection/AnswerSectionImage";
import AnswerSection from "../../../components/Learning/MultipleChoice/AnswerSection/AnswerSection";
import retry_img from "../../../../assets/imgs/retry_img.png";

interface MultipleChoiceProps {
  data: IMultipleChoiceQuestion;
  setIsButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsButtonCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmit: boolean;
  isQuestionRetry: boolean;
  state: number;
}

const MultipleChoicePage: React.FC<MultipleChoiceProps> = ({
  setIsButtonActive,
  setIsButtonCorrect,
  data,
  isSubmit,
  isQuestionRetry,
  state,
}) => {
  const hasImageAnswer = data.optionConfigure.image !== false;
  const [isNext, setIsNext] = useState(false);

  useEffect(() => {
    setIsNext(true);
  }, [state]);

  return (
    <div className="w-full h-full flex justify-center items-center overflow-y-auto">
      <div className="w-full sm:w-full md:w-[600px] min-w-[600px] max-h-[450px] flex flex-col justify-center  ">
        {isQuestionRetry && (
          <div
            className="flex gap-2 text-[#ffab33] font-bold text-[16px]"
            style={{ margin: "0 0 20px 10px" }}
          >
            <img src={retry_img} alt="" />
            <span>LỖI SAI TRƯỚC ĐÂY</span>
          </div>
        )}
        {/* Instruction */}
        <Instruction instruction={data.instruction} />

        {/* Question & Answer Section */}
        {hasImageAnswer ? (
          <AnswerSectionImage
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
