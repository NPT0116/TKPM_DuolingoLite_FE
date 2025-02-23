import { useState } from "react";
import AnswerLine from "../../components/BuildSentence/AnswerLine";
import Instruction from "../../components/BuildSentence/Instruction";
import QuestionSection from "../../components/BuildSentence/QuestionSection";
import WordChoice from "../../components/BuildSentence/WordChoice";

const BuildSentencePage: React.FC = () => {
  const [selectedWords, setSelectedWords] = useState<
    {
      word: string;
      optionPosition: { x: number; y: number };
      answerPosition: { x: number; y: number };
    }[]
  >([]);

  const handleWordClick = (
    word: string,
    position: { x: number; y: number }
  ) => {
    console.log(position.x);
    console.log(position.y);
    setSelectedWords((prev) =>
      prev.some((w) => w.word === word)
        ? prev.filter((w) => w.word !== word)
        : [
            ...prev,
            {
              word,
              optionPosition:
                position.x !== 0 && position.y !== 0
                  ? position
                  : { x: -1, y: -1 },
              answerPosition: { x: -1, y: -1 },
            },
          ]
    );
  };

  return (
    <div className="w-full h-[100vh] flex items-center">
      <div className="w-full h-[671px] bg-[#131F24] flex items-center justify-center">
        <div className="h-[671px] w-[600px] flex flex-col justify-center gap-[20px] text-white">
          <Instruction />
          <QuestionSection />
          <div className="flex flex-col gap-[60px]">
            <AnswerLine
              selectedWords={selectedWords}
              onRemoveWord={(word) => handleWordClick(word, { x: 0, y: 0 })}
            />
            <WordChoice
              selectedWords={selectedWords}
              onWordClick={handleWordClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildSentencePage;
