import React, { useState } from "react";

import AnswerImageCard from "../AnswerCard/AnswerImageCard";
import { IMultipleChoiceOption } from "../../../../../interfaces/Options/IMultipleChoiceOption";

interface AnswerImageContainer3ColsProps {
  options: IMultipleChoiceOption[];
  setIsButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsButtonCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  isNext: boolean;
}

const AnswerImageContainer3Cols: React.FC<AnswerImageContainer3ColsProps> = ({
  options,
  setIsButtonActive,
  setIsButtonCorrect,
  isNext,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="h-[500px] w-full flex flex-col-3 gap-[8px] items-center">
      {options.map((option, index) => (
        <AnswerImageCard
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

export default AnswerImageContainer3Cols;
