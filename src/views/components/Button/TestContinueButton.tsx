/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
interface ITestContinueButton {
  setIsNext: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  isButtonCorrect: boolean;
  isButtonActivate: boolean;
  isSubmit: boolean;
  hoverColor: string;
  paddingWidth: number;
  positionRight: number;
  type: string;
}

const TestContinueButton: React.FC<ITestContinueButton> = ({
  setIsNext,
  setIsSubmit,
  isButtonCorrect,
  isButtonActivate,
  isSubmit,
  paddingWidth,
  positionRight,
}) => {
  const mainColor = "3B4EFF",
    borderColor = "3F22EC",
    hoverColor = "4156FF";
  const CSS = css`
    background-color: #${isButtonActivate ? mainColor : "37464F"};
    right: ${positionRight}px;
    border-color: #${borderColor};
    ${!isButtonActivate ? "border: 0px solid black;" : null}

    &:hover {
      ${isButtonActivate ? `background: #${hoverColor};` : null}
    }
    &:active {
      ${!isButtonActivate && "transform: translateY(-4px)"}
    }
  `;
  const CSS_Correct = css`
    background: #93d333;
    right: ${positionRight}px;

    border-color: #84cb37;
    ${!isButtonActivate ? "border: 0px solid black;" : null}

    &:hover {
      ${isButtonActivate ? `background: #A2E838;` : null}
    }
    &:active {
      ${!isButtonActivate && "transform: translateY(-4px)"}
    }
  `;
  const CSS_Wrong = css`
    background: #ed5555;
    right: ${positionRight}px;

    border-color: #d84948;
    ${!isButtonActivate ? "border: 0px solid black;" : null}

    &:hover {
      ${isButtonActivate ? `background: #FF5E5E;` : null}
    }
    &:active {
      ${!isButtonActivate && "transform: translateY(-4px)"}
    }
  `;
  return (
    <button
      disabled={!isButtonActivate}
      className={`w-[300px] h-[50px] absolute top-1/2 -translate-y-1/2 text-md rounded-2xl font-bold text-white border-b-[4px] cursor-pointer active:border-b-0 active:translate-y-[50% + 4px]`}
      style={{ margin: "0px 20px 0px 0px" }}
      onClick={() => {
        if (isButtonActivate) {
          if (isButtonCorrect) {
            setIsNext(true);
            setIsSubmit(true);
          } else if (!isButtonCorrect) {
            setIsNext(true);
            setIsSubmit(true);
          }
        }
      }}
      css={!isSubmit ? CSS : isButtonCorrect ? CSS_Correct : CSS_Wrong}
    >
      {isButtonActivate ? (isSubmit ? "TIẾP TỤC" : "KIỂM TRA") : "TIẾP TỤC"}
    </button>
  );
};
export default TestContinueButton;
