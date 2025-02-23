import React from "react";

interface BSButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const BSButton: React.FC<BSButtonProps> = ({
  label,
  onClick,
  disabled,
  style,
}) => {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className="border-2 border-[#37464F] font-[500] rounded-xl cursor-pointer active:translate-y-[2px] relative z-10"
      style={{
        padding: "7px 12px 12px 12px",
        boxShadow: "0 2.5px 0 0 #37464F",
        ...style,
      }}
      onMouseDown={(e) => (e.currentTarget.style.boxShadow = "0 0 0 0 #37464F")}
      onMouseUp={(e) =>
        (e.currentTarget.style.boxShadow = "0 2.5px 0 0 #37464F")
      }
    >
      <span>{label}</span>
    </button>
  );
};

export default BSButton;
