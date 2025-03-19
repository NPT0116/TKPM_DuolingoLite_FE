import LessonNode from "./LessonNode";
import { IDisplayUnit } from "../../../interfaces/Course";
import { motion } from "framer-motion";

const DisplayUnit: React.FC<IDisplayUnit> = ({
  type,
  title,
  lessonsList,
  lessonsInformation,
  lessonOrder,
}) => {
  const whiteIcon = [
    "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg",
    "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/7aa61c3f60bd961a60a46fb36e76c72f.svg",
    "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg",
    "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg",
    "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/fc078bfeb8d2d1b1146e9b17d8f12d8e.svg",
    "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/7aa61c3f60bd961a60a46fb36e76c72f.svg",
    "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/ef9c771afdb674f0ff82fae25c6a7b0a.svg",
  ];
  const grayIcon = [
    "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/cbb0e971ac10030a120848c71c419892.svg",
    "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/3ea75bf2164eed9218a7163be002af82.svg",
    "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/cbb0e971ac10030a120848c71c419892.svg",
    "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/cbb0e971ac10030a120848c71c419892.svg",
    "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/7ebf5ec1643d186b7edb283966329b2f.svg",
    "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/3ea75bf2164eed9218a7163be002af82.svg",
    "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/cbb0e971ac10030a120848c71c419892.svg",
  ];
  const template1 = {
    topColor: "58CC05",
    botColor: "47A30B",
    shadowColor: "72D627",
  };
  const template2 = {
    topColor: "04CD9C",
    botColor: "08A47D",
    shadowColor: "40D9B5",
  };
  const template3 = {
    topColor: "CE82FF",
    botColor: "A567CC",
    shadowColor: "D596FF",
  };
  const template4 = {
    topColor: "DC8F47",
    botColor: "B07238",
    shadowColor: "E3A56C",
  };
  const template5 = {
    topColor: "1CB0F6",
    botColor: "198CC5",
    shadowColor: "44BEF8",
  };
  const layout1 = ["0", "40", "80", "40", "0"];
  const layout2 = ["0", "-40", "-80", "-40", "0"];
  const layouts = [layout1, layout2];
  const templates = [template1, template2, template3, template4, template5];
  const getRandomTemplate = () => {
    const randomIndex = Math.floor(Math.random() * templates.length);
    return templates[randomIndex];
  };
  const randomTemplate = getRandomTemplate();
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-8 font-bold">
      <div
        className="w-[90%] h-[100px] flex justify-between items-center rounded-2xl"
        style={{
          backgroundColor: `#${randomTemplate.topColor}`,
          padding: "0px 40px",
          marginTop: "20px",
        }}
      >
        <div className="flex flex-col justify-start items-start">
          <span className="text-md">Part 2, Gate 31</span>
          <span className="text-xl"> {title}</span>
        </div>
        <div
          className="border-2 border-b-4  rounded-2xl hover:opacity-80 flex justify-between items-center gap-4 cursor-pointer"
          style={{
            padding: "12px 10px",
            borderColor: `#${randomTemplate.botColor}`,
          }}
        >
          <img
            src="https://d35aaqx5ub95lt.cloudfront.net/images/path/5b531828e59ae83aadb3d88e6b3a98a8.svg"
            alt="Tutorial"
          />
          HƯỚNG DẪN
        </div>
      </div>
      <div
        className="text-white font-bold w-full  flex flex-row justify-center items-center"
        style={{ padding: "0px 40px" }}
      >
        <hr className="border-[#52656D] border-[1px] w-full rounded-full" />
        <span className="w-full text-center" style={{ padding: "0px 10px" }}>
          {title}
        </span>
        <hr className="border-[#52656D] border-[1px] w-full rounded-full" />
      </div>
      {lessonsInformation
        ?.slice()
        .sort((a, b) => a.order - b.order)
        .map((item, index) => (
          <div key={item.id} className="relative">
            {lessonOrder == item.order && (
              <motion.div
                className={`absolute top-[-80px] left-[-10px] whitespace-nowrap rounded-2xl border-2 border-[#37464F] bg-[#131F23]`}
                style={{
                  color: `#${randomTemplate.shadowColor}`,
                  padding: "10px 10px 15px 10px",
                }}
                animate={{
                  y: [0, -4, -6, -4, 0],
                }}
                transition={{
                  duration: 1, // Chạy chậm trong 5 giây
                  repeat: Infinity,
                  ease: "easeInOut",
                  type: "tween",
                }}
              >
                <div className="relative">
                  <div>
                    <span>BẮT ĐẦU</span>
                  </div>
                  <div
                    className="w-4 h-4 bg-[#131F23] border-l-2 border-t-2 border-[#37464F] absolute bottom-[-25px] left-[25px]"
                    style={{
                      transform: "rotate(-135deg)",
                      marginTop: "20px",
                    }}
                  />
                </div>
              </motion.div>
            )}
            <LessonNode
              lessonInformation={item}
              topColor={randomTemplate.topColor}
              botColor={randomTemplate.botColor}
              shadowColor={randomTemplate.shadowColor}
              transX={layouts[type][index]}
              isEnable={lessonOrder == item.order}
              isFinished={lessonOrder > item.order}
              whiteIcon={whiteIcon[index]}
              grayIcon={grayIcon[index]}
            />
          </div>
        ))}
    </div>
  );
};
export default DisplayUnit;
