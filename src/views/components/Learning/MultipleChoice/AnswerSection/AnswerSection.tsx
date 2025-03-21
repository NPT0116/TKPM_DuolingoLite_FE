import { IMultipleChoiceQuestion } from "../../../../../interfaces/Questions/IMultipleChoiceQuestion";
import QuestionSection from "../../../LearnPage/QuestionSection/QuestionSection";
import AnswerContainer from "../AnswerContainer/AnswerContainer";

interface AnswerSectionProps {
  data: IMultipleChoiceQuestion;
  setIsButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsButtonCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  isNext: boolean;
  setIsNext: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmit: boolean;
}
const AnswerSection: React.FC<AnswerSectionProps> = ({
  data,
  setIsButtonActive,
  setIsButtonCorrect,
  isNext,
  setIsNext,
  isSubmit,
}) => {
  const onlyAudio =
    data.audio != null &&
    data.englishText.length === 0 &&
    // data.vietnameseText?.length === 0 &&
    !data.picture;
  return (
    <div className="flex flex-col gap-[24px] w-full h-full ">
      {/* Question Section */}
      <QuestionSection
        words={data.words}
        questionConfigure={data.questionConfigure}
        audio={data.audio}
        picture={data.picture}
        englishText={data.englishText}
        vietnameseText={data.vietnameseText}
      />
      {/* Answer Section */}
      <AnswerContainer
        options={data.options}
        setIsButtonActive={setIsButtonActive}
        setIsButtonCorrect={setIsButtonCorrect}
        isNext={isNext}
        setIsNext={setIsNext}
        isEnglish={data.optionConfigure.englishText}
        isSubmit={isSubmit}
        onlyAudio={onlyAudio}
      />
    </div>
  );
};

export default AnswerSection;
