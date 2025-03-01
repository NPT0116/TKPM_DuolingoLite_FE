import React, { useState } from "react";
import { MultipleChoiceOption } from "../../../../../interfaces/Options/IMultipleChoiceOption";

interface AnswerCardProps {
  option: MultipleChoiceOption;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}

const AnswerCard: React.FC<AnswerCardProps> = ({
  option,
  index,
  isSelected,
  onSelect,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const playAudio = () => {
    if (option.audio && option.audio.url) {
      const audio = new Audio("../../../../../../tea.mp3");
      audio.play().catch((error) => console.error("Audio play failed", error));
    }
  };
  return (
    <div
      className={`w-full flex items-center justify-center h-full border-2  rounded-xl cursor-pointer hover:bg-[#202F36]  ${
        isSelected ? "border-[#3F85A7]" : "border-[#37464F]"
      } ${isClicked ? "translate-y-[2.5px]" : ""}`}
      style={{
        padding: "12px 16px",
        boxShadow: isSelected ? "0 2.5px 0 0 #3F85A7" : "0 2.5px 0 0 #37464F",
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.boxShadow = "0 0 0 0 #3F85A7";
        setIsClicked(true);
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.boxShadow = isSelected
          ? "0 2.5px 0 0 #3F85A7"
          : "0 2.5px 0 0 #37464F";
        setIsClicked(false);
        playAudio();
        onSelect();
      }}
    >
      <span
        className={`text-[15px] border-2 ${
          isSelected
            ? "border-[#3F85A7] text-[#3F85A7] "
            : "border-[#37464F] text-[#52656D] "
        } h-full aspect-square flex items-center justify-center rounded-lg`}
      >
        {index + 1}
      </span>
      <span
        className={`${
          isSelected ? "text-[#3F85A7]" : "text-white"
        } font-bold w-full text-center`}
      >
        {" "}
        {option.englishText || option.vietnameseText}
      </span>
    </div>
  );
};

export default AnswerCard;
