import { useEffect, useState } from "react";
import { IQuestion } from "../../../../interfaces/IQuestion";
import { renderQuestion } from "../../LearnPage/renderQuestion";
import TestContinueButton from "../../../components/Button/TestContinueButton";
import FooterStatus from "../../../components/FooterBar/FooterStatus";
import correctSound from "../../../../assets/sounds/duo_correct_sound.mp4";
import incorrectSound from "../../../../assets/sounds/duo_incorrect_sound.mp4";
import { AudioProvider } from "../../../components/LearnPage/Audio/AudioProvider";

interface IAdminTestLessonPage {
  receivedQuestion: IQuestion;
}

const AdminTestLessonPage: React.FC<IAdminTestLessonPage> = ({
  receivedQuestion,
}) => {
  // const [question, setQuestion] = useState<IQuestion | null>(null);
  // const lessonId = "31dc76be-c835-473c-9def-1f754b9732e5";
  // const questionOrder = 1;
  // useEffect(() => {
  //   setQuestion(receivedQuestion);
  //   const fetchQuestionDetail = async () => {
  //     try {
  //       const question = await getQuestionDetail(lessonId, questionOrder);
  //       if (question) {
  //         setQuestion(question.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching question detail:", error);
  //     }
  //   };
  //   fetchQuestionDetail();
  // }, []);
  const handleLesson = (questionData: IQuestion) => {
    return renderQuestion({
      questionData: questionData,
      state: 1,
      isSubmit,
      isRetry,
      isQuestionRetry: [false],
      setIsNext,
      setIsRetry,
      setIsButtonActive,
      setIsButtonCorrect,
      setIsSubmit,
    });
  };
  const [isButtonActivate, setIsButtonActive] = useState(false);
  const [isButtonCorrect, setIsButtonCorrect] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [isRetry, setIsRetry] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    setIsButtonActive(false);
    setIsButtonCorrect(false);
    setIsNext(false);
    setIsRetry(false);
    setIsSubmit(false);
  }, [receivedQuestion]);

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
  console.log(receivedQuestion);
  return (
    <AudioProvider>
      <div className="bg-[#131F23] w-full h-full overflow-auto flex flex-col rounded-br-xl">
        <div className="h-4/5 w-full">{handleLesson(receivedQuestion!)}</div>
        <div className="h-1/5 w-full bg-[#131F23] border-[#37464F] border-t-2 relative">
          {isNext && isButtonCorrect && <FooterStatus type={0} />}
          {isNext && !isButtonCorrect && <FooterStatus type={1} />}
          {!isNext && isRetry && <FooterStatus type={2} />}
          {receivedQuestion && (
            <TestContinueButton
              isSubmit={isSubmit}
              setIsSubmit={setIsSubmit}
              setIsNext={setIsNext}
              isButtonActivate={isButtonActivate}
              isButtonCorrect={isButtonCorrect}
              hoverColor="4156FF"
              paddingWidth={80}
              positionRight={0}
              type="admin-learn" //Nếu type learn thì navigate về home, nếu review navigate về review
            />
          )}
        </div>
      </div>
    </AudioProvider>
  );
};

export default AdminTestLessonPage;
