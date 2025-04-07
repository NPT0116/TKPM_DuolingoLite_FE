import { useEffect, useState } from "react";
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
    <div className="w-full h-full bg-[#131F24] flex justify-center items-center ">
      <div className="w-[600px] flex flex-col text-white">
        {isQuestionRetry && (
          <div
            className="flex gap-2 text-[#ffab33] font-bold text-[16px]"
            style={{ margin: "0 0 20px 10px" }}
          >
            <img src={retry_img} alt="" />
            <span>LỖI SAI TRƯỚC ĐÂY</span>
          </div>
        )}
        <Instruction instruction={data.instruction} />
        <QuestionSection
          words={data.words}
          questionConfigure={data.questionConfigure}
          audio={data.audio}
          picture={data.picture}
          englishText={data.englishText}
          vietnameseText={data.vietnameseText}
          isBuildSentence={true}
        />
        <div className="flex flex-col gap-[30px] ">
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
  );
};

export default BuildSentencePage;
