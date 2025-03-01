import React, { useState } from "react";
import { MultipleChoiceOption } from "../../../../../interfaces/Options/IMultipleChoiceOption";

interface AnswerImageCardProps {
  option: MultipleChoiceOption;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}

const AnswerImageCard: React.FC<AnswerImageCardProps> = ({
  option,
  index,
  isSelected,
  onSelect,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  // Function to play the audio
  const playAudio = () => {
    if (option.audio && option.audio.url) {
      const audio = new Audio("../../../../../../tea.mp3");
      audio.play().catch((error) => console.error("Audio play failed", error));
    }
  };

  return (
    <div
      className={`h-[70%] w-full border-2 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-[#202F36] ${
        isSelected ? "border-[#3F85A7]" : "border-[#37464F]"
      } ${isClicked ? "translate-y-[2.5px]" : ""}`}
      style={{
        boxShadow: isSelected ? "0 2.5px 0px #3F85A7" : "0 2.5px 0 0 #37464F",
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
      <img
        src={option.image!.url}
        alt="card-image"
        className="w-auto h-[160px] mb-[10px]"
      />
      <div className="flex w-[70%] justify-between h-[30px]">
        <span
          className={`text-[17px] font-semibold ${
            isSelected ? "text-[#3F85A7]" : "text-white"
          } `}
        >
          {option.englishText || option.vietnameseText}
        </span>
        <span
          className={`text-[15px] font-bold border-2 h-full aspect-square flex items-center justify-center rounded-lg ${
            isSelected
              ? "border-[#3F85A7] text-[#3F85A7] "
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
