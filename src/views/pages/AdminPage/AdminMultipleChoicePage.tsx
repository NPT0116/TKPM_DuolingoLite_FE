import QuestionPrompt from "../../components/Admin/Lesson/QuestionPrompt";
import OptionPrompt from "../../components/Admin/Lesson/OptionPrompt";
import OrderPrompt from "../../components/Admin/Lesson/OrderPrompt";
import StepButton from "../../components/Admin/Components/StepButton";

import { useEffect, useState } from "react";
import { IAddMultipleChoiceQuestion } from "../../../interfaces/Questions/IMultipleChoiceQuestion";

const createEmptyQuestion = (): IAddMultipleChoiceQuestion => ({
  instruction: "",
  vietnameseText: null,
  englishText: "",
  audio: null,
  image: null,
  order: 0,
  type: "multiple-choice",
  questionConfiguration: {
    instruction: false,
    vietnameseText: false,
    englishText: false,
    audio: false,
    image: false,
  },
  optionConfiguration: {
    instruction: false,
    vietnameseText: false,
    englishText: false,
    audio: false,
    image: false,
  },
  options: [],
});

const AdminMultipleChoicePage: React.FC = () => {
  const [question, setQuestion] = useState<IAddMultipleChoiceQuestion>(
    createEmptyQuestion()
  );
  const configureArray = [
    "Instruction",
    "Vietnamese Text",
    "English Text",
    "Audio",
    "Image",
  ];
  const [step, setStep] = useState(0);
  const HandleSetStateNext = () => {
    if (step < 1) setStep((prev) => prev + 1);
  };
  const HandleSetStatePrev = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };
  const stepCss = {
    background: "#1CB0F6",
    color: "white",
  };
  const contentCss = {
    color: "black",
  };
  useEffect(() => {
    console.log(question);
  }, [question]);
  return (
    <div className="w-full h-full flex flex-row">
      <div
        className="w-3/12 flex flex-col justify-center items-center border-r-2 border-[#E5E5E5]"
        style={{ margin: "20px 0" }}
      >
        <OrderPrompt
          order={1}
          content="Question Configuration"
          processLine={true}
          stepCss={step == 0 ? stepCss : {}}
          contentCss={step == 0 ? contentCss : {}}
        />
        <OrderPrompt
          order={2}
          content="Option Configuration"
          stepCss={step == 1 ? stepCss : {}}
          contentCss={step == 1 ? contentCss : {}}
        />
      </div>
      {/* Main Content */}
      <div className="w-11/12 h-full" style={{ padding: "0 20px" }}>
        <div
          className="w-full h-5/6"
          style={{ display: step === 0 ? "block" : "none" }}
        >
          <QuestionPrompt
            configureArray={configureArray}
            question={question}
            setQuestion={setQuestion}
          />
        </div>
        <div
          className="w-full h-5/6"
          style={{ display: step === 1 ? "block" : "none" }}
        >
          <OptionPrompt
            configureArray={configureArray}
            question={question}
            setQuestion={setQuestion}
          />
        </div>

        <div className="w-full h-1/6 flex flex-row justify-evenly items-center border-t-2 border-[#E5E5E5]">
          <div className="w-1/2 flex justify-start">
            {step >= 1 && (
              <StepButton content="LÙI" onClick={HandleSetStatePrev} />
            )}
          </div>
          <div className="w-1/2 flex justify-end">
            {step < 1 ? (
              <StepButton content="TIẾP TỤC" onClick={HandleSetStateNext} />
            ) : (
              <StepButton content="TẠO" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMultipleChoicePage;
