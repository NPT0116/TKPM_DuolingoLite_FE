import React from "react";
import { IQuestion } from "../../../interfaces/IQuestion";
import MatchingLessonPage from "./MatchingWord/MatchingLessonPage";
import { IMatchingQuestion } from "../../../interfaces/Questions/IMatchingQuestion";
import PronunciationPage from "./Pronunciation/PronunciationPage";
import { IPronunciationQuestion } from "../../../interfaces/Questions/IPronunciationQuesion";
import MultipleChoicePage from "./MultipleChoice/MultipleChoicePage";
import { IMultipleChoiceQuestion } from "../../../interfaces/Questions/IMultipleChoiceQuestion";
import BuildSentencePage from "./BuildSentencePage/BuildSentencePage";
import { IBuildSentenceQuestion } from "../../../interfaces/Questions/IBuildSentenceQuestion";

interface HandleLessonProps {
  questionData: IQuestion;
  state: number;
  isSubmit: boolean;
  isRetry: boolean;
  isQuestionRetry: boolean[];
  setIsNext: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRetry: React.Dispatch<React.SetStateAction<boolean>>;
  setIsButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsButtonCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSubmit?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const renderQuestion = ({
  questionData,
  state,
  isSubmit,
  isRetry,
  isQuestionRetry,
  setIsNext,
  setIsRetry,
  setIsButtonActive,
  setIsButtonCorrect,
  setIsSubmit,
}: HandleLessonProps): React.ReactNode => {
  switch (questionData?.type) {
    case "Matching":
      return (
        <MatchingLessonPage
          data={questionData as unknown as IMatchingQuestion}
          setIsSubmit={setIsSubmit}
          setIsNext={setIsNext}
          setIsButtonActive={setIsButtonActive}
          setIsButtonCorrect={setIsButtonCorrect}
        />
      );
    case "Pronunciation":
      return (
        <PronunciationPage
          data={questionData as unknown as IPronunciationQuestion}
          setIsNext={setIsNext}
          setIsRetry={setIsRetry}
          setIsSubmit={setIsSubmit}
          isRetry={isRetry}
          setIsButtonActive={setIsButtonActive}
          setIsButtonCorrect={setIsButtonCorrect}
          isQuestionRetry={isQuestionRetry[state - 1]}
          state={state}
        />
      );
    case "MultipleChoice":
      return (
        <MultipleChoicePage
          data={questionData as IMultipleChoiceQuestion}
          setIsButtonActive={setIsButtonActive}
          setIsButtonCorrect={setIsButtonCorrect}
          isSubmit={isSubmit}
          isQuestionRetry={isQuestionRetry[state - 1]}
          state={state}
        />
      );
    case "BuildSentence":
      return (
        <BuildSentencePage
          data={questionData as unknown as IBuildSentenceQuestion}
          setIsButtonActive={setIsButtonActive}
          setIsButtonCorrect={setIsButtonCorrect}
          isSubmit={isSubmit}
          isQuestionRetry={isQuestionRetry[state - 1]}
          state={state}
        />
      );
    default:
      return <div className="text-white"></div>;
  }
};
