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
import LessonHeart from "../components/LessonHeart/LessonHeart";
import {
  ILessonReport,
  IQuestionReport,
} from "../../interfaces/SpaceRepetation/ILessonReport";
import { fetchUserId } from "../../services/Authentication/AuthService";
import { submitLessonReport } from "../../services/SpaceRepetition/PostLessonReport";

// https://d35aaqx5ub95lt.cloudfront.net/images/bd13fa941b2407b4914296afe4435646.svg

// Hàm xáo câu hỏi
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const LessonLayout: React.FC = () => {
  const [userId, setUserId] = useState("");
  const [isButtonActivate, setIsButtonActive] = useState(false);
  const [isButtonCorrect, setIsButtonCorrect] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [isRetry, setIsRetry] = useState(false);
  const [isQuestionRetry, setIsQuestionRetry] = useState<boolean[]>([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [lessonReport, setLessonReport] = useState<ILessonReport | null>(null); // Lưu lại report những câu đúng, câu sai
  const [isPostReport, setIsPostReport] = useState(false);
  const [xp, setXp] = useState({ accumulated: 0, total: 1 });
  const [state, setState] = useState(1);
  const [questionList, setQuestionList] = useState<IQuestion[]>([]);
  const location = useLocation();
  const { lessonInformation, courseId, currentOrder, lessonOrder } =
    location.state as {
      lessonInformation: ILessonInformation;
      courseId: string;
      order: number;
      currentOrder: number; //Kiểm tra xem user có làm lại bài cũ không, nếu có thì không xét finish lesson
      lessonOrder: number;
    };

  useEffect(() => {
    fetchUserId(setUserId);
  }, []);

  useEffect(() => {
    if (userId && lessonReport === null) {
      const newLessonReport: ILessonReport = {
        userId: userId,
        lessonId: lessonInformation.id,
        results: [],
      };
      setLessonReport(newLessonReport);
    }
  }, [userId, lessonReport]);

  const fetchLesson = async () => {
    try {
      console.log(lessonInformation);
      const responses = await Promise.all(
        Array.from({ length: lessonInformation.questionCount }, (_, i) =>
          api.get(
            `/Question/questions/list-questions/${
              lessonInformation.id
            }?questionOrder=${i + 1}`
          )
        )
      );

      const questions = responses.map((res) => res.data.value);
      const shuffledQuestions = shuffleArray(questions);

      setQuestionList(shuffledQuestions);
      // Đặt tất cả các câu là chưa retry
      setIsQuestionRetry(Array(shuffledQuestions.length).fill(false));
    } catch (error) {
      console.error("Error while fetching questions:", error);
    }
  };
  // Nếu trả lời sai thì lưu về cuối
  useEffect(() => {
    if (
      isSubmit &&
      !isButtonCorrect &&
      questionList[state - 1].type !== "Pronunciation"
    ) {
      const currentQuestion = questionList[state - 1];
      setQuestionList((prev) => [...prev, currentQuestion]);
      setIsQuestionRetry((prev) => [...prev, true]);
    }
  }, [isSubmit, isButtonCorrect]);
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
    if ((isSubmit || isNext) && !isQuestionRetry[state - 1]) {
      const currentQuestionId = questionList[state - 1].questionId;

      const isAlreadyReported = lessonReport?.results.some(
        (q) => q.questionId === currentQuestionId
      );

      if (!isAlreadyReported) {
        const newQuestionReport: IQuestionReport = {
          questionId: currentQuestionId,
          isCorrect: isButtonCorrect,
        };

        setLessonReport((prev) => {
          if (!prev) return prev;

          return {
            ...prev,
            results: [...prev.results, newQuestionReport],
          };
        });
      }
    }
  }, [
    isSubmit,
    isNext,
    lessonReport,
    isButtonCorrect,
    isQuestionRetry,
    questionList,
    state,
  ]);

  useEffect(() => {
    if (
      state === questionList.length &&
      isNext &&
      isButtonCorrect // Có cái này vì vẫn có vài câu hỏi phải làm lại sau khi sai
    ) {
      setIsFinished(true);
      if (currentOrder === lessonOrder && !isPostReport) {
        console.log(lessonReport);
        submitLessonReport(lessonReport!);
        setIsPostReport(true);
      }
    }
  }, [state, setIsFinished, questionList, isNext, isButtonCorrect]);
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
            isQuestionRetry={isQuestionRetry[state - 1]}
            state={state}
          />
        );
      case "MultipleChoice":
        return (
          <MultipleChoicePage
            data={questionData as unknown as IMultipleChoiceQuestion}
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
        return <div className="text-white">{state}</div>;
    }
  };

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
      <div className="flex h-[10vh] justify-end w-[70%] gap-[20px] items-center max-w-[1000px]">
        <XPBar accumulated={xp.accumulated} total={xp.total} />
        <LessonHeart
          state={state}
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
          type="learn" //Nếu type learn thì navigate về home, nếu review navigate về review
        />
      </div>
    </div>
  );
};
export default LessonLayout;
