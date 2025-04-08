import TropySvg from "../../components/Svg/TropySvg";

interface ICourseProgressBar {
  currentLesson: number;
  totalLesson: number;
}
const CourseProgressBar: React.FC<ICourseProgressBar> = ({
  currentLesson,
  totalLesson,
}) => {
  return (
    <div className="w-full h-full flex items-center">
      <div className="relative w-[85%] h-[20px]">
        <div className="relative w-full h-full bg-[#CC5099] rounded-full">
          <div
            className="absolute top-0 left-0 w-full h-full bg-[#FF8ACF] rounded-full"
            style={{
              width: `${(currentLesson! / totalLesson!) * 100}%`,
            }}
          >
            <div className="absolute left-1/2 -translate-x-1/2 w-[90%] h-[15%] top-1/2 -translate-y-[5px] bg-[#FFA2D9] rounded-full"></div>
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
