import { ICourseValue, ILessonValue } from "../../../../../interfaces/Course";
import { IQuestion } from "../../../../../interfaces/IQuestion";
import StepButton from "../../../../components/Admin/Components/StepButton";

interface IPopupDelete {
  title: string;
  course?: ICourseValue;
  lesson?: ILessonValue;
  question?: IQuestion;
  onCancel: () => void;
  onDelete: () => void;
  errorMessage?: string;
  isDeleteSuccess?: boolean;
}

const PopupDelete: React.FC<IPopupDelete> = ({
  title,
  course,
  lesson,
  question,
  onDelete,
  onCancel,
  errorMessage,
  isDeleteSuccess,
}) => {
  return (
    <div className="w-full h-full" style={{ padding: "30px" }}>
      <div className="w-full h-full flex flex-col justify-center items-center gap-8 rounded-xl ">
        <div className="font-semibold text-xl"> {title}</div>
        {course && (
          <div
            className="border-1 border-dashed rounded-xl flex flex-col gap-2"
            style={{ padding: "10px" }}
          >
            <div className="font-bold text-xl">{course?.name}</div>
            <div>Level: {course?.level}</div>
            <div>Lessons: {course?.lessons.length}</div>
          </div>
        )}
        {/* {question && (
          <div className="text-xl font-semibold">{question.type}</div>
        )} */}

        <div className="w-full flex justify-center gap-2">
          <StepButton
            content="OK"
            bgColor="green"
            textColor="white"
            onClick={onDelete}
          />
          <StepButton
            content="CANCEL"
            bgColor="red"
            textColor="white"
            onClick={onCancel}
          />
        </div>
        {isDeleteSuccess ? (
          <span className="font-bold text-green-500 text-[18px]">
            Delete successfully
          </span>
        ) : (
          errorMessage && (
            <span className="font-bold text-red-500">{errorMessage}</span>
          )
        )}
      </div>
    </div>
  );
};
export default PopupDelete;
