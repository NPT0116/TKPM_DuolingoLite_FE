import { useState } from "react";
import { Configure } from "../../../../interfaces/Configure/Configure";
import configData from "../../../../services/mock_datas/configure.json";
import buildSentenceData from "../../../../services/mock_datas/build_sentences.json";
import { BuildSentenceQuestion } from "../../../../interfaces/Questions/BuildSentenceQuestion";
import { BuildSentenceOption } from "../../../../interfaces/Options/BuildSentenceOption";
import Instruction from "../../../components/Learning/Instruction/Instruction";
import QuestionSection from "../../../components/Learning/BuildSentence/QuestionSection";
import AnswerLine from "../../../components/Learning/BuildSentence/AnswerLine";
import WordChoice from "../../../components/Learning/BuildSentence/WordChoice";

const BuildSentencePage: React.FC = () => {
  const [selectedWords, setSelectedWords] = useState<BuildSentenceOption[]>([]);
  const [wrapCount, setWrapCount] = useState<number>(0);

  const config: Configure = configData.value.configure;
  const data: BuildSentenceQuestion = buildSentenceData.value
    .question as BuildSentenceQuestion;

  const handleChooseWord = (option: BuildSentenceOption) => {
    setSelectedWords((prev) => [...prev, option]);
  };

  const handleRemoveWord = (option: BuildSentenceOption) => {
    setSelectedWords((prev) =>
      prev.filter((w) => w.optionId !== option.optionId)
    );
  };

  return (
    <div className="w-full h-full bg-[#131F24] flex justify-center items-center">
      <div className=" w-[600px] flex flex-col gap-[20px] text-white">
        <Instruction instruction={data.instruction} />
        <QuestionSection
          config={config}
          audioId={data.audioId}
          pictureId={data.pictureId}
          englishText={data.englishText}
          vietnameseText={data.vietnameseText}
        />
        <div className="flex flex-col gap-[60px]">
          <AnswerLine
            selectedWords={selectedWords}
            onRemoveWord={handleRemoveWord}
            wrapCount={wrapCount}
          />
          <WordChoice
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
