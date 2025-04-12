/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import StepButton from "../../components/Admin/Components/StepButton";
import CourseProgressBar from "./CourseProgressBar";

const blockCss = css`
  background: #202f36 !important;
  color: #52656d !important;
`;
interface ICourseInfoCard {
  currentLesson: number;
  totalLesson: number;
  courseName?: string;
  isBlock?: boolean;
  onClick?: () => void;
}
const CourseInfoCard: React.FC<ICourseInfoCard> = ({
  currentLesson,
  totalLesson,
  courseName,
  isBlock,
  onClick,
}) => {
  return (
    <div
      className="w-full h-[35vh] flex flex-row  flex-shrink-0 bg-[#FF64BF] rounded-2xl"
      style={{ padding: "20px" }}
      css={isBlock ? blockCss : css``}
    >
      {/* Manipulation */}
      <div
        className="w-1/2 h-full "
        css={
          isBlock
            ? css``
            : css`
                background: #ff64bf;
              `
        }
      >
        <div className="w-full h-1/2 text-xl ">
          {/* Course title */}
          <div className="w-full h-1/2 flex items-center">{courseName}</div>
          {/* Course Progress Bar*/}
          <div className="w-full h-1/2 flex items-center">
            {!isBlock ? (
              <CourseProgressBar
                currentLesson={currentLesson}
                totalLesson={totalLesson}
              />
            ) : (
              <div className="text-lg flex flex-row gap-2 font-semibold">
                <img
                  src="https://d35aaqx5ub95lt.cloudfront.net/images/pathSections/9c687212a67b628264f79eb296be7967.svg"
                  alt=""
                />
                {totalLesson} bài học
              </div>
            )}
          </div>
        </div>
        <div className="w-full h-1/2 flex justify-start items-end ">
          {!isBlock ? (
            <StepButton
              onClick={onClick}
              content={currentLesson === totalLesson ? "ÔN" : "HỌC"}
              width="90%"
              bgColor="#FFFFFF"
              textColor="#FF64BF"
              borderColor="#EFC0DA"
            />
          ) : null}
        </div>
      </div>
      {/* Image Decoration */}
      <div className="w-1/2 h-full ">
        <img
          className="w-full h-full"
          src="https://d35aaqx5ub95lt.cloudfront.net/images/pathSections/unlocked/d335d1f15869241c02a03a52abd842e4.svg"
          alt=""
          css={
            isBlock
              ? css`
                  filter: grayscale(100%) brightness(50%) opacity(50%);
                `
              : css``
          }
        />
      </div>
    </div>
  );
};
export default CourseInfoCard;
