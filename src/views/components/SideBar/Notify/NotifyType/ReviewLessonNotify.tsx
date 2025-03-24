interface ReviewLessonNotifyProps {
  title: string;
  message: string;
}

const ReviewLessonNotify: React.FC<ReviewLessonNotifyProps> = ({
  title,
  message,
}) => {
  return (
    <li className="  cursor-pointer rounded-xl">
      <div
        className="bg-[white]  hover:bg-[#f2f2f2] transition-colors ease-in-out flex rounded-xl"
        style={{ padding: "10px" }}
      >
        <img
          src="https://design.duolingo.com/215f9f8714df8f7de63c.svg"
          alt=""
          className="w-[100px]"
        />
        <div
          className="border-[#7fc91e] bg-white/20 border-2 h-fit p-4 rounded-2xl relative text-[#1F1F1F]"
          style={{ padding: "10px" }}
        >
          {/* Title */}
          <h2
            className="flex gap-1 text-[22px] text-[#44910a] border-b-3 border-[#95D346] w-fit"
            style={{ marginBottom: "5px" }}
          >
            {title.length !== 0 ? title : "Bạn cần review bài học !"}
          </h2>
          <span className="font-semibold">
            {" "}
            {message.length !== 0 ? message : "Hãy review lại bài học cũ nào."}
          </span>
        </div>
      </div>
    </li>
  );
};

export default ReviewLessonNotify;
