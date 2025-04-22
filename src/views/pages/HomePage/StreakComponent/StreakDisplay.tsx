/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { GetAllUser } from "../../../../services/User/GetAllUser";

const StreakBar: React.FC<{
  startDay: number;
  endDay: number;
  streakCount: number;
}> = ({ startDay, endDay, streakCount }) => {
  // const startDay = 3;
  // const endDay = 5;
  const bounceKeyframe = keyframes`
  0% {
    transform: translateX(${endDay * 2}px) scale(1.0);
  }
  50% {
    transform: translateX(${endDay * 2}px) scale(1.1);
  }
  100% {
    transform: translateX(${endDay * 2}px) scale(1.0);
  }
  `;
  const bounceEffect = css`
    animation: ${bounceKeyframe} infinite ease-in-out 1s;
    transform: translateX(${endDay * 2}px);
  `;
  const dayElements = Array.from({ length: 6 }, (_, i) =>
    startDay <= i && i < endDay ? (
      startDay === i ? (
        <div
          key={i}
          className="relative bg-[#FFC700] rounded-tl-full rounded-bl-full"
        >
          <div className="absolute top-0 right-0 w-[50px] h-full translate-x-1/2  bg-[#FFC700]"></div>
        </div>
      ) : (
        <div key={i} className=" relative bg-[#FFC700]">
          <div className="absolute top-0 right-0 w-[50px] h-full translate-x-1/2  bg-[#FFC700]"></div>
        </div>
      )
    ) : i < endDay ? (
      <div key={i}></div>
    ) : null
  );
  // console.log(dayElements);
  return (
    <div
      className="group-hover:flex hidden flex-col gap-4 border-[#37464F] bg-[#CC7900] border-2 rounded-2xl absolute top-[6%] left-0  w-full h-[50%] "
      style={{ padding: "20px 20px" }}
    >
      <div className="w-full h-3/5 flex flex-row justify-between items-center">
        <div className="flex flex-col gap-4">
          <div className="relative rounded-lg w-[130px]">
            <img
              className="rounded-lg w-[130px]"
              src="https://d35aaqx5ub95lt.cloudfront.net/images/streakCalendar/81798cd857d4b3d5ea0fe1c690b35542.svg"
              alt=""
            />
            <span className="absolute text-sm font-medium text-[#CC7900] top-0 h-full w-full flex items-center justify-center">
              HỘI STREAK
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="font-bold text-white text-2xl">
              {streakCount} ngày streak
            </div>
            <div className="font-medium text-white">
              Hãy tiếp tục duy trì nhé !
            </div>
          </div>
        </div>
        <div>
          <img
            src="https://d35aaqx5ub95lt.cloudfront.net/images/streakCalendar/a72349d80ba9da4368853a3446f93530.svg"
            alt="Streaking fire"
            width={80}
          />
        </div>
      </div>

      <div
        className="w-full h-2/5 flex flex-col gap-2 justify-between items-center bg-[#131F23] rounded-xl "
        style={{ padding: "10px 30px" }}
      >
        <div
          id="weekday"
          className="w-[95%] flex justify-between grid-rows-1 text-[#52656D] font-bold"
        >
          <span className="">CN</span>
          <span className="">T2</span>
          <span className="">T3</span>
          <span className="">T4</span>
          <span className="">T5</span>
          <span className="">T6</span>
          <span className="">T7</span>
        </div>
        <div className="grid grid-cols-7 grid-rows-1 relative w-[98%] h-[30px] bg-[#24373d] rounded-full ">
          {dayElements}
          <div className=" relative   rounded-full">
            <img
              className="absolute  left-0 -translate-y-[8px]"
              src="https://d35aaqx5ub95lt.cloudfront.net/images/9bc1ecdcce604a51d3fa208e7916d749.svg"
              alt="Streaking fire"
              width={37}
              css={bounceEffect}
            />
          </div>

          {/* <div className="relative rounded-full bg-[#131F23]">
            {" "}
            <div className="absolute rounded-full w-1/2 h-full bg-green-100 left-0 top-0"></div>
            <img
              className="-translate-y-[8px] translate-x-[7px]"
              src="https://d35aaqx5ub95lt.cloudfront.net/images/9bc1ecdcce604a51d3fa208e7916d749.svg"
              alt="Streaking fire"
              width={36}
              css={bounceEffect}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default StreakBar;
