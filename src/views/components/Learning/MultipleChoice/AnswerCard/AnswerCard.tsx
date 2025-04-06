import React, { useState } from "react";
import { IMultipleChoiceOption } from "../../../../../interfaces/Options/IMultipleChoiceOption";

interface AnswerCardProps {
  option: IMultipleChoiceOption;
  index: number;
  isSelected: boolean;
  isEnglish: boolean;
  isSubmit: boolean;
  onSelect: () => void;
}

const AnswerCard: React.FC<AnswerCardProps> = ({
  option,
  index,
  isSelected,
  isEnglish,
  isSubmit,
  onSelect,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div
      className={`w-full h-full  flex items-center justify-center border-2  rounded-xl ${
        isSubmit ? "" : "cursor-pointer hover:bg-[#202F36]"
      }  ${
        isSelected
          ? isSubmit
            ? option.isCorrect
              ? "border-[#5F8428]"
              : "border-[#3F85A7]"
            : "border-[#3F85A7]"
          : "border-[#37464F]"
      } ${isClicked ? "translate-y-[2.5px]" : ""}`}
      style={{
        padding: "12px 16px",
        boxShadow: isSelected
          ? isSubmit && option.isCorrect
            ? "0 2.5px 0 0 #5F8428"
            : "0 2.5px 0 0 #3F85A7"
          : "0 2.5px 0 0 #37464F",
      }}
      onMouseDown={(e) => {
        if (isSubmit) return;
        e.currentTarget.style.boxShadow = "0 0 0 0 #3F85A7";
        setIsClicked(true);
      }}
      onMouseUp={(e) => {
        if (isSubmit) return;
        e.currentTarget.style.boxShadow = isSelected
          ? "0 2.5px 0 0 #3F85A7"
          : "0 2.5px 0 0 #37464F";
        setIsClicked(false);
        onSelect();
      }}
    >
      <span
        className={`text-[15px] border-2 w-[30px] ${
          isSelected
            ? isSubmit && option.isCorrect
              ? "border-[#5F8428] text-[#5F8428]"
              : "border-[#3F85A7] text-[#3F85A7]"
            : "border-[#37464F] text-[#52656D] "
        } h-full aspect-square flex items-center justify-center rounded-lg font-bold`}
      >
        {index + 1}
      </span>
      <span
        className={`${
          isSelected
            ? isSubmit && option.isCorrect
              ? "text-[#5F8428]"
              : "text-[#3F85A7]"
            : "text-white"
        } font-bold w-full text-center`}
      >
        {" "}
        {isEnglish ? option.englishText : option.vietnameseText}
      </span>
    </div>
  );
};

export default AnswerCard;
