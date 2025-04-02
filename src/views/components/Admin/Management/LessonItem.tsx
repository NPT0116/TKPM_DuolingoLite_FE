interface ILessonItem {
  lessonTitle: string;
  lessonQuestionCount: number;
  lessonEp: number;
  onClick?: () => void;
}
const LessonItem: React.FC<ILessonItem> = ({
  lessonTitle,
  lessonQuestionCount,
  lessonEp,
  onClick,
}) => {
  return (
    <div
      className="cursor-pointer  bg-[#1CB0F6] text-white w-[150px] h-[150px] 2xl:w-[200px] 2xl:h-[200px] flex flex-col justify-center items-start gap-2 rounded-xl border-3  border-[#168DC5]"
      style={{ padding: "20px 15px" }}
      onClick={onClick}
    >
      <div className="h-2/3  w-full font-bold 2xl:text-xl text-md">
        {lessonTitle}
      </div>
      <div className="h-1/3 w-full self-end ">
        <div className="font-semibold text-[#BBE7FC] text-sm">
          Questions: {lessonQuestionCount}
        </div>
        <div className="font-semibold text-[#BBE7FC] text-sm">
          XP: {lessonEp}
        </div>
      </div>
    </div>
  );
};
export default LessonItem;
