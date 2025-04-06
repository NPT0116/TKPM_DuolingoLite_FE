import React, { useEffect, useState } from "react";
import Instruction from "../../../components/LearnPage/Instruction/Instruction";
import QuestionSection from "../../../components/LearnPage/QuestionSection/QuestionSection";
import AnswerLine from "../../../components/Learning/BuildSentence/AnswerLine";
import WordChoice from "../../../components/Learning/BuildSentence/WordChoice";
import { IBuildSentenceQuestion } from "../../../../interfaces/Questions/IBuildSentenceQuestion";
import { IBuildSentenceOption } from "../../../../interfaces/Options/IBuildSentenceOption";
import retry_img from "../../../../assets/imgs/retry_img.png";

interface BuildSentenceProps {
  data: IBuildSentenceQuestion;
  setIsButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsButtonCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmit: boolean;
  isQuestionRetry: boolean;
  state: number;
}

const BuildSentencePage: React.FC<BuildSentenceProps> = ({
  setIsButtonActive,
  setIsButtonCorrect,
  data,
  isSubmit,
  isQuestionRetry,
  state,
}) => {
  const [selectedWords, setSelectedWords] = useState<IBuildSentenceOption[]>(
    []
  );
  const [wrapCount, setWrapCount] = useState<number>(0);
  const [isNext, setIsNext] = useState<boolean>(false);

  const correctWordLength = data.options.reduce(
    (max, option) => (option.order > max ? option.order : max),
    1
  );

  const handleChooseWord = (option: IBuildSentenceOption) => {
    if (isSubmit) return;
    setSelectedWords((prev) => [...prev, option]);

    setIsButtonActive(true);
  };

  const handleRemoveWord = (option: IBuildSentenceOption) => {
    if (isSubmit) return;
    setSelectedWords((prev) => {
      const newSelectedWords = prev.filter(
        (w) => w.optionId !== option.optionId
      );

      if (newSelectedWords.length === 0) {
        setIsButtonActive(false);
      }

      return newSelectedWords;
    });
  };

  useEffect(() => {
    setIsNext(true);
  }, [state]);

  return (
    <div
      className="w-full h-full bg-[#131F24] flex justify-center items-center"
      style={{ padding: "0 0 20px 0" }}
    >
      <div className="w-1/2 h-full flex flex-col text-white">
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
        <div className="h-4/5 w-full flex flex-col gap-5">
          <div className="w-full h-1/3  flex justify-center items-center">
            <QuestionSection
              words={data.words}
              questionConfigure={data.questionConfigure}
              audio={data.audio}
              picture={data.picture}
              englishText={data.englishText}
              vietnameseText={data.vietnameseText}
              isBuildSentence={true}
            />
          </div>
          <div className="w-full h-2/3 flex flex-col gap-2">
            <div className="w-full h-1/2 ">
              <AnswerLine
                correctWordLength={correctWordLength}
                isEnglish={data.optionConfigure.englishText}
                selectedWords={selectedWords}
                onRemoveWord={handleRemoveWord}
                wrapCount={wrapCount}
                setIsButtonCorrect={setIsButtonCorrect}
                isNext={isNext}
                setIsNext={setIsNext}
                setSelectedWords={setSelectedWords}
                isSubmit={isSubmit}
              />
            </div>
            <div className="w-full h-1/2   flex justify-center">
              <WordChoice
                isEnglish={data.optionConfigure.englishText}
                selectedWords={selectedWords}
                wordOptions={data.options}
                onWordClick={handleChooseWord}
                onWrapCountChange={(count) => setWrapCount(count)}
                isSubmit={isSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildSentencePage;
