/** @jsxImportSource @emotion/react */
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { css, keyframes } from "@emotion/react";

//
import XPBar from "../components/XPBar/XPBar";
import ContinueButton from "../components/Button/ContinueButton";
import { IQuestion } from "../../interfaces/IQuestion";
import { ILessonInformation } from "../../interfaces/Course";
import FooterStatus from "../components/FooterBar/FooterStatus";

// Interface
import { IBuildSentenceQuestion } from "../../interfaces/Questions/IBuildSentenceQuestion";
import { IMultipleChoiceQuestion } from "../../interfaces/Questions/IMultipleChoiceQuestion";
import { IMatchingQuestion } from "../../interfaces/Questions/IMatchingQuestion";
import { IPronunciationQuestion } from "../../interfaces/Questions/IPronunciationQuesion";
// Import Page Component
import MatchingLessonPage from "../pages/LearnPage/MatchingWord/MatchingLessonPage";
import PronunciationPage from "../pages/LearnPage/Pronunciation/PronunciationPage";
import BuildSentencePage from "../pages/LearnPage/BuildSentencePage/BuildSentencePage";
import MultipleChoicePage from "../pages/LearnPage/MultipleChoice/MultipleChoicePage";

// https://d35aaqx5ub95lt.cloudfront.net/images/bd13fa941b2407b4914296afe4435646.svg

const LessonLayout: React.FC = () => {
  const [isButtonActivate, setIsButtonActive] = useState(false);
  const [isButtonCorrect, setIsButtonCorrect] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [isRetry, setIsRetry] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const [xp, setXp] = useState({ accumulated: 0, total: 1 });
  const [state, setState] = useState(1);
  const [questionList, setQuestionList] = useState<IQuestion[]>([]);
  const location = useLocation();
  const { lessonInformation } = location.state as {
    lessonInformation: ILessonInformation;
  };

  const fetchLesson = async () => {
    for (let i = 0; i < lessonInformation.questionCount; i++) {
      await axios
        .get(
          `/api/Question/questions/list-questions/${
            lessonInformation.id
          }?questionOrder=${i + 1}`
        )
        .then((response) => {
          setQuestionList((prev) => [...prev, response.data.value]);
        })
        .catch((error) => {
          console.error("Error while fetching question:", error);
        });
    }
  };
  const handleLesson = (questionData: IQuestion) => {
    switch (questionData?.type) {
      case "Matching":
        return (
          <MatchingLessonPage
            data={questionData as unknown as IMatchingQuestion}
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
            isRetry={isRetry}
            setIsButtonActive={setIsButtonActive}
            setIsButtonCorrect={setIsButtonCorrect}
          />
        );
      case "MultipleChoice":
        return (
          <MultipleChoicePage
            data={questionData as unknown as IMultipleChoiceQuestion}
            setIsButtonActive={setIsButtonActive}
            setIsButtonCorrect={setIsButtonCorrect}
            isSubmit={isSubmit}
          />
        );
      case "BuildSentence":
        return (
          <BuildSentencePage
            data={questionData as unknown as IBuildSentenceQuestion}
            setIsButtonActive={setIsButtonActive}
            setIsButtonCorrect={setIsButtonCorrect}
            isSubmit={isSubmit}
          />
        );
      default:
        return <div className="text-white">{state}</div>;
    }
  };

  useEffect(() => {
    fetchLesson();
  }, [lessonInformation]);
  useEffect(() => {
    setIsButtonActive(false);
    setIsButtonCorrect(false);
  }, []);
  return (
    <div>
      {/* XP Bar */}
      <div className="w-[100vw] h-[10vh] ">
        <XPBar accumulated={xp.accumulated} total={xp.total} />
      </div>
      {/* Main Layout */}
      <div className="w-[100vw] h-[70vh]">
        {questionList?.[0] ? handleLesson(questionList[state - 1]) : null}
      </div>

      {/* Navigation Bar */}
      <div
        className="relative w-[100vw] h-[20vh] border-[#37464F] border-t-2 bg-[#131F23]"
        // style={{ background: isNext ? "#202F36" : "" }}
      >
        {isNext && isButtonCorrect && <FooterStatus type={0} />}
        {isNext && !isButtonCorrect && <FooterStatus type={1} />}
        {!isNext && isRetry && <FooterStatus type={2} />}
        <ContinueButton
          setXp={setXp}
          setIsSubmit={setIsSubmit}
          isNext={isNext}
          setIsButtonActive={setIsButtonActive}
          setIsButtonCorrect={setIsButtonCorrect}
          setIsNext={setIsNext}
          maxState={questionList.length}
          isButtonActivate={isButtonActivate}
          isButtonCorrect={isButtonCorrect}
          state={state}
          setState={setState}
          mainColor="3B4EFF"
          borderColor="3F22EC"
          hoverColor="4156FF"
          paddingWidth={80}
          positionRight={250}
        />
      </div>
    </div>
  );
};
export default LessonLayout;
