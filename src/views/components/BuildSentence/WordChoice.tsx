import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import BSButton from "../Button/BuildSentenceButton/BSButton";

interface WordChoiceProps {
  selectedWords: {
    word: string;
    optionPosition: { x: number; y: number };
    answerPosition: { x: number; y: number };
  }[];
  onWordClick: (word: string, position: { x: number; y: number }) => void;
}

const WordChoice: React.FC<WordChoiceProps> = ({
  selectedWords,
  onWordClick,
}) => {
  const words = ["coffee", "water", "and", "milk"];
  const wordRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const setWordRef = useCallback(
    (word: string) => (el: HTMLDivElement | null) => {
      wordRefs.current[word] = el;
    },
    []
  );

  const handleWordClick = (word: string) => {
    const ref = wordRefs.current[word];
    if (ref) {
      const rect = ref.getBoundingClientRect();
      // Tính vị trí của BSButton (theo viewport)
      onWordClick(word, { x: rect.left, y: rect.top });
    }
  };

  return (
    <div className="flex flex-wrap justify-center text-[19px] gap-[10px]">
      {words.map((word) => {
        const isSelected = selectedWords.some((w) => w.word === word);
        return (
          <motion.div key={word} ref={setWordRef(word)} className="relative">
            <div
              className={`bg-white rounded-xl absolute inset-0 pointer-events-none transition-opacity duration-300 `}
              style={{
                opacity: isSelected ? 1 : 0,
                transition: "opacity 0.3s",
              }}
            ></div>
            <div className="relative z-10">
              <BSButton
                label={word}
                onClick={() => !isSelected && handleWordClick(word)}
                disabled={isSelected}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default WordChoice;
