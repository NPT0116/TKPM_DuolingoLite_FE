import { useState } from "react";
import AnswerLine from "../../components/BuildSentence/AnswerLine";
import Instruction from "../../components/BuildSentence/Instruction";
import QuestionSection from "../../components/BuildSentence/QuestionSection";
import WordChoice from "../../components/BuildSentence/WordChoice";
import { Configure } from "../../../interfaces/Configure";
import configData from "../../../services/mock_datas/configure.json";
import buildSentenceData from "../../../services/mock_datas/build_sentences.json";
import { BuildSentenceQuestion } from "../../../interfaces/Questions/BuildSentenceQuestion";
import { BuildSentenceOption } from "../../../interfaces/Options/BuildSentenceOption";

const BuildSentencePage: React.FC = () => {
  const [selectedWords, setSelectedWords] = useState<BuildSentenceOption[]>([]);
  const [wrapCount, setWrapCount] = useState<number>(0);

  const config: Configure = configData.value.configure;
  const data: BuildSentenceQuestion = buildSentenceData.value
    .question as BuildSentenceQuestion;

  const handleWordClick = (option: BuildSentenceOption) => {
    // Lấy giá trị hiển thị của option (sử dụng englishText nếu có, nếu không thì vietnameseText)
    const wordValue: string = option.englishText ?? option.vietnameseText!;
    setSelectedWords((prev) =>
      prev.some((w) => (w.englishText ?? w.vietnameseText)! === wordValue)
        ? prev.filter((w) => (w.englishText ?? w.vietnameseText)! !== wordValue)
        : [...prev, option]
    );
  };
  const handleRemoveWord = (option: BuildSentenceOption) => {
    setSelectedWords((prev) =>
      prev.filter((w) => w.optionId !== option.optionId)
    );
  };

  return (
    <div className="w-full h-[100vh] flex items-center">
      <div className="w-full h-[671px] bg-[#131F24] flex items-center justify-center">
        <div className="h-[671px] w-[600px] flex flex-col justify-center gap-[20px] text-white">
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
              onWordClick={handleWordClick}
              onWrapCountChange={(count) => setWrapCount(count)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildSentencePage;
