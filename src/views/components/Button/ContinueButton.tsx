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
    background-color: #${isButtonActivate || state == 1 ? mainColor : "37464F"};
    right: ${positionRight}px;
    border-color: #${borderColor};
    ${state > 1 && !isButtonActivate ? "border: 0px solid black;" : null}

    &:hover {
      ${state > 1 && isButtonActivate ? `background: #${hoverColor};` : null}
    }
  `;
  return (
    <button
      className={`absolute text-md rounded-2xl font-bold text-white border-b-[4px] cursor-pointer active:border-b-0 active:translate-y-[4px]`}
      style={{ padding: `12px ${paddingWidth}px` }}
      onClick={() => {
        setState((prev) => prev + 1);
        // if (state == 1) {
        //   setState((prevState) => prevState + 1);
        // } else {
        //   if (isButtonActivate) {
        //     if (state < 3) {
        //       setState((prevState) => prevState + 1);
        //     }
        //   }
        // }
      }}
      css={CSS}
    >
      TIẾP TỤC
    </button>
  );
};
export default ContinueButton;
