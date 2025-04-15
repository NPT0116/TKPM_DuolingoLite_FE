import React, { useState } from "react";
import { IMultipleChoiceOption } from "../../../../../interfaces/Options/IMultipleChoiceOption";

interface AnswerImageCardProps {
  option: IMultipleChoiceOption;
  index: number;
  isSelected: boolean;
  isEnglish: boolean;
  isSubmit: boolean;
  onSelect: () => void;
}

const AnswerImageCard: React.FC<AnswerImageCardProps> = ({
  option,
  index,
  isSelected,
  onSelect,
  isEnglish,
  isSubmit,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div
      className={`h-full w-full border-2 rounded-xl flex flex-col items-center justify-center  ${
        isSubmit ? "" : "cursor-pointer hover:bg-[#202F36]"
      } ${
        isSelected
          ? isSubmit && option.isCorrect
            ? "border-[#5F8428]"
            : "border-[#3F85A7]"
          : "border-[#37464F]"
      } ${isClicked ? "translate-y-[2.5px]" : ""}`}
      style={{
        boxShadow: isSelected
          ? isSubmit && option.isCorrect
            ? "0 2.5px 0px #5F8428"
            : "0 2.5px 0px #3F85A7"
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
      <img
        src={option.image?.url ? option.image.url : ""}
        alt="card-image"
        className="w-auto h-[160px] mb-[10px]"
      />
      <div className="flex w-[70%] justify-between h-[30px]">
        <span
          className={`text-[17px] font-semibold ${
            isSelected
              ? isSubmit && option.isCorrect
                ? "text-[#5F8428]"
                : "text-[#3F85A7]"
              : "text-white"
          } `}
        >
          {isEnglish ? option.englishText : option.vietnameseText}
        </span>
        <span
          className={`text-[15px] font-bold border-2 h-full aspect-square flex items-center justify-center rounded-lg ${
            isSelected
              ? isSubmit && option.isCorrect
                ? "border-[#5F8428] text-[#5F8428]"
                : "border-[#3F85A7] text-[#3F85A7]"
              : "border-[#37464F] text-[#52656D] "
          }`}
        >
          {index + 1}
        </span>
      </div>
    </div>
  );
};

export default AnswerImageCard;
