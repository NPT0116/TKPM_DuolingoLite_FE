interface AchievementNotifyProps {
  title: string;
  message: string;
}

const AchievementNotify: React.FC<AchievementNotifyProps> = ({
  title,
  message,
}) => {
  return (
    <li className="cursor-pointer rounded-xl">
      <div
        className="bg-[#FFCC00]  hover:bg-[#ffd635] transition-colors ease-in-out flex rounded-xl relative"
        style={{ padding: "10px" }}
      >
        <img
          src="https://blog.duolingo.com/content/images/2023/07/Bea_HuggingDuo@.5x-2.png"
          alt=""
          className="w-[100px] object-contain absolute top-[-12px]"
        />
        <div
          className="w-[80%] border-[#b28e00] bg-white/20 border-2 h-fit p-4 rounded-2xl relative text-[#1F1F1F]"
          style={{ padding: "10px", marginLeft: "22%" }}
        >
          {/* Title */}
          <h2
            className="flex gap-1 text-[22px] text-[#b28e00] border-b-3 border-[#b28e00] w-fit"
            style={{ marginBottom: "5px" }}
          >
            {title.length !== 0 ? title : "Bạn đã hoàn thành khoá học 1."}
          </h2>
          <span className="font-semibold">
            {" "}
            {message.length !== 0 ? message : "Hãy tiếp tục cố gắng nào"}
          </span>
        </div>
      </div>
    </li>
  );
};

export default AchievementNotify;
