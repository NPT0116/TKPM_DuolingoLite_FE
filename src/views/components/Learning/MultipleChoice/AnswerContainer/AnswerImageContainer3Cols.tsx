import React, { MutableRefObject, useEffect, useRef, useState } from "react";

import AnswerImageCard from "../AnswerCard/AnswerImageCard";
import { IMultipleChoiceOption } from "../../../../../interfaces/Options/IMultipleChoiceOption";
import { usePlayAudio } from "../../../LearnPage/Audio/AudioProvider";

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
  console.log(isNext);
  useEffect(() => {
    if (isNext) {
      setSelectedIndex(null);
      setIsNext(false);
      setIsButtonActive(false);
      setIsButtonCorrect(false);
    }
  }, [isNext, setIsButtonActive, setIsNext]);
  const playAudio = usePlayAudio();
  return (
    <div className=" w-full h-full flex gap-[8px] items-center">
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

export default AnswerImageContainer3Cols;
