import React, { useState } from "react";
import { MultipleChoiceOption } from "../../../../../interfaces/Options/IMultipleChoiceOption";
import AnswerCard from "../AnswerCard/AnswerCard";

interface AnswerContainer2ColsProps {
  options: MultipleChoiceOption[];
}

const AnswerContainer2Cols: React.FC<AnswerContainer2ColsProps> = ({
  options,
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
          onSelect={() => setSelectedIndex(index)}
        />
      ))}
    </div>
  );
};

export default AnswerContainer2Cols;
