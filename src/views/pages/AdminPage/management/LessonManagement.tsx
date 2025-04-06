import { useEffect, useState } from "react";
import StepButton from "../../../components/Admin/Components/StepButton";
import { ICourseValue, ILessonValue } from "../../../../interfaces/Course";
import { useNavigate } from "react-router-dom";
import { getQuestionDetail } from "../../../../services/Question/getQuestionDetailService";
import { IQuestion } from "../../../../interfaces/IQuestion";
import QuizOption from "./PreviewQuestion/QuestionChoice";
import PreviewQuestion from "./PreviewQuestion/PreviewQuestion";
interface ILessonManagement {
  onBack?: () => void;
  selectedCourse?: ICourseValue | null;
  selectedLesson?: ILessonValue | null;
}
const LessonManagement: React.FC<ILessonManagement> = ({
  onBack,
  selectedCourse,
  selectedLesson,
}) => {
  // Handle content
  const [mode, setMode] = useState(0);
  const handelSetMode = (mode: number) => {
    setMode(mode);
  };
  const handleSetPrevMode = () => {
    setMode(0);
  };
  const modeOneCss = {
    width: "90vw",
    height: "90vh",
  };
  // Fetch QuestionList
  const [questionList, setQuestionList] = useState<IQuestion[]>([]);
  useEffect(() => {
    const tempList: IQuestion[] = [];
    if (mode == 1) {
      setQuestionList([]);
      // console.log(selectedCourse);
      // console.log(selectedLesson);
      const fetchLesson = async () => {
        console.log("Fetching Question !");
        if (selectedLesson) {
          for (let i = 1; i <= selectedLesson.questionCount; i++) {
            const { data } = await getQuestionDetail(selectedLesson.id, i);
            if (data) {
              setQuestionList((prev) => [...prev, data]);
            }
          }
        }
      };
      fetchLesson();
    }
  }, [mode]);

  //  Handle Add Quiz
  const navigate = useNavigate();
  const handleClick = (type: string) => {
    const url = `/admin/course/${selectedCourse?.id}/lesson/${selectedLesson?.id}/${type}`;
    navigate(url);
    // alert(url);
  };

  return (
    <div
      className="w-[600px] h-[500px] bg-white rounded-xl transition-all duration-300"
      style={mode == 1 ? modeOneCss : {}}
    >
      <div
        className="w-full h-1/7 border-b-2 border-[#E5E5E5] flex justify-between items-center "
        style={{ padding: "20px" }}
      >
        <img
          onClick={handleSetPrevMode}
          src="https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/e013fd27fc6bd1d2fea85fe707b615cd.svg"
          className="invert cursor-pointer"
          alt=""
        />
        <img
          onClick={onBack}
          className="cursor-pointer hover:opacity-80"
          src="https://schools-cdn.duolingo.com/images/820ea64de9b060e534c11110cd80b7fd.svg"
          alt="CancelAddQuiz"
        />
      </div>
      <div className="w-full h-6/7">
        {/* Home */}
        {mode == 0 && (
          <div className="w-full h-6/7  flex  flex-col justify-start items-center gap-4">
            <div
              className="w-full  font-bold text-2xl text-center"
              style={{ padding: "60px" }}
            >
              {selectedLesson?.title} Management
            </div>
            <div className="h-[80px] w-full  flex justify-center items-center">
              <StepButton
                content="Preview Quiz"
                width="50%"
                onClick={() => handelSetMode(1)}
              />
            </div>
            <div className="h-[80px] w-full flex justify-center items-center">
              <StepButton
                content="Add Quiz"
                width="50%"
                onClick={() => handelSetMode(2)}
              />
            </div>
          </div>
        )}
        {mode == 1 && (
          <PreviewQuestion
            title={selectedLesson?.title}
            questionList={questionList}
          />
        )}
        {/* Add Quiz */}
        {mode == 2 ? (
          <div className="h-6/7 items-center flex flex-col justify-start ">
            <div
              className="w-full font-bold text-2xl text-center"
              style={{ padding: "50px 0" }}
            >
              Choose Type of Quiz
            </div>
            <div className="w-[400px] h-[200px] grid grid-cols-2 grid-rows-2 gap-4 ">
              <StepButton
                content="Multiple Choice"
                width="100%"
                onClick={() => handleClick("multiple-choice")}
              />
              <StepButton
                content="Build Sentence"
                width="100%"
                onClick={() => handleClick("build-sentence")}
              />
              <StepButton
                content="Matching"
                width="100%"
                onClick={() => handleClick("matching")}
              />
              <StepButton
                content="Pronunciation"
                width="100%"
                onClick={() => handleClick("pronunciation")}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default LessonManagement;
