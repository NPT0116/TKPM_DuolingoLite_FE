import React, { useState } from "react";
import { IMultipleChoiceOption } from "../../../../../interfaces/Options/IMultipleChoiceOption";
import AnswerCard from "../AnswerCard/AnswerCard";

interface AnswerContainer2ColsProps {
  options: IMultipleChoiceOption[];
  setIsButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsButtonCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  isNext: boolean;
}

const AnswerContainer2Cols: React.FC<AnswerContainer2ColsProps> = ({
  options,
  setIsButtonActive,
  setIsButtonCorrect,
  isNext,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  return (
    <div className="w-full h-full flex flex-col-s gap-[8px]">
      {/* Answer Card */}
      {options.map((option, index) => (
        <AnswerCard
          key={index}
          option={option}
          index={index}
          isSelected={selectedIndex === index}
          onSelect={() => {
            setSelectedIndex(index);
            setIsButtonActive(true);
            if (option.isCorrect) {
              setIsButtonCorrect(true);
            } else {
              console.log("false");

              setIsButtonCorrect(false);
            }
          }}
        />
      ))}
    </div>
  );
};

export default AnswerContainer2Cols;
