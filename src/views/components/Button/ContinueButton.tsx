/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
interface IContinueButton {
  setState: React.Dispatch<React.SetStateAction<number>>;
  isButtonActivate: boolean;
  mainColor: string;
  borderColor: string;
  hoverColor: string;
  paddingWidth: number;
  positionRight: number;
  state: number;
}

const ContinueButton: React.FC<IContinueButton> = ({
  setState,
  mainColor,
  borderColor,
  hoverColor,
  paddingWidth,
  positionRight,
  isButtonActivate,
  state,
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

  return (
    <button
      disabled={!isButtonActivate}
      className={`absolute text-md rounded-2xl font-bold text-white border-b-[4px] cursor-pointer active:border-b-0 active:translate-y-[4px]`}
      style={{ padding: `12px ${paddingWidth}px` }}
      onClick={() => {
        if (isButtonActivate) {
          setState((prev) => prev + 1);
        }
      }}
      css={CSS}
    >
      TIẾP TỤC
    </button>
  );
};
export default ContinueButton;
