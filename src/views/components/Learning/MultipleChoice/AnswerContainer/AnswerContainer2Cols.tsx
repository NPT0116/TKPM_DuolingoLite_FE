import React, { useState, useEffect } from "react";
import { IMultipleChoiceOption } from "../../../../../interfaces/Options/IMultipleChoiceOption";
import AnswerCard from "../AnswerCard/AnswerCard";

interface AnswerContainer2ColsProps {
  options: IMultipleChoiceOption[];
  setIsButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsButtonCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  isNext: boolean;
  isEnglish: boolean;
  setIsNext: React.Dispatch<React.SetStateAction<boolean>>;
}

const AnswerContainer2Cols: React.FC<AnswerContainer2ColsProps> = ({
  options,
  setIsButtonActive,
  setIsButtonCorrect,
  isNext,
  isEnglish,
  setIsNext,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isNext) {
      setIsNext(false);
      setSelectedIndex(null);
      setIsButtonActive(false);
      setIsButtonCorrect(false);
    }
  }, [isNext, setIsButtonActive, setIsButtonCorrect, setIsNext]);

  return (
    <div className="w-full h-full flex flex-col gap-[8px]">
      {/* Answer Cards */}
      {options.map((option, index) => (
        <AnswerCard
          key={index}
          option={option}
          isEnglish={isEnglish}
          index={index}
          isSelected={selectedIndex === index}
          onSelect={() => {
            setSelectedIndex(index);
            setIsButtonActive(true);
            setIsButtonCorrect(option.isCorrect);
          }}
        />
      ))}
    </div>
  );
};

export default AnswerContainer2Cols;
