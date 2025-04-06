import React from "react";
import { IBuildSentenceOption } from "../../../../interfaces/Options/IBuildSentenceOption";

interface BSWordProps {
  label: string;
  onClick: () => void;
  mousing?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  option: IBuildSentenceOption;
  isEnglish: boolean;
}

const BSBWordButton: React.FC<BSWordProps> = ({
  label,
  onClick,
  disabled,
  style,
  option,
  isEnglish,
  mousing,
}) => {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`border-2 border-[#37464F] font-[500] rounded-xl ${
        disabled ? "" : "cursor-pointer active:translate-y-[2px]"
      } relative z-10`}
      style={{
        padding: "7px 12px 12px 12px",
        boxShadow: "0 2.5px 0 0 #37464F",
        ...style,
      }}
      onMouseDown={(e) => {
        console.log(1);
        if (mousing) {
          mousing();
        }
        if (disabled) return;
        e.preventDefault();
        e.currentTarget.style.boxShadow = "0 0 0 0 #37464F";
      }}
      onMouseUp={(e) => {
        if (disabled) return;
        e.currentTarget.style.boxShadow = "0 2.5px 0 0 #37464F";
      }}
    >
      <span>{label}</span>
    </button>
  );
};

export default BSBWordButton;
