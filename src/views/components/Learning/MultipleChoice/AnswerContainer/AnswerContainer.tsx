import React, { useState, useEffect, useRef } from "react";
import { IMultipleChoiceOption } from "../../../../../interfaces/Options/IMultipleChoiceOption";
import AnswerCard from "../AnswerCard/AnswerCard";
import { usePlayAudio } from "../../../LearnPage/Audio/AudioProvider";

interface AnswerContainerProps {
  options: IMultipleChoiceOption[];
  setIsButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsButtonCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  isNext: boolean;
  isEnglish: boolean;
  setIsNext: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmit: boolean;
  onlyAudio: boolean;
}

const AnswerContainer: React.FC<AnswerContainerProps> = ({
  options,
  setIsButtonActive,
  setIsButtonCorrect,
  isNext,
  isEnglish,
  setIsNext,
  isSubmit,
  onlyAudio,
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
  const playAudio = usePlayAudio();

  return (
    <div
      className={`w-full h-full  flex justify-center items-center ${
        onlyAudio && options.length === 2 ? "" : "flex-col"
      } gap-2`}
    >
      {/* Answer Cards */}
      {options.map((option, index) => (
        <AnswerCard
          key={index}
          option={option}
          isEnglish={isEnglish}
          index={index}
          isSelected={selectedIndex === index}
          onSelect={() => {
            if (isSubmit) return;
            setSelectedIndex(index);
            setIsButtonActive(true);
            setIsButtonCorrect(option.isCorrect);
            if (option.audio && option.audio.url) {
              playAudio(option.audio.url);
            }
          }}
          isSubmit={isSubmit}
        />
      ))}
    </div>
  );
};

export default AnswerContainer;
