import { motion, AnimatePresence } from "framer-motion";
import BSButton from "../Button/BuildSentenceButton/BSButton";

interface AnswerLineProps {
  selectedWords: {
    word: string;
  }[];
  onRemoveWord: (word: string) => void;
}

const AnswerLine: React.FC<AnswerLineProps> = ({
  selectedWords,
  onRemoveWord,
}) => {
  return (
    <div className="h-[60px] border-b-2 border-[#37464F] flex items-center gap-2 px-4 text-[19px] relative">
      <AnimatePresence>
        {selectedWords.map(({ word }) => (
          <motion.div
            key={word}
            layout
            initial={{
              opacity: 1,
              x: 0,
              y: -20,
            }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <BSButton label={word} onClick={() => onRemoveWord(word)} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AnswerLine;
