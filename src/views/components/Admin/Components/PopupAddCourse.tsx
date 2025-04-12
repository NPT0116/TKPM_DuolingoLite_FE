// components/Admin/Components/PopupAddCourse.tsx
import React, { useState } from "react";

interface PopupAddCourseProps {
  onCancel: () => void;
  onCreate: (name: string) => void;
}

const PopupAddCourse: React.FC<PopupAddCourseProps> = ({
  onCancel,
  onCreate,
}) => {
  const [courseName, setCourseName] = useState("");

  return (
    <div
      className="flex flex-col gap-6 items-center w-[600px] h-full"
      style={{ padding: "20px" }}
    >
      <h2 className="text-2xl font-bold">Create New Course</h2>
      <div className="w-full flex flex-col gap-2">
        <span>Nhập tên khoá học</span>
        <input
          type="text"
          className="border border-gray-300 w-full rounded"
          style={{ padding: "10px" }}
          placeholder="VD: English for beginners"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
      </div>
      <div className="flex gap-4 w-full">
        <button
          className="bg-gray-400 px-4 py-2 rounded text-white w-[50%] cursor-pointer hover:bg-gray-500 transition duration-200 ease-in-out"
          style={{ padding: "10px" }}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 px-4 py-2 rounded text-white w-[50%] cursor-pointer hover:bg-blue-600  transition duration-200 ease-in-out"
          style={{ padding: "10px" }}
          onClick={() => onCreate(courseName)}
          disabled={!courseName.trim()}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default PopupAddCourse;
