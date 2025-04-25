/** @jsxImportSource @emotion/react */
import api from "../../configs/axiosConfig";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import correctSound from "../../assets/sounds/duo_correct_sound.mp4";
import incorrectSound from "../../assets/sounds/duo_incorrect_sound.mp4";
// Audio
import { AudioProvider } from "../components/LearnPage/Audio/AudioProvider";

//
import XPBar from "../components/XPBar/XPBar";
import ContinueButton from "../components/Button/ContinueButton";
import { IQuestion } from "../../interfaces/IQuestion";
import { ILessonInformation } from "../../interfaces/Course";
import FooterStatus from "../components/FooterBar/FooterStatus";
import LessonHeart from "../components/LessonHeart/LessonHeart";
import {
  ILessonReport,
  IQuestionReport,
} from "../../interfaces/SpaceRepetation/ILessonReport";
import { fetchUserId } from "../../services/Authentication/AuthService";
import { submitLessonReport } from "../../services/SpaceRepetition/PostLessonReport";
import { renderQuestion } from "../pages/LearnPage/renderQuestion";
import CongratulationPage from "../pages/LearnPage/CongratulationPage/CongratulationPage";

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
  //Care
  const [userId, setUserId] = useState("");

  const [isButtonActivate, setIsButtonActive] = useState(false);
  const [isButtonCorrect, setIsButtonCorrect] = useState(false);
  const [isNext, setIsNext] = useState(false);
  //Care
  const [isRetry, setIsRetry] = useState(false);
  const [isQuestionRetry, setIsQuestionRetry] = useState<boolean[]>([]);

  const [isSubmit, setIsSubmit] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Care
  const [lessonReport, setLessonReport] = useState<ILessonReport | null>(null); // Lưu lại report những câu đúng, câu sai
  const [isPostReport, setIsPostReport] = useState(false);

  const [xp, setXp] = useState({ accumulated: 0, total: 1 });
  const [state, setState] = useState(1);
  const [questionList, setQuestionList] = useState<IQuestion[]>([]);
  const [originalQuestionList, setOriginalQuestionList] = useState<IQuestion[]>(
    []
  ); // Lưu lại danh sách câu hỏi gốc

  const [isCongratulation, setIsCongratulation] = useState(false);

  const [correctRate, setCorrectRate] = useState(0);

  useEffect(() => {
    setOriginalQuestionList(questionList);
  });
  //Sử dụng để tính toán tỉ lệ đúng
  useEffect(() => {
    if (isNext && isButtonCorrect && !isRetry) {
      const oneRate = Math.floor((1 / originalQuestionList.length) * 100);
      setCorrectRate((prev) => prev + oneRate);
      console.log(correctRate);
    }
  }, [isNext, isButtonCorrect]);

  // Care
  const location = useLocation();
  const {
    lessonInformation,
    courseId,
    currentOrder,
    lessonOrder,
    lessonLength,
  } = location.state as {
    lessonInformation: ILessonInformation;
    courseId: string;
    order: number;
    currentOrder: number; //Kiểm tra xem user có làm lại bài cũ không, nếu có thì không xét finish lesson
    lessonOrder: number;
    lessonLength: number; // Số lượng lesson
  };
  console.log("Lesson length:", lessonLength);
  // Care
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

  // Care
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

  // Care
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

  // Care
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
    return renderQuestion({
      questionData: questionData,
      state,
      isSubmit,
      isRetry,
      isQuestionRetry,
      setIsNext,
      setIsRetry,
      setIsSubmit,
      setIsButtonActive,
      setIsButtonCorrect,
    });
  };
  // const stopAudio = useStopAudio();
  return (
    <AudioProvider>
      <div className="flex flex-col items-center overflow-y-auto">
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
        {isCongratulation ? (
          <CongratulationPage
            xp={lessonInformation.xpEarned}
            correctRate={correctRate}
          />
        ) : (
          <>
            {/* XP Bar & Heart */}
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
          </>
        )}
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
            setIsCongratulation={setIsCongratulation}
            isNext={isNext}
            isFinished={isFinished}
            isFinishedCourse={currentOrder === lessonLength}
            setIsButtonActive={setIsButtonActive}
            setIsButtonCorrect={setIsButtonCorrect}
            setIsNext={setIsNext}
            maxState={questionList.length}
            isButtonActivate={isButtonActivate}
            isButtonCorrect={isButtonCorrect}
            isCongratulation={isCongratulation}
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
            type="lesson" //Nếu type lesson thì navigate về home, nếu review navigate về review
          />
        </div>
      </div>
    </AudioProvider>
  );
};
export default LessonLayout;
