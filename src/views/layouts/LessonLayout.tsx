/** @jsxImportSource @emotion/react */
import api from "../../configs/axiosConfig";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import correctSound from "../../assets/sounds/duo_correct_sound.mp4";
import incorrectSound from "../../assets/sounds/duo_incorrect_sound.mp4";

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
import { getUserProfile } from "../../services/Authentication/AuthService";
import { IUserProfile } from "../../interfaces/Auth/IUserProfile";
import LessonHeart from "../components/LessonHeart/LessonHeart";
import { set } from "date-fns";

// https://d35aaqx5ub95lt.cloudfront.net/images/bd13fa941b2407b4914296afe4435646.svg

const LessonLayout: React.FC = () => {
  const [user, setUser] = useState<IUserProfile | null>(null);

  const [isButtonActivate, setIsButtonActive] = useState(false);
  const [isButtonCorrect, setIsButtonCorrect] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [isRetry, setIsRetry] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [xp, setXp] = useState({ accumulated: 0, total: 1 });
  const [state, setState] = useState(1);
  const [questionList, setQuestionList] = useState<IQuestion[]>([]);
  const location = useLocation();
  const { lessonInformation, courseId, currentOrder, lessonOrder } =
    location.state as {
      lessonInformation: ILessonInformation;
      courseId: string;
      order: number;
    };

  // Get user hearts:
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData.value);
      } catch (err) {
        console.log("Failed to fetch user profile in RightSideLayout" + err);
      }
    };

    fetchUserProfile();
  }, []);

  const fetchLesson = async () => {
    for (let i = 0; i < lessonInformation.questionCount; i++) {
      await api
        .get(
          `/Question/questions/list-questions/${
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

  useEffect(() => {
    if (isSubmit) {
      const sound = new Audio(isButtonCorrect ? correctSound : incorrectSound);
      sound.play();
    } else if (isNext) {
      const sound = new Audio(isButtonCorrect ? correctSound : incorrectSound);
      sound.play();
    } else if (isRetry) {
      const sound = new Audio(incorrectSound);
      sound.play();
    }
  }, [isSubmit, isNext, isRetry]);

  useEffect(() => {
    if (
      questionList.length !== 1 &&
      state === questionList.length &&
      isSubmit
    ) {
      setIsFinished(true);
    }
  }, [state, setIsFinished, questionList, isSubmit]);
  return (
    <div className="flex flex-col items-center">
      <audio
        autoPlay
        loop
        muted
        // style={{ display: "none" }}
      >
        alo
        <source
          src="https://drive.google.com/uc?export=download&id=1wSv4wBK2GaLTuv0G_WkoqUj6UOAOFJFr"
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>
      {/* XP Bar & Heart*/}
      <div className="flex h-[10vh] justify-center w-[70%] gap-[20px] items-center max-w-[1000px]">
        <XPBar accumulated={xp.accumulated} total={xp.total} />
        <LessonHeart
          heartNumber={user?.userStats.heart}
          isButtonCorrect={isButtonCorrect}
          isSubmit={isSubmit}
        />
      </div>
      {/* Main Layout */}
      <div className="h-[70vh] w-[100vw]">
        {questionList?.[0] ? handleLesson(questionList[state - 1]) : null}
      </div>
      {/* Navigation Bar */}
      <div
        className="bg-[#131F23] border-[#37464F] border-t-2 h-[20vh] w-[100vw] relative"
        // style={{ background: isNext ? "#202F36" : "" }}
      >
        {isNext && isButtonCorrect && <FooterStatus type={0} />}
        {isNext && !isButtonCorrect && <FooterStatus type={1} />}
        {!isNext && isRetry && <FooterStatus type={2} />}
        <ContinueButton
          setXp={setXp}
          setIsSubmit={setIsSubmit}
          isNext={isNext}
          isFinished={isFinished}
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
          courseId={courseId}
          currentOrder={currentOrder}
          lessonOrder={lessonOrder}
        />
      </div>
    </div>
  );
};
export default LessonLayout;
