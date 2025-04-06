import { useEffect, useState } from "react";
import { getQuestionDetail } from "../../../../services/Question/getQuestionDetailService";
import { IQuestion } from "../../../../interfaces/IQuestion";
import { renderQuestion } from "../../LearnPage/renderQuestion";
import TestContinueButton from "../../../components/Button/TestContinueButton";
import FooterStatus from "../../../components/FooterBar/FooterStatus";
import correctSound from "../../../../assets/sounds/duo_correct_sound.mp4";
import incorrectSound from "../../../../assets/sounds/duo_incorrect_sound.mp4";

const AdminTestLessonPage = () => {
  const [question, setQuestion] = useState<IQuestion | null>(null);
  const lessonId = "00922209-1ba2-4f81-a1be-2a84a0e24663";
  const [isButtonActivate, setIsButtonActive] = useState(false);
  const [isButtonCorrect, setIsButtonCorrect] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [isRetry, setIsRetry] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const questionOrder = 1;
  useEffect(() => {
    const fetchQuestionDetail = async () => {
      try {
        const question = await getQuestionDetail(lessonId, questionOrder);
        if (question) {
          setQuestion(question.data);
        }
      } catch (error) {
        console.error("Error fetching question detail:", error);
      }
    };
    fetchQuestionDetail();
  }, []);

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
    });
  };
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

  return (
    <div className="bg-[#131F23] h-full overflow-auto">
      <div className="h-[70vh] w-[100vw]">{handleLesson(question!)}</div>
      <div
        className="bg-[#131F23] border-[#37464F] border-t-2 h-[20vh] w-[100vw] relative"
        // style={{ background: isNext ? "#202F36" : "" }}
      >
        {isNext && isButtonCorrect && <FooterStatus type={0} />}
        {isNext && !isButtonCorrect && <FooterStatus type={1} />}
        {!isNext && isRetry && <FooterStatus type={2} />}
        <TestContinueButton
          isSubmit={isSubmit}
          setIsSubmit={setIsSubmit}
          setIsNext={setIsNext}
          isButtonActivate={isButtonActivate}
          isButtonCorrect={isButtonCorrect}
          hoverColor="4156FF"
          paddingWidth={80}
          positionRight={250}
          type="admin-learn" //Nếu type learn thì navigate về home, nếu review navigate về review
        />
      </div>
    </div>
  );
};

export default AdminTestLessonPage;
