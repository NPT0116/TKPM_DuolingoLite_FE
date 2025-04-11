/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";

interface IAddNewButton {
  onClick?: () => void;
  isAdd: boolean;
  content: string;
  width?: string;
  height?: string;
}
// CSS effect add button
const bounce = keyframes`
    0% {transform: scale(1.0);}
    50% {transform: scale(1.03);}
    100% {transform:scale(1.0);}
`;
const bounceButton = css`
  animation: ${bounce} 0.2s ease-in-out;
`;

const AddNewButton: React.FC<IAddNewButton> = ({
  onClick,
  isAdd,
  content,
  width,
  height,
}) => {
  const customShape = css`
    width: ${width}px !important;
    height: ${height}px !important;
  `;

  return (
    <div
      css={isAdd ? [bounceButton, customShape] : customShape}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      className="w-full rounded-xl flex justify-center items-center text-center gap-4 bg-[#F7F7F7] text-[#AFAFAF] text-bold border-1 border-dashed hover:scale-102 
        hover:bg-[#DDF4FF] hover:text-[#1CB0F6] hover:border-[#1CB0F6] transition-all duration-200 cursor-pointer
        font-bold text-xl"
      style={{ padding: "10px" }}
    >
      {content}{" "}
    </div>
  );
};
export default AddNewButton;
