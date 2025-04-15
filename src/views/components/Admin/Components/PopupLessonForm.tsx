import React, { useEffect, useState } from "react";
import { CRUDType } from "../../../../enums/CRUDType";
import { ILessonValue } from "../../../../interfaces/Course";

interface PopupLessonFormProps {
  mode: CRUDType;
  onCancel: () => void;
  onCreate: (title: string, xpEarned: string) => void;
  errorMessage?: string;
  isSuccess?: boolean;
  lesson?: ILessonValue | null;
}

const PopupLessonForm: React.FC<PopupLessonFormProps> = ({
  mode,
  onCancel,
  onCreate,
  errorMessage,
  isSuccess,
  lesson,
}) => {
  const [title, setTitle] = useState("");
  const [xpEarned, setXpEarned] = useState("");

  useEffect(() => {
    if (lesson) {
      setTitle(lesson.title);
      setXpEarned(lesson.xpEarned.toString());
    }
  }, [lesson]);

  const formTitle =
    mode === CRUDType.CREATE ? "Create New Lesson" : "Edit Lesson";
  const buttonText = mode === CRUDType.CREATE ? "Create" : "Update";

  const successMessage =
    mode === CRUDType.CREATE
      ? "ADD NEW LESSON SUCCESSFULLY"
      : "UPDATE LESSON SUCCESSFULLY";

  return (
    <div
      className="flex flex-col gap-6 items-center w-[600px] h-full"
      style={{ padding: "20px" }}
    >
      <h2 className="text-2xl font-bold">{formTitle}</h2>
      <div className="w-full flex flex-col gap-2">
        <span>Enter lesson name</span>
        <input
          type="text"
          className="border border-gray-300 w-full rounded"
          style={{ padding: "10px" }}
          placeholder="Ex: Lesson 1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <span>Enter XP earned</span>
        <input
          type="text"
          className="border border-gray-300 w-full rounded"
          style={{ padding: "10px" }}
          placeholder="Ex: 100"
          value={xpEarned}
          onChange={(e) => setXpEarned(e.target.value)}
        />
      </div>
      {isSuccess ? (
        <span className="font-bold text-green-500">{successMessage}</span>
      ) : errorMessage ? (
        <span className="font-bold text-red-500">{errorMessage}</span>
      ) : null}
      <div className="flex gap-4 w-full">
        <button
          className="bg-red-500 rounded-xl border-2 border-red-700 text-white w-[50%] cursor-pointer hover:bg-red-400 active:translate-y-0.5 transition duration-200 ease-in-out"
          style={{ padding: "10px", boxShadow: "0 3px 0 0 #C10007" }}
          onClick={onCancel}
          onMouseDown={(e) => {
            e.currentTarget.style.boxShadow = "0 0 0 0 #C10007";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.boxShadow = "0 3px 0 0 #C10007";
          }}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500  rounded-xl border-2 border-blue-700 text-white w-[50%] cursor-pointer hover:bg-blue-400  active:translate-y-0.5 transition duration-200 ease-in-out"
          style={{ padding: "10px", boxShadow: "0 3px 0 0 #1447E6" }}
          onClick={() => onCreate(title, xpEarned)}
          onMouseDown={(e) => {
            e.currentTarget.style.boxShadow = "0 0 0 0 #1447E6";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.boxShadow = "0 3px 0 0 #1447E6";
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default PopupLessonForm;
