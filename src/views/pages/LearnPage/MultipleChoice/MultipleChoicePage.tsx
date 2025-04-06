import Instruction from "../../../components/LearnPage/Instruction/Instruction";
import { IMultipleChoiceQuestion } from "../../../../interfaces/Questions/IMultipleChoiceQuestion";
import { MutableRefObject, useEffect, useState } from "react";
import AnswerSectionImage from "../../../components/Learning/MultipleChoice/AnswerSection/AnswerSectionImage";
import AnswerSection from "../../../components/Learning/MultipleChoice/AnswerSection/AnswerSection";
import retry_img from "../../../../assets/imgs/retry_img.png";
import { useAudio } from "../../../components/LearnPage/Audio/AudioProvider";

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
    <div
      className="w-full h-full flex justify-center items-center "
      style={{ padding: "0 0 40px 0" }}
    >
      <div className="w-1/2 h-full flex flex-col justify-between ">
        <div
          className="h-1/5 w-full flex flex-col items-start "
          style={{ padding: "10px 0 0 0" }}
        >
          <div className="w-full h-1/4">
            {isQuestionRetry && (
              <div className=" flex gap-2 text-[#ffab33] font-bold text-[16px]">
                <img src={retry_img} alt="" />
                <span>LỖI SAI TRƯỚC ĐÂY</span>
              </div>
            )}
          </div>
          <div className="w-full h-3/4">
            <Instruction instruction={data.instruction} />
          </div>
        </div>
        <div className="w-full h-4/5">
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
    </div>
  );
};

export default MultipleChoicePage;
