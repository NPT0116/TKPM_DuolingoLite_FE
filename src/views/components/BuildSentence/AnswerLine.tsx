import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import BSButton from "../Button/BuildSentenceButton/BSButton";
import { BuildSentenceOption } from "../../../interfaces/Options/BuildSentenceOption";

interface AnswerLineProps {
  selectedWords: BuildSentenceOption[];
  onRemoveWord: (option: BuildSentenceOption) => void;
  wrapCount: number;
}

const AnswerLine: React.FC<AnswerLineProps> = ({
  selectedWords,
  onRemoveWord,
  wrapCount,
}) => {
  const effectiveWrapCount = wrapCount > 1 ? wrapCount : 1;
  const containerHeight = 64 * effectiveWrapCount + 2; // chiều cao = 60px * effectiveWrapCount

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

  return (
    <div
      style={{
        minHeight: `${containerHeight}px`,
        alignContent: "flex-start",
        paddingTop: "5px",
      }}
      className="border-b-2 border-[#37464F] flex flex-wrap items-start gap-3.5 px-4 text-[19px] relative"
    >
      {hrLines}
      <AnimatePresence>
        {selectedWords.map((option) => {
          const word: string = option.englishText ?? option.vietnameseText!;
          return (
            <motion.div
              key={option.optionId}
              layout
              initial={{ opacity: 1, x: 0, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <BSButton label={word} onClick={() => onRemoveWord(option)} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default AnswerLine;
