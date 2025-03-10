import React, { useEffect, useState } from "react";

import AnswerImageCard from "../AnswerCard/AnswerImageCard";
import { IMultipleChoiceOption } from "../../../../../interfaces/Options/IMultipleChoiceOption";

interface AnswerImageContainer3ColsProps {
  options: IMultipleChoiceOption[];
  setIsButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsButtonCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  isNext: boolean;
  isEnglish: boolean;
  setIsNext: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmit: boolean;
}

const AnswerImageContainer3Cols: React.FC<AnswerImageContainer3ColsProps> = ({
  options,
  setIsButtonActive,
  setIsButtonCorrect,
  isNext,
  setIsNext,
  isEnglish,
  isSubmit,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  useEffect(() => {
    if (isNext) {
      setSelectedIndex(null);
      setIsNext(false);
      setIsButtonActive(false);
      setIsButtonCorrect(false);
    }
  }, [isNext, setIsButtonActive, setIsNext]);

  return (
    <div className="h-full w-full flex flex-col-3 gap-[8px] items-center">
      {options.map((option, index) => (
        <AnswerImageCard
          key={index}
          option={option}
          index={index}
          isSelected={selectedIndex === index}
          isEnglish={isEnglish}
          onSelect={() => {
            setSelectedIndex(index);
            setIsButtonActive(true);
            if (option.isCorrect) {
              setIsButtonCorrect(true);
            } else {
              setIsButtonCorrect(false);
            }
          }}
          isSubmit={isSubmit}
        />
      ))}
    </div>
  );
};

export default AnswerImageContainer3Cols;
