/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
interface IContinueButton {
  setXp: React.Dispatch<
    React.SetStateAction<{ accumulated: number; total: number }>
  >;
  setState: React.Dispatch<React.SetStateAction<number>>;
  setIsButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsButtonCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNext: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  isButtonCorrect: boolean;
  isButtonActivate: boolean;
  mainColor: string;
  borderColor: string;
  hoverColor: string;
  paddingWidth: number;
  positionRight: number;
  state: number;
  maxState: number;
  isNext: boolean;
  isFinished: boolean;
}

const ContinueButton: React.FC<IContinueButton> = ({
  setXp,
  setState,
  setIsButtonActive,
  setIsButtonCorrect,
  setIsNext,
  setIsSubmit,
  isNext,
  isFinished,
  isButtonCorrect,
  isButtonActivate,
  mainColor,
  borderColor,
  hoverColor,
  paddingWidth,
  positionRight,
  state,
  maxState,
}) => {
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

  const navigate = useNavigate();

  return (
    <button
      disabled={!isButtonActivate}
      className={`absolute top-1/2 -translate-y-1/2 text-md rounded-2xl font-bold text-white border-b-[4px] cursor-pointer active:border-b-0 active:translate-y-[50% + 4px]`}
      style={{ padding: `12px ${paddingWidth}px` }}
      onClick={() => {
        if (isButtonActivate) {
          if (isButtonCorrect && !isNext) {
            setIsNext(true);
            setIsSubmit(true);
          } else if (!isButtonCorrect && !isNext) {
            setIsNext(true);
            setIsSubmit(true);
          } else if (isNext) {
            setIsButtonActive(false);
            setIsButtonCorrect(false);
            setIsNext(false);
            setIsSubmit(false);
            if (state < maxState) {
              setState((prev) => prev + 1);
            }
            setXp({ accumulated: state, total: maxState });
          }
        }
      }}
      css={!isNext ? CSS : isButtonCorrect ? CSS_Correct : CSS_Wrong}
    >
      {isButtonActivate ? (isNext ? "TIẾP TỤC" : "KIỂM TRA") : "TIẾP TỤC"}
    </button>
  );
};
export default ContinueButton;
