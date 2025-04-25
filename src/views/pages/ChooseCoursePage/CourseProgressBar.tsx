import { ICourseInfoCardTemplate } from "../../../interfaces/Course";
import TropySvg from "../../components/Svg/TropySvg";
import { darken } from "polished";

interface ICourseProgressBar {
  currentLesson: number;
  totalLesson: number;
  courseInfoCardTemplate: ICourseInfoCardTemplate;
}
const CourseProgressBar: React.FC<ICourseProgressBar> = ({
  currentLesson,
  totalLesson,
  courseInfoCardTemplate,
}) => {
  return (
    <div className="w-full h-full flex items-center">
      <div className="relative w-[85%] h-[20px]">
        <div
          className="relative w-full h-full bg-[#131F23] rounded-full"
          style={{
            background: darken(0.25, courseInfoCardTemplate.courseColor),
          }}
        >
          <div
            className="absolute top-0 left-0 w-full h-full bg-[#181818] rounded-full"
            style={{
              width: `${(currentLesson! / totalLesson!) * 100}%`,
              background: darken(0.1, courseInfoCardTemplate.courseColor),
            }}
          >
            <div className="absolute left-1/2 -translate-x-1/2 w-[90%] h-[15%] top-1/2 -translate-y-[5px] bg-[#c4c4c458] rounded-full"></div>
          </div>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-sm text-white">
          {`${currentLesson}/${totalLesson}`}
        </div>
      </div>
      <div>
        <TropySvg />
      </div>
    </div>
  );
};
export default CourseProgressBar;
