import React, { useEffect, useRef, useState } from "react";

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
  console.log(isNext);
  useEffect(() => {
    if (isNext) {
      setSelectedIndex(null);
      setIsNext(false);
      setIsButtonActive(false);
      setIsButtonCorrect(false);
    }
  }, [isNext, setIsButtonActive, setIsNext]);
  // Handle overlap audio
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const playAudio = (url: string) => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
    }
    const audio = new Audio(url);
    currentAudioRef.current = audio;
    audio.play().catch((error) => {
      console.log("Error in AnswerImageContainer3Cols: ", error);
    });
  };
  return (
    <div className="h-[300px] w-full flex flex-col-3 gap-[8px] items-center">
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
