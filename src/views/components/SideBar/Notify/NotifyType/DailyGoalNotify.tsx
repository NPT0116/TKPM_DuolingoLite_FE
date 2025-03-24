import duo_icon_run from "../../../../../assets/icons/ic_duo_run.png";

interface DailyGoalNotifyProps {
  title: string;
  message: string;
}

const DailyGoalNotify: React.FC<DailyGoalNotifyProps> = ({
  title,
  message,
}) => {
  return (
    <li className="  cursor-pointer rounded-xl">
      <div
        className="bg-[#FF4C4B]  hover:bg-[#FF4C4B] transition-colors ease-in-out flex rounded-xl"
        style={{ padding: "10px 10px 10px 0" }}
      >
        <img src={duo_icon_run} alt="" className="w-[150px]" />
        <div
          className=" h-fit p-4 rounded-2xl relative text-[white]"
          style={{ padding: "10px" }}
        >
          {/* Title */}
          <h2
            className="flex gap-1 text-[22px] text-[white]  w-fit"
            style={{ marginBottom: "5px" }}
          >
            {title.length !== 0 ? title : "Bạn còn bài tập hôm nay chưa làm"}
          </h2>
          {message.length !== 0 ? message : "Hãy cố lên nào bạn tôi ơi"}
        </div>
      </div>
    </li>
  );
};

export default DailyGoalNotify;
