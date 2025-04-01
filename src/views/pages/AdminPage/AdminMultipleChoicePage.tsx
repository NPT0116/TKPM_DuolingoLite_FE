import { useState } from "react";
import OptionPrompt from "../../components/Admin/Question/OptionPrompt";
import QuestionPrompt from "../../components/Admin/Question/QuestionPrompt";
import { IMultipleChoiceQuestion } from "../../../interfaces/Questions/IMultipleChoiceQuestion";

const createEmptyQuestion = (): IMultipleChoiceQuestion => ({
  questionId: "",
  instruction: "",
  vietnameseText: null,
  englishText: "",
  audio: null,
  picture: null,
  order: 0,
  type: "multiple-choice",
  questionConfigure: {
    id: crypto.randomUUID(),
    instruction: false,
    vietnameseText: false,
    englishText: false,
    audio: false,
    image: false,
  },
  optionConfigure: {
    id: crypto.randomUUID(),
    instruction: false,
    vietnameseText: false,
    englishText: false,
    audio: false,
    image: false,
  },
  options: [],
  words: [],
});

const AdminMultipleChoicePage: React.FC = () => {
  const optionConfigureArray = [
    "Instruction",
    "Vietnamese Text",
    "English Text",
    "Audio",
    "Image",
  ];
  const questionConfigureArray = [
    "Instruction",
    "Vietnamese Text",
    "English Text",
    "Audio",
    "Image",
  ];

  const [question, setQuestion] = useState<IMultipleChoiceQuestion>(
    createEmptyQuestion()
  );
  return (
    <div className="flex flex-col gap-[50px]">
      <QuestionPrompt
        configureArray={questionConfigureArray}
        question={question}
        setQuestion={setQuestion}
      />
      <OptionPrompt configureArray={optionConfigureArray} />
    </div>
  );
};

export default AdminMultipleChoicePage;
