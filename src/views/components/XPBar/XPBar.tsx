/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

interface IXPBar {
  accumulated: number;
  total: number;
}
const XPBar: React.FC<IXPBar> = ({ accumulated, total }) => {
  const effectCSS = css`
    width: ${(accumulated / total) * 100}%;
    transition: width 0.5s ease;
  `;
  return (
    <div className="relative w-[80%] h-[10vh] flex justify-end items-center translate-y-6">
      <div className="w-full flex flex-row justify-between gap-4 items-end">
        <Link to="/home" className="absolute -translate-x-[30px]">
          <img
            src="https://d35aaqx5ub95lt.cloudfront.net/images/df223d5b9feb8017b323ed21103eb5ac.svg"
            alt="Back to homepage button"
          />
        </Link>
        <div className="relative bg-[#37464F] w-full h-[15px] rounded-full">
          <div
            css={effectCSS}
            className="relative  bg-[#3B4EFF] rounded-full flex justify-center items-center"
            style={{ padding: "0px 10px 5px 10px", height: "100%" }}
          >
            <div className=" bg-[#6271FF] w-full h-1/5 top-[3px] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XPBar;
