/** @jsxImportSource @emotion/react */
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { css, keyframes } from "@emotion/react";

//
import XPBar from "../components/XPBar/XPBar";
import ContinueButton from "../components/Button/ContinueButton";
import mockData from "../../services/mock_datas/build_sentences.json";
import mockData1 from "../../services/mock_datas/multiple_choice.json";
import { IQuestion } from "../../interfaces/IQuestion";
import { IBuildSentenceQuestion } from "../../interfaces/Questions/IBuildSentenceQuestion";
import { ILessonInformation } from "../../interfaces/Course";
import FooterStatus from "../components/FooterBar/FooterStatus";

import { IMultipleChoiceQuestion } from "../../interfaces/Questions/IMultipleChoiceQuestion";
// Import Page Component
import MatchingLessonPage from "../pages/LearnPage/MatchingWord/MatchingLessonPage";
import PronunciationPage from "../pages/LearnPage/Pronunciation/PronunciationPage";
import BuildSentencePage from "../pages/LearnPage/BuildSentencePage/BuildSentencePage";
import MultipleChoicePage from "../pages/LearnPage/MultipleChoice/MultipleChoicePage";

// https://d35aaqx5ub95lt.cloudfront.net/images/bd13fa941b2407b4914296afe4435646.svg

const LessonLayout: React.FC = () => {
  const dataBuildSentence = mockData.value as IBuildSentenceQuestion;
  const dataMultipleChoice = mockData1.value as IMultipleChoiceQuestion;
  const [isButtonActivate, setIsButtonActive] = useState(false);
  const [isButtonCorrect, setIsButtonCorrect] = useState(false);
  const [isNext, setIsNext] = useState(false);

  const [xp, setXp] = useState({ accumulated: 0, total: 1 });
  const [state, setState] = useState(1);
  const [questionList, setQuestionList] = useState<IQuestion[]>([]);
  const location = useLocation();
  const { lessonInformation } = location.state as {
    lessonInformation: ILessonInformation;
  };
  const [lesson, setLesson] = useState(1);

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
    console.log(questionData);
    switch (questionData?.type) {
      case "Matching":
        return (
          <MatchingLessonPage
            setIsButtonActive={setIsButtonActive}
            setIsButtonCorrect={setIsButtonCorrect}
          />
        );
      case "Pronunciation":
        return (
          <PronunciationPage
            data={questionData}
            setIsButtonActive={setIsButtonActive}
            setIsButtonCorrect={setIsButtonCorrect}
          />
        );
      case "MultipleChoice":
        return (
          <MultipleChoicePage
            data={questionData as unknown as IMultipleChoiceQuestion}
            isNext={isNext}
            setIsButtonActive={setIsButtonActive}
            setIsButtonCorrect={setIsButtonCorrect}
          />
        );
      case "BuildSentence":
        return (
          <BuildSentencePage
            data={questionData as unknown as IBuildSentenceQuestion}
            setIsButtonActive={setIsButtonActive}
            setIsButtonCorrect={setIsButtonCorrect}
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
        <ContinueButton
          setXp={setXp}
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
