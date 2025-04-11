import { Checkbox } from "antd";
import { useEffect, useState } from "react";
import { IAddConfigure } from "../../../../../interfaces/Configure/Configure";
import CreateOptionForm from "../CreateOptionForm";
import { IAddQuestion } from "../../../../../interfaces/Questions/IBaseQuestion";
import { QuestionType } from "../../../../../enums/questionType";
import MultipleChoiceOptionPrompt from "./MultipleChoiceOptionPrompt";
import MatchingOptionPrompt from "./MatchingOptionPrompt";
import BuildSentenceOptionPrompt from "./BuildSentenceOptionPrompt";
interface OptionPromptProps {
  configureArray: string[];
  question: IAddQuestion;
  setQuestion: React.Dispatch<React.SetStateAction<IAddQuestion>>;
  questionType: QuestionType;
}

const OptionPrompt: React.FC<OptionPromptProps> = ({
  configureArray,
  question,
  setQuestion,
  questionType,
}) => {
  const [audioForced, setAudioForced] = useState(false);
  const [vietnameseTextForced, setVietnameseTextForced] = useState(false);
  const [englishTextForced, setEnglishTextForced] = useState(false);
  const [visibleFields, setVisibleFields] = useState<Record<string, boolean>>({
    instruction: false,
    vietnameseText: false,
    englishText: false,
    audio: false,
    image: false,
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  // useEffect(() => {
  //   if (question.questionConfiguration.englishText) {
  //     setEnglishTextForced(true);
  //   } else setEnglishTextForced(false);
  //   if (question.questionConfiguration.vietnameseText) {
  //     setVietnameseTextForced(true);
  //   } else setVietnameseTextForced(false);
  // }, [question.questionConfiguration]);

  const toCamelCase = (str: string): keyof IAddConfigure => {
    return (str.charAt(0).toLowerCase() +
      str.slice(1).replace(/\s+/g, "")) as keyof IAddConfigure;
  };

  const handleCheckBox = (field: string) => () => {
    const key = toCamelCase(field);
    const newValue = !visibleFields[key];
    if (key === "englishText") {
      setVisibleFields((prev) => ({
        ...prev,
        englishText: newValue,
        audio: newValue,
      }));
      if (newValue) {
        setVisibleFields((prev) => ({
          ...prev,
          vietnameseText: false,
        }));
      }
      setAudioForced(newValue);
      if (questionType === QuestionType.MultipleChoice) {
        setVietnameseTextForced(newValue);
      }
    } else if (key === "vietnameseText") {
      setVisibleFields((prev) => ({
        ...prev,
        vietnameseText: newValue,
      }));
      if (newValue) {
        setVisibleFields((prev) => ({
          ...prev,
          englishText: false,
        }));
      }
      if (questionType === QuestionType.MultipleChoice) {
        setEnglishTextForced(newValue);
      }
    } else if (!audioForced || key !== "audio") {
      setVisibleFields((prev) => ({
        ...prev,
        [key]: newValue,
      }));
    }
    setQuestion((prev) => ({
      ...prev,
      optionConfiguration: {
        ...prev.optionConfiguration,
        [key]: newValue,
        ...(key === "englishText" ? { audio: newValue } : {}),
      },
    }));
  };

  useEffect(() => {
    const { id, ...restConfig } = question.optionConfiguration;
    setVisibleFields(restConfig);
  }, [question.optionConfiguration]);

  const renderOptionPrompt = () => {
    switch (questionType) {
      case QuestionType.MultipleChoice:
        return (
          <MultipleChoiceOptionPrompt
            setQuestion={setQuestion}
            setShowCreateModal={setShowCreateModal}
            setModalIndex={setModalIndex}
            vietnameseTextForced={vietnameseTextForced}
            englishTextForced={englishTextForced}
            visibleFields={visibleFields}
          />
        );
      case QuestionType.Matching:
        return (
          <MatchingOptionPrompt
            setQuestion={setQuestion}
            setShowCreateModal={setShowCreateModal}
            setModalIndex={setModalIndex}
            vietnameseTextForced={vietnameseTextForced}
            englishTextForced={englishTextForced}
            visibleFields={visibleFields}
          />
        );
      case QuestionType.BuildSentence:
        return (
          <BuildSentenceOptionPrompt
            setQuestion={setQuestion}
            setShowCreateModal={setShowCreateModal}
            setModalIndex={setModalIndex}
            vietnameseTextForced={vietnameseTextForced}
            englishTextForced={englishTextForced}
            visibleFields={visibleFields}
          />
        );

      default:
        return null;
    }
  };
  return (
    <div className="w-full h-full flex flex-col justify-evenly overflow-y-auto">
      <header className="h-1/6 bg-gray-300">
        <h3 className="text-3xl font-extrabold tracking-wide uppercase text-center">
          Option Configuration
        </h3>
        <section>
          <ul className="flex flex-wrap gap-8 justify-center">
            {configureArray.map((field, index) => (
              <li key={index}>
                {field !== "Instruction" && (
                  <Checkbox
                    onChange={handleCheckBox(field)}
                    checked={visibleFields[toCamelCase(field)]}
                    disabled={
                      toCamelCase(field) === "englishText"
                        ? englishTextForced
                        : toCamelCase(field) === "vietnameseText"
                        ? vietnameseTextForced
                        : toCamelCase(field) === "audio"
                        ? audioForced
                        : false
                    }
                  >
                    <span className="text-[18px]">{field}</span>
                  </Checkbox>
                )}
              </li>
            ))}
          </ul>
        </section>
      </header>
      {renderOptionPrompt()}

      {showCreateModal && (
        <CreateOptionForm
          setShowCreateModal={setShowCreateModal}
          modalIndex={modalIndex}
        />
      )}
    </div>
  );
};

export default OptionPrompt;
