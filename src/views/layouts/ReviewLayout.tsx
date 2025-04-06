/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import correctSound from "../../assets/sounds/duo_correct_sound.mp4";
import incorrectSound from "../../assets/sounds/duo_incorrect_sound.mp4";

//
import XPBar from "../components/XPBar/XPBar";
import ContinueButton from "../components/Button/ContinueButton";
import { IQuestion } from "../../interfaces/IQuestion";
import FooterStatus from "../components/FooterBar/FooterStatus";
import { IReviewRecordDue } from "../../interfaces/SpaceRepetation/IDueReview";
import { fetchDueReview } from "../../services/SpaceRepetition/GetDueReviewService";
import { fetchQuestionThroughRecordId } from "../../services/SpaceRepetition/GetQuestionThroughRecordId";
import { putRecordThroughRecordId } from "../../services/SpaceRepetition/PutRecordService";
import { fetchUserId } from "../../services/Authentication/AuthService";
import { renderQuestion } from "../pages/LearnPage/renderQuestion";
import LessonHeart from "../components/LessonHeart/LessonHeart";

// https://d35aaqx5ub95lt.cloudfront.net/images/bd13fa941b2407b4914296afe4435646.svg

const ReviewLayout: React.FC = () => {
  const [userId, setUserId] = useState("");
  const [isButtonActivate, setIsButtonActive] = useState(false);
  const [isButtonCorrect, setIsButtonCorrect] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [isRetry, setIsRetry] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [dueReviewRecord, setDueReviewRecord] =
    useState<IReviewRecordDue | null>(null);
  const [xp, setXp] = useState({ accumulated: 0, total: 1 });
  const [state, setState] = useState(1);
  const [questionList, setQuestionList] = useState<IQuestion[]>([]);

  useEffect(() => {
    fetchUserId(setUserId);
  }, []);

  useEffect(() => {
    if (userId) {
      fetchDueReview(userId, setDueReviewRecord);
    }
  }, [userId]);

  useEffect(() => {
    if (dueReviewRecord) {
      for (let i = 0; i < dueReviewRecord.dueReviews.length; i++) {
        fetchQuestionThroughRecordId(
          dueReviewRecord.dueReviews[i].id,
          setQuestionList
        );
      }
    }
  }, [dueReviewRecord]);

  useEffect(() => {
    setIsButtonActive(false);
    setIsButtonCorrect(false);
  }, []);

  // Play sounds
  useEffect(() => {
    if (isSubmit || isNext) {
      const sound = new Audio(isButtonCorrect ? correctSound : incorrectSound);
      sound.play();
    } else if (isRetry) {
      const sound = new Audio(incorrectSound);
      sound.play();
    }
  }, [isSubmit, isNext, isRetry]);

  //Put record Id khi hoàn thành question đó
  useEffect(() => {
    if (isSubmit || isNext) {
      putRecordThroughRecordId(
        dueReviewRecord!.dueReviews[state - 1].id,
        isButtonCorrect
      );
    }
  }, [isSubmit, isNext]);

  useEffect(() => {
    if (state === questionList.length && isNext) {
      setIsFinished(true);
    }
  }, [state, setIsFinished, questionList, isNext, isButtonCorrect]);
  const handleLesson = (questionData: IQuestion) => {
    return renderQuestion({
      questionData: questionData,
      state,
      isSubmit,
      isRetry,
      isQuestionRetry: [false],
      setIsNext,
      setIsRetry,
      setIsButtonActive,
      setIsButtonCorrect,
    });
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
      <div className="flex h-[10vh] justify-center w-[70%] gap-[20px] items-center max-w-[1000px]">
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
          courseId="" //Giá trị giả
          currentOrder={1} //Giá trị giả
          lessonOrder={0} //Giá trị giả
          type="review"
        />
      </div>
    </div>
  );
};
export default ReviewLayout;
