import QuestionPrompt from "../../components/Admin/Lesson/QuestionPrompt";
import OrderPrompt from "../../components/Admin/Lesson/OrderPrompt";
import StepButton from "../../components/Admin/Components/StepButton";
import { useEffect, useState } from "react";
import { addMultipleChoiceQuestion } from "../../../services/Lesson/AddMultipleChoiceQuestionService";
import { IAddQuestion } from "../../../interfaces/Questions/IBaseQuestion";
import { useNavigate, useParams } from "react-router-dom";
import { createEmptyQuestion } from "./utils/createEmptyQuestion";
import { QuestionType } from "../../../enums/questionType";
import OptionPrompt from "../../components/Admin/Lesson/Option/OptionPrompt";

interface AdminMultipleChoicePageProps {
  questionType: QuestionType;
}

const AdminAddQuestionPage: React.FC<AdminMultipleChoicePageProps> = ({
  questionType,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("");
  const [question, setQuestion] = useState<IAddQuestion>(createEmptyQuestion());
  const { lessonId } = useParams();
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
      type: questionType,
    }));
  }, []);

  const handleCreate = async () => {
    if (!lessonId) return;
    setLoadingMessage("LOADING...");
    try {
      const { data, error } = await addMultipleChoiceQuestion(
        lessonId,
        question
      );
      if (error) {
        setErrorMessage(error);
        setSuccessMessage("");
        setLoadingMessage("");
      } else {
        setSuccessMessage("Create question successfully");
        setErrorMessage("");
        setLoadingMessage("");
      }
    } catch (error) {
      console.log("Error handle create question: ", error);
    }
  };

  useEffect(() => {
    console.log(question);
  }, [question]);

  const getStepConfig = (questionType: QuestionType) => {
    if (questionType === QuestionType.Pronunciation) {
      return [
        {
          order: 1,
          content: "Question Configuration",
          processLine: false,
          show: true,
        },
      ];
    }

    return [
      {
        order: 1,
        content: "Question Configuration",
        processLine: true,
        show: true,
      },
      {
        order: 2,
        content: "Option Configuration",
        processLine: false,
        show: true,
      },
    ];
  };
  const stepConfig = getStepConfig(questionType);
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-row">
      <div className="w-3/12 flex flex-col  border-r-2 border-[#E5E5E5]">
        <div
          className="w-full h-10/12 flex flex-col justify-center items-center"
          style={{ margin: "20px 0" }}
        >
          {stepConfig.map((stepItem, index) => (
            <OrderPrompt
              key={index}
              order={stepItem.order}
              content={stepItem.content}
              processLine={stepItem.processLine}
              stepCss={step === index ? stepCss : {}}
              contentCss={step === index ? contentCss : {}}
            />
          ))}
        </div>
        <div className="w-full h-2/12 flex justify-center items-center">
          <StepButton
            content="TRỞ VỀ"
            width="90%"
            bgColor="Blue"
            textColor="White"
            onClick={() => {
              navigate("/admin/course");
            }}
          />
        </div>
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
            questionType={questionType}
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
            {step < stepConfig.length - 1 ? (
              <StepButton content="TIẾP TỤC" onClick={HandleSetStateNext} />
            ) : (
              <StepButton content="TẠO" onClick={handleCreate} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddQuestionPage;
