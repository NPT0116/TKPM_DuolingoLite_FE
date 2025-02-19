import LessonNode from "./LessonNode";
import { css } from "@emotion/react";
interface IDisplayUnit {
  type: number;
}
const DisplayUnit: React.FC<IDisplayUnit> = ({ type }) => {
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
  const templates = [template1, template2, template3, template4, template5];
  const getRandomTemplate = () => {
    const randomIndex = Math.floor(Math.random() * templates.length);
    return templates[randomIndex];
  };

  const randomTemplate = getRandomTemplate();
  if (type == 1) {
    return (
      <div className="w-ful h-full flex flex-col justify-center items-center gap-8 font-bold">
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
            <span className="text-xl"> Talk about weather</span>
          </div>
          <div
            className="border-2 border-b-4  rounded-2xl hover:opacity-80 flex justify-between items-center gap-4"
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
          <span className="w-full text-center" style={{ padding: "0px 20px" }}>
            Talk about weather
          </span>
          <hr className="border-[#52656D] border-[1px] w-full rounded-full" />
        </div>

        <LessonNode
          topColor={randomTemplate.topColor}
          botColor={randomTemplate.botColor}
          shadowColor={randomTemplate.shadowColor}
          transX="0"
        />
        <LessonNode
          topColor={randomTemplate.topColor}
          botColor={randomTemplate.botColor}
          shadowColor={randomTemplate.shadowColor}
          transX="40"
        />
        <LessonNode
          topColor={randomTemplate.topColor}
          botColor={randomTemplate.botColor}
          shadowColor={randomTemplate.shadowColor}
          transX="80"
        />
        <LessonNode
          topColor={randomTemplate.topColor}
          botColor={randomTemplate.botColor}
          shadowColor={randomTemplate.shadowColor}
          transX="40"
        />
        <LessonNode
          topColor={randomTemplate.topColor}
          botColor={randomTemplate.botColor}
          shadowColor={randomTemplate.shadowColor}
          transX="0"
        />
        <LessonNode
          topColor={randomTemplate.topColor}
          botColor={randomTemplate.botColor}
          shadowColor={randomTemplate.shadowColor}
          transX="0"
        />
      </div>
    );
  }
  return (
    <div className="w-ful h-full flex flex-col justify-center items-center gap-8 font-bold">
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
          <span className="text-xl"> Talk about weather</span>
        </div>
        <div
          className="border-2 border-b-4  rounded-2xl hover:opacity-80 flex justify-between items-center gap-4"
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
        <span className="w-full text-center" style={{ padding: "0px 20px" }}>
          Talk about weather
        </span>
        <hr className="border-[#52656D] border-[1px] w-full rounded-full" />
      </div>

      <LessonNode
        topColor={randomTemplate.topColor}
        botColor={randomTemplate.botColor}
        shadowColor={randomTemplate.shadowColor}
        transX="0"
      />
      <LessonNode
        topColor={randomTemplate.topColor}
        botColor={randomTemplate.botColor}
        shadowColor={randomTemplate.shadowColor}
        transX="-40"
      />
      <LessonNode
        topColor={randomTemplate.topColor}
        botColor={randomTemplate.botColor}
        shadowColor={randomTemplate.shadowColor}
        transX="-80"
      />
      <LessonNode
        topColor={randomTemplate.topColor}
        botColor={randomTemplate.botColor}
        shadowColor={randomTemplate.shadowColor}
        transX="-40"
      />
      <LessonNode
        topColor={randomTemplate.topColor}
        botColor={randomTemplate.botColor}
        shadowColor={randomTemplate.shadowColor}
        transX="0"
      />
      <LessonNode
        topColor={randomTemplate.topColor}
        botColor={randomTemplate.botColor}
        shadowColor={randomTemplate.shadowColor}
        transX="0"
      />
    </div>
  );
};
export default DisplayUnit;
