/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { css } from "@emotion/react";
import axios from "axios";

//
import XPBar from "../components/XPBar/XPBar";
import ContinueButton from "../components/Button/ContinueButton";
import mockData from "../../services/mock_datas/build_sentences.json";
import { IQuestion } from "../../interfaces/IQuestion";
import { IBuildSentenceQuestion } from "../../interfaces/Questions/IBuildSentenceQuestion";
import { ILessonInformation, ILessonValue } from "../../interfaces/Course";

// Import Page Component
import MatchingLessonPage from "../pages/LearnPage/MatchingWord/MatchingLessonPage";
import PronunciationPage from "../pages/LearnPage/Pronunciation/PronunciationPage";
import BuildSentencePage from "../pages/LearnPage/BuildSentencePage/BuildSentencePage";
import MultipleChoicePage from "../pages/LearnPage/MultipleChoice/MultipleChoicePage";

const footerWrong = css`
  background: #202f36;
  color: #d84948;
`;
// https://d35aaqx5ub95lt.cloudfront.net/images/bd13fa941b2407b4914296afe4435646.svg

const LessonLayout: React.FC = () => {
  const data = mockData.value as IBuildSentenceQuestion;
  const [xp, setXp] = useState({ accumulated: 0, total: 1 });
  const [state, setState] = useState(1);
  const [isButtonActivate, setIsButtonActive] = useState(false);
  const [isButtonCorrect, setIsButtonCorrect] = useState(false);
  const [quesionList, setQuestionList] = useState<IQuestion[]>([]);
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
  const handleLesson = (type: string) => {
    switch (type) {
      case "Matching":
        return <MatchingLessonPage setIsButtonActive={setIsButtonActive} />;
      case "Pronunciation":
        return <PronunciationPage />;
      case "MultipleChoice":
        return (
          <div className="text-white text-center">
            This is Multiple Choice Page
          </div>
        );
      case "BuildSentence":
        return (
          <BuildSentencePage
            data={data}
            setIsButtonActive={setIsButtonActive}
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
    setIsButtonActive(true);
    // setIsButtonCorrect(false);
  }, []);

  return (
    <div>
      {/* XP Bar */}
      <div className="w-[100vw] h-[10vh] ">
        <XPBar accumulated={xp.accumulated} total={xp.total} />
      </div>
      {/* Main Layout */}
      <div className="w-[100vw] h-[75vh]">
        {quesionList?.[0] ? handleLesson(quesionList[state]?.type) : null}
      </div>

      {/* Navigation Bar */}
      <div
        className="w-[100vw] h-[15vh] border-[#37464F] border-t-2 bg-[#131F23]"
        style={{ padding: "10px 0px" }}
        css={footerWrong}
      >
        <ContinueButton
          setXp={setXp}
          setIsButtonActive={setIsButtonActive}
          setIsButtonCorrect={setIsButtonCorrect}
          maxState={quesionList.length}
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
