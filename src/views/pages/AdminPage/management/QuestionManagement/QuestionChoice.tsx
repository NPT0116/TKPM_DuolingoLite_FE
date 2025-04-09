/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

interface IQuizOption {
  index: number;
  type: string;
  onClick?: () => void;
}

const QuestionChoice: React.FC<IQuizOption> = ({ index, type, onClick }) => {
  return (
    <div
      tabIndex={0}
      onClick={onClick}
      className="w-full h-[70px] transition-all duration-200 rounded-lg bg-gray-200 border-gray-300
                 active:translate-y-[1px]  active:border-b-1 border-1 border-b-3 
               hover:bg-[#DDF4FF] hover:text-[#1CB0F6] hover:border-[#1CB0F6]
               focus:bg-[#DDF4FF] focus:text-[#1CB0F6] focus:border-[#1CB0F6]
                
                cursor-pointer flex justify-start items-center gap-4"
      style={{ padding: "10px" }}
    >
      <span
        className="font-bold border-1 border-inherit text-inherit rounded-sm"
        style={{ padding: "2px 5px" }}
      >
        {index}
      </span>
      <span className="w-fit font-semibold">{type}</span>
    </div>
  );
};
export default QuestionChoice;
