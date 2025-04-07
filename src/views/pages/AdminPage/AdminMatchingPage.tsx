import StepButton from "../../components/Admin/Components/StepButton";
import { useEffect, useState } from "react";
import { IAddQuestion } from "../../../interfaces/Questions/IBaseQuestion";
import { createEmptyQuestion } from "./utils/createEmptyQuestion";
import { QuestionType } from "../../../enums/questionType";
import OrderPrompt from "../../components/Admin/Lesson/OrderPrompt";
import MatchingOptionPrompt from "../../components/Admin/Lesson/MatchingOptionPrompt";
import QuestionPrompt from "../../components/Admin/Lesson/QuestionPrompt";
import MultipleChoiceOptionPrompt from "../../components/Admin/Lesson/Option/MultipleChoiceOptionPrompt";

const AdminMatchingPage: React.FC = () => {
  const [question, setQuestion] = useState<IAddQuestion>(createEmptyQuestion());

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("");

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
    setQuestion((question) => ({
      ...question,
      instruction: "Chọn cặp từ",
      type: QuestionType.Matching,
      questionConfiguration: {
        ...question.questionConfiguration,
        instruction: true,
      },
    }));
  }, []);

  useEffect(() => {
    console.log(question);
  }, [question]);

  return (
    <div className="w-full h-full flex flex-row ">
      <div
        className="w-3/12 flex flex-col justify-center items-center border-r-2 border-[#E5E5E5] "
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
      <div className="w-full " style={{ padding: "10px" }}>
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
          className="w-full h-6/7 overflow-auto"
          style={{ display: step === 1 ? "block" : "none" }}
        >
          <MultipleChoiceOptionPrompt
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
          <span
            className={`font-bold whitespace-nowrap ${
              loadingMessage
                ? "text-[#47D7FF]"
                : errorMessage
                ? "text-[#ED5555]"
                : "text-[#79B933]"
            }`}
          >
            {loadingMessage
              ? loadingMessage
              : errorMessage
              ? errorMessage
              : successMessage}
          </span>
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

export default AdminMatchingPage;
