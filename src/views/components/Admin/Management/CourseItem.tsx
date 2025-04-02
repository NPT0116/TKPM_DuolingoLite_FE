import { ChangeEventHandler } from "react";
import { ICourseValue } from "../../../../interfaces/Course";

interface ICourseItem {
  courseName: string;
  courseLevel: number;
  onClick?: () => void;
}
const CourseItem: React.FC<ICourseItem> = ({
  courseName,
  courseLevel,
  onClick,
}) => {
  return (
    <div
      className="group w-full rounded-xl flex flex-row items-center gap-4 bg-[#F7F7F7] text-[#AFAFAF] text-bold border-1 border-black hover:scale-102 
               hover:bg-[#DDF4FF] hover:text-[#1CB0F6] hover:border-[#1CB0F6]  
                 cursor-pointer transition-all duration-200"
      style={{ padding: "20px" }}
      onClick={onClick}
    >
      <div
        className="border-2 border-b-4 border-gray-400 rounded-xl group-hover:border-[#1CB0F6]"
        style={{ padding: "18px" }}
      >
        <img
          className="w-8 filter invert"
          src="https://d35aaqx5ub95lt.cloudfront.net/images/path/5b531828e59ae83aadb3d88e6b3a98a8.svg"
          alt="CourseItemsIcon"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-bold text-xl">Course: {courseName}</span>
        <span className="font-semibold text-lg ">Level: {courseLevel}</span>
      </div>
    </div>
  );
};
export default CourseItem;
