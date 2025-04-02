import { useState } from "react";
import StepButton from "../../../components/Admin/Components/StepButton";
import { ICourseValue, ILessonValue } from "../../../../interfaces/Course";
interface IAddQuizPopup {
  onBack?: () => void;
  selectedCourse?: ICourseValue | null;
  selectedLesson?: ILessonValue | null;
}
const AddQuizPopup: React.FC<IAddQuizPopup> = ({
  onBack,
  selectedCourse,
  selectedLesson,
}) => {
  const handleClick = (type: string) => {
    const url = `/admin/course/${selectedCourse?.id}/lesson/${selectedLesson?.id}/${type}`;
    alert(url);
  };
  return (
    <div className="w-[600px] h-[500px] bg-white rounded-xl">
      <div
        className="w-full h-1/7 border-b-2 border-[#E5E5E5] flex justify-start items-center"
        style={{ padding: "20px" }}
        onClick={onBack}
      >
        <img
          className="cursor-pointer hover:opacity-80"
          src="https://schools-cdn.duolingo.com/images/820ea64de9b060e534c11110cd80b7fd.svg"
          alt="CancelAddQuiz"
        />
      </div>
      <div className="h-6/7   items-center flex flex-col justify-start">
        <div
          className="w-full font-bold text-2xl text-center"
          style={{ padding: "50px 0" }}
        >
          Choose Type of Quiz
        </div>
        <div className="w-[400px] h-[200px] grid grid-cols-2 grid-rows-2 gap-4">
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
    </div>
  );
};
export default AddQuizPopup;
