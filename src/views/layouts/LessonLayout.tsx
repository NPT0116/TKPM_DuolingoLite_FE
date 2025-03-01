import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import XPBar from "../components/XPBar/XPBar";
import ContinueButton from "../components/Button/ContinueButton";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { IQuestionResponse, IQuestion } from "../../interfaces/IQuestion";
import { ILessonInformation, ILessonValue } from "../../interfaces/Course";
import { div } from "framer-motion/client";

// Import Page Component
import MatchingLessonPage from "../pages/LearnPage/MatchingWord/MatchingLessonPage";
import PronunciationPage from "../pages/LearnPage/Pronunciation/PronunciationPage";

const LessonLayout: React.FC = () => {
  const [xp, setXp] = useState({ accumulated: 0, total: 1 });
  const [state, setState] = useState(1);
  const [isButtonActivate, setIsButtonActive] = useState(false);
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
      case "MultipleChoice":
        return (
          <MatchingLessonPage
            setXp={setXp}
            state={state}
            setIsButtonActive={setIsButtonActive}
          />
        );
      case "Pronunciation":
        return <PronunciationPage />;
      case "MultipleChoice":
        return <div>Multiple Choice</div>;
      case "BuildSentence":
        return <div>Build Sentence</div>;
      default:
        return <div>hiu</div>;
    }
  };

  useEffect(() => {
    fetchLesson();
  }, [lessonInformation]);
  useEffect(() => {
    setIsButtonActive(true);
  }, []);

  console.log(quesionList);
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
      >
        <ContinueButton
          state={state}
          setState={setState}
          isButtonActivate={isButtonActivate}
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
