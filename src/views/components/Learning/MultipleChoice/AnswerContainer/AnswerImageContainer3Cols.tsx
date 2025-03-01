import React, { useState } from "react";
import { MultipleChoiceOption } from "../../../../../interfaces/Options/MultipleChoiceOption";
import AnswerImageCard from "../AnswerCard/AnswerImageCard";

interface AnswerImageContainer3ColsProps {
  options: MultipleChoiceOption[];
}

const AnswerImageContainer3Cols: React.FC<AnswerImageContainer3ColsProps> = ({
  options,
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
          onSelect={() => setSelectedIndex(index)}
        />
      ))}
    </div>
  );
};

export default AnswerImageContainer3Cols;
