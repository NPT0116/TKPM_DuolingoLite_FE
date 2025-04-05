import React, { useState, useEffect, useRef } from "react";
import { IMultipleChoiceOption } from "../../../../../interfaces/Options/IMultipleChoiceOption";
import AnswerCard from "../AnswerCard/AnswerCard";

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
  // Handle audio overlap
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playAudio = (url: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.play().catch((error) => {
      console.log("Error in AnswerContainer.tsx", error);
    });
  };
  return (
    <div
      className={`w-full h-full flex ${
        onlyAudio && options.length === 2 ? "" : "flex-col"
      } gap-[8px]`}
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
