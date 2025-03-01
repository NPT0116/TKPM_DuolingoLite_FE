import { useState } from "react";
import Instruction from "../../../components/LearnPage/Instruction/Instruction";
import QuestionSection from "../../../components/LearnPage/QuestionSection/QuestionSection";
import AnswerLine from "../../../components/Learning/BuildSentence/AnswerLine";
import WordChoice from "../../../components/Learning/BuildSentence/WordChoice";
import { IBuildSentenceQuestion } from "../../../../interfaces/Questions/IBuildSentenceQuestion";
import { IBuildSentenceOption } from "../../../../interfaces/Options/IBuildSentenceOption";

interface BuildSentenceProps {
  data: IBuildSentenceQuestion;
  setIsButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsButtonCorrect: React.Dispatch<React.SetStateAction<boolean>>;
}

const BuildSentencePage: React.FC<BuildSentenceProps> = ({
  setIsButtonActive,
  setIsButtonCorrect,
  data,
}) => {
  const [selectedWords, setSelectedWords] = useState<IBuildSentenceOption[]>(
    []
  );
  const [wrapCount, setWrapCount] = useState<number>(0);

  const correctWordLength = data.options.reduce(
    (max, option) => (option.order > max ? option.order : max),
    1
  );

  const handleChooseWord = (option: IBuildSentenceOption) => {
    setSelectedWords((prev) => [...prev, option]);

    setIsButtonActive(true);
  };

  const handleRemoveWord = (option: IBuildSentenceOption) => {
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

  return (
    <div className="w-full h-full bg-[#131F24] flex justify-center items-center">
      <div className="w-[600px] flex flex-col text-white">
        <Instruction instruction={data.instruction} />
        <QuestionSection
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
          />
          <WordChoice
            isEnglish={data.optionConfigure.englishText}
            selectedWords={selectedWords}
            wordOptions={data.options}
            onWordClick={handleChooseWord}
            onWrapCountChange={(count) => setWrapCount(count)}
          />
        </div>
      </div>
    </div>
  );
};

export default BuildSentencePage;
