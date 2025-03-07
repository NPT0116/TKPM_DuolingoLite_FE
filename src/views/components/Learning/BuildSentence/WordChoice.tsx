import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";

import BSBWordButton from "../../Button/BuildSentence/BSWordButton";
import { IBuildSentenceOption } from "../../../../interfaces/Options/IBuildSentenceOption";

interface WordChoiceProps {
  isEnglish: boolean;
  selectedWords: IBuildSentenceOption[];
  wordOptions: IBuildSentenceOption[];
  onWordClick: (option: IBuildSentenceOption) => void;
  onWrapCountChange?: (count: number) => void;
  isSubmit: boolean;
}

const WordChoice: React.FC<WordChoiceProps> = ({
  selectedWords,
  wordOptions,
  onWordClick,
  onWrapCountChange,
  isEnglish,
  isSubmit,
}) => {
  // Ref cho container chứa các nút từ
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Lấy tất cả phần tử con và đếm các offsetTop khác nhau
      const children = Array.from(containerRef.current.children);
      const rows = new Set<number>();
      children.forEach((child) => {
        const el = child as HTMLElement;
        rows.add(el.offsetTop);
      });
      if (onWrapCountChange) {
        onWrapCountChange(rows.size);
      }
    }
  }, [wordOptions, selectedWords, onWrapCountChange]);

  return (
    <div
      ref={containerRef}
      className="flex flex-wrap justify-center text-[19px] gap-[10px]"
    >
      {wordOptions.map((option) => {
        const word: string = isEnglish
          ? option.englishText!
          : option.vietnameseText!;
        const isSelected = selectedWords.some((selected) => {
          const selectedWord = isEnglish
            ? selected.englishText
            : selected.vietnameseText;
          return selectedWord === word;
        });
        return (
          <motion.div key={option.optionId} className="relative">
            <div
              className="bg-[#37464F] rounded-xl absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                opacity: isSelected ? 1 : 0,
                transition: "opacity 0.3s",
              }}
            ></div>
            <div className="relative z-10">
              <BSBWordButton
                label={word}
                onClick={() => {
                  if (!isSelected) {
                    onWordClick(option);
                  }
                }}
                disabled={isSelected || isSubmit}
                style={{
                  opacity: isSelected ? 0 : 1,
                  transition: "opacity 0.3s",
                }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default WordChoice;
