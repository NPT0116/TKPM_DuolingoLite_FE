/** @jsxImportSource @emotion/react */
import LessonNode from "../../components/LearnPage/LessonNode";

import { css } from "@emotion/react";

const LearnPage: React.FC = () => {
  return (
    <div className="w-full h-full flex gap-4">
      <div className="w-3/5 h-full">
        <div
          className="w-ful h-full flex flex-col justify-center items-center gap-8"
          style={{ paddingTop: "20px" }}
        >
          <LessonNode
            mainColor="47A30B"
            bgColor="58CC05"
            shadowColor="72D627"
            transX="0"
          />
          <LessonNode
            mainColor="47A30B"
            bgColor="58CC05"
            shadowColor="72D627"
            transX="40"
          />
          <LessonNode
            mainColor="47A30B"
            bgColor="58CC05"
            shadowColor="72D627"
            transX="80"
          />
          <LessonNode
            mainColor="47A30B"
            bgColor="58CC05"
            shadowColor="72D627"
            transX="40"
          />
          <LessonNode
            mainColor="47A30B"
            bgColor="58CC05"
            shadowColor="72D627"
            transX="0"
          />
          <LessonNode
            mainColor="47A30B"
            bgColor="58CC05"
            shadowColor="72D627"
            transX="0"
          />
        </div>
      </div>
      <div className="w-2/5 h-full bg-amber-300 ">Hello</div>
    </div>
  );
};
export default LearnPage;
