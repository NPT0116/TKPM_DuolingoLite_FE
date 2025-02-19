/** @jsxImportSource @emotion/react */
import DisplayUnit from "../../components/LearnPage/DisplayUnit";
import { css } from "@emotion/react";

const LearnPage: React.FC = () => {
  return (
    <div className="w-full h-full flex gap-4">
      <div className="w-3/5 h-full overflow-auto">
        <DisplayUnit type={1} />
        <DisplayUnit type={2} />
        <DisplayUnit type={1} />
        <DisplayUnit type={2} />
      </div>
      <div className="w-2/5 h-full bg-amber-300 ">Hello</div>
    </div>
  );
};
export default LearnPage;
