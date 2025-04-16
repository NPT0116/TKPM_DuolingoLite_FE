interface LessonFinishNotifyProps {
  title: string;
  message: string;
}

const LessonFinishNotify: React.FC<LessonFinishNotifyProps> = ({
  title,
  message,
}) => {
  return (
    <li className="cursor-pointer rounded-xl">
      <div
        className="bg-[#FFCC00]  hover:bg-[#ffd635] transition-colors ease-in-out duration-300 flex rounded-xl relative"
        style={{ padding: "10px" }}
      >
        <div
          className="w-[80%] border-[#b28e00] bg-white/20 border-2 h-fit p-4 rounded-2xl relative text-[#1F1F1F]"
          style={{ padding: "10px" }}
        >
          {/* Title */}
          <h2
            className="flex gap-1 text-[22px] text-[#b28e00] border-b-3 border-[#b28e00] w-fit"
            style={{ marginBottom: "5px" }}
          >
            {title.length !== 0 ? title : "Bạn đã hoàn thành bài học"}
          </h2>
          <span className="font-semibold">
            {" "}
            {message.length !== 0 ? message : "Hãy tiếp tục cố gắng nào"}
          </span>
        </div>
        <img
          src="https://design.duolingo.com/bbf046e54218c9eeb1e9.svg"
          alt=""
          className="w-[100px] object-contain absolute bottom-0 right-0"
        />
      </div>
    </li>
  );
};

export default LessonFinishNotify;
