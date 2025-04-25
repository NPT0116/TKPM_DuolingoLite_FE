/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import StepButton from "../../components/Admin/Components/StepButton";
import CourseProgressBar from "./CourseProgressBar";
import { ICourseInfoCardTemplate } from "../../../interfaces/Course";

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
  courseInfoCardTemplate: ICourseInfoCardTemplate;
}
const CourseInfoCard: React.FC<ICourseInfoCard> = ({
  currentLesson,
  totalLesson,
  courseName,
  isBlock,
  onClick,
  courseInfoCardTemplate,
}) => {
  const handleCurrentLesson = () => {
    return currentLesson;
    // return currentLesson ===
    //   (parseInt(localStorage.getItem("prevLessonOrder") || "0", 10) ?? 0)
    //   ? currentLesson
    //   : currentLesson - 1 > 0
    //   ? currentLesson - 1
    //   : 0;
  };
  if (currentLesson === 0) {
    isBlock = true;
  }

  return (
    <div
      className="w-full h-[35vh] flex flex-row justify-between  flex-shrink-0  rounded-2xl"
      style={{
        padding: "20px",
        background:
          currentLesson === 0
            ? "#3C4346"
            : courseInfoCardTemplate
            ? courseInfoCardTemplate.courseColor
            : "#FFFFFF",
      }}
      css={isBlock ? blockCss : css``}
    >
      {/* Manipulation */}
      <div className="w-1/2 h-full ">
        <div className="w-full h-1/2 text-xl ">
          {/* Course title */}
          <div className="w-full h-1/2 flex items-center">{courseName}</div>
          {/* Course Progress Bar*/}
          <div className="w-full h-1/2 flex items-center">
            {!isBlock ? (
              <CourseProgressBar
                courseInfoCardTemplate={courseInfoCardTemplate}
                currentLesson={handleCurrentLesson()}
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
          <StepButton
            onClick={onClick}
            content={
              currentLesson === 0
                ? "ĐĂNG KÝ"
                : currentLesson === totalLesson
                ? "ÔN"
                : "HỌC"
            }
            width="90%"
            bgColor={currentLesson === 0 ? "#3C4346" : "#FFFFFF"}
            textColor={
              currentLesson === 0 ? "white" : courseInfoCardTemplate.courseColor
            }
            borderColor={currentLesson === 0 ? "#50575A" : "lightgray"}
          />
        </div>
      </div>
      {/* Image Decoration */}
      <div className="w-1/3 h-full ">
        <img
          className="w-full h-full"
          src={
            courseInfoCardTemplate
              ? courseInfoCardTemplate.courseImageUrl
              : "https://d35aaqx5ub95lt.cloudfront.net/images/pathSections/unlocked/d335d1f15869241c02a03a52abd842e4.svg"
          }
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
