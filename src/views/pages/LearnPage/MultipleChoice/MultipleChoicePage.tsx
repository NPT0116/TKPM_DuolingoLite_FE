import QuestionSection from "../../../components/Learning/BuildSentence/QuestionSection";
import Instruction from "../../../components/LearnPage/Instruction/Instruction";
import mockData from "../../../../services/mock_datas/multiple_choice.json";
import AnswerImageContainer3Cols from "../../../components/Learning/MultipleChoice/AnswerContainer/AnswerImageContainer3Cols";
import AnswerContainer2Cols from "../../../components/Learning/MultipleChoice/AnswerContainer/AnswerContainer2Cols";
import { useOutletContext } from "react-router-dom";

interface OutletContextType {
  setXp: React.Dispatch<
    React.SetStateAction<{ accumulated: number; total: number }>
  >;
  state: number;
  setIsButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const MultipleChoicePage: React.FC = () => {
  const data = mockData.value;

  // const { setXp, state, setIsButtonActive } =
  //   useOutletContext<OutletContextType>();

  // Properly check if any of these exist
  const hasQuestionContent =
    data.questionConfigure.audio ||
    data.questionConfigure.englishText ||
    data.questionConfigure.vietnameseText;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[600px] h-[450px] flex flex-col gap-[24px] ">
        <Instruction instruction={data.instruction} />

        {hasQuestionContent ? (
          <div
            className="flex flex-col gap-[24px] h-[50%]"
            style={{ margin: "auto 0px" }}
          >
            <QuestionSection
              questionConfigure={data.questionConfigure}
              audio={data.audio}
              pictureId={data.picture}
              englishText={data.englishText}
              vietnameseText={data.vietnameseText}
            />
            {/* Answer Section */}
            <AnswerContainer2Cols options={data.options} />
          </div>
        ) : (
          /* If no question content, render AnswerImageContainer3Cols */
          <AnswerImageContainer3Cols options={data.options} />
        )}
      </div>
    </div>
  );
};

export default MultipleChoicePage;
