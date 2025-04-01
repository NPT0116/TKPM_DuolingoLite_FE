import QuestionPrompt from "../../components/Admin/Lesson/QuestionPrompt";
import OptionPrompt from "../../components/Admin/Lesson/OptionPrompt";
import OrderPrompt from "../../components/Admin/Lesson/OrderPrompt";
import StepButton from "../../components/Admin/Components/StepButton";

import { useState } from "react";

const AdminMultipleChoicePage: React.FC = () => {
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
  return (
    <div className="w-full h-full flex flex-row">
      <div
        className="w-3/12 flex flex-col justify-center items-center border-r-2 border-[#E5E5E5]"
        style={{ margin: "20px 0" }}
      >
        <OrderPrompt
          order={1}
          content="Promt Configuration"
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

      <div className="w-11/12 h-full" style={{ padding: "0 20px" }}>
        <div className="w-full h-5/6">
          {step == 0 && <QuestionPrompt />}
          {step == 1 && <OptionPrompt />}
        </div>
        <div className="w-full h-1/6 flex flex-row justify-evenly items-center border-t-2 border-[#E5E5E5]">
          <div className="w-1/2 flex justify-start">
            {step == 1 && (
              <StepButton content="LÙI" onClick={HandleSetStatePrev} />
            )}
          </div>
          <div className="w-1/2 flex justify-end">
            <StepButton content="TIẾP TỤC" onClick={HandleSetStateNext} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMultipleChoicePage;
