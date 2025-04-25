import React from "react";
import StepButton from "../../components/Admin/Components/StepButton";

interface CourseSuccessInfoCardProps {
  courseName?: string;
  onClick?: () => void;
}
const CourseSuccessInfoCard: React.FC<CourseSuccessInfoCardProps> = ({
  courseName,
  onClick,
}) => {
  return (
    <div
      className="w-full flex items-center justify-between border-2 border-[#37464F] rounded-xl z-1"
      style={{
        padding: "24px",
        backgroundImage: `
          repeating-linear-gradient(
            135deg,
            #202F36 0px,
            #202F36 140px,
            #131F24 140px,
            #131F24 200px
          )
        `,
        backgroundColor: "#131F24",
      }}
    >
      <div>
        <h1 className="font-bold text-[25px]" style={{ marginBottom: "15px" }}>
          {courseName}
        </h1>
        <div className="flex gap-4">
          <img
            src="https://d35aaqx5ub95lt.cloudfront.net/images/pathSections/967439e82332b81d93d4a8c0fa39f9e4.svg"
            alt="complete icon"
          />
          <span className="font-bold text-[15px] text-[#58CC02]">
            HOÀN THÀNH!
          </span>
        </div>
      </div>
      <div className="h-full flex items-center">
        <StepButton
          content="ÔN TẬP"
          textColor="#42ACDE"
          width="100px"
          borderColor="#313F47"
          bgColor="#131F23"
          z-index="10"
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default CourseSuccessInfoCard;
