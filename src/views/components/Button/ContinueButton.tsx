/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
interface IContinueButton {
  setXp: React.Dispatch<
    React.SetStateAction<{ accumulated: number; total: number }>
  >;
  setState: React.Dispatch<React.SetStateAction<number>>;
  setIsButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsButtonCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  isButtonCorrect: boolean;
  isButtonActivate: boolean;
  mainColor: string;
  borderColor: string;
  hoverColor: string;
  paddingWidth: number;
  positionRight: number;
  state: number;
  maxState: number;
}

const ContinueButton: React.FC<IContinueButton> = ({
  setXp,
  setState,
  setIsButtonActive,
  setIsButtonCorrect,
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
      ${isButtonActivate ? `background: #${hoverColor};` : null}
    }
    &:active {
      ${!isButtonActivate && "transform: translateY(-4px)"}
    }
  `;

  return (
    <button
      disabled={!isButtonActivate}
      className={`absolute text-md rounded-2xl font-bold text-white border-b-[4px] cursor-pointer active:border-b-0 active:translate-y-[4px]`}
      style={{ padding: `12px ${paddingWidth}px` }}
      onClick={() => {
        if (isButtonActivate && state < maxState - 1) {
          setState((prev) => prev + 1);
          setIsButtonActive(false);
          setXp({ accumulated: state, total: maxState });
        } else if (state == maxState - 1) {
          setXp({ accumulated: state + 1, total: maxState });
        }
      }}
      css={!isButtonCorrect ? CSS : CSS_Correct}
    >
      {isButtonActivate
        ? isButtonCorrect
          ? "KIỂM TRA"
          : "TIẾP TỤC"
        : "TIẾP TỤC"}
    </button>
  );
};
export default ContinueButton;
