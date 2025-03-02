import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { IBuildSentenceOption } from "../../../../interfaces/Options/IBuildSentenceOption";
import BSBWordButton from "../../Button/BuildSentence/BSWordButton";

interface AnswerLineProps {
  isEnglish: boolean;
  selectedWords: IBuildSentenceOption[];
  onRemoveWord: (option: IBuildSentenceOption) => void;
  wrapCount: number;
  setIsButtonCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  correctWordLength: number;
}

const AnswerLine: React.FC<AnswerLineProps> = ({
  correctWordLength,
  selectedWords,
  onRemoveWord,
  wrapCount,
  isEnglish,
  setIsButtonCorrect,
}) => {
  // Set wrap count
  const effectiveWrapCount = wrapCount > 1 ? wrapCount : 1;
  const containerHeight = 64 * effectiveWrapCount + 2;

  const hrCount = wrapCount > 1 ? wrapCount - 1 : 0;

  const hrLines = Array.from({ length: hrCount }).map((_, i) => {
    const topPercent = ((i + 1) * 100) / wrapCount;
    return (
      <hr
        key={`hr-${i}`}
        className="absolute w-full border-[#37464F] border-t-2"
        style={{ top: `${topPercent}%` }}
      />
    );
  });

  useEffect(() => {
    if (selectedWords.length === correctWordLength) {
      for (let i = 0; i < selectedWords.length; i++) {
        if (selectedWords[i].order === i + 1) {
          if (i === selectedWords.length - 1) {
            setIsButtonCorrect(true);
            break;
          } else continue;
        } else {
          setIsButtonCorrect(false);
          break;
        }
      }
    } else setIsButtonCorrect(false);
  }, [selectedWords, correctWordLength, setIsButtonCorrect]);

  return (
    <div
      style={{
        minHeight: `${containerHeight}px`,
        alignContent: "flex-start",
        paddingTop: "5px",
      }}
      className="border-b-2 border-[#37464F] flex flex-wrap items-start gap-3.5 px-4 text-[19px] relative "
    >
      {hrLines}
      <AnimatePresence>
        {selectedWords.map((option) => {
          const word: string = isEnglish
            ? option.englishText!
            : option.vietnameseText!;
          return (
            <motion.div
              key={option.optionId}
              layout
              initial={{ opacity: 1, x: 0, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <BSBWordButton
                label={word}
                onClick={() => onRemoveWord(option)}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default AnswerLine;
