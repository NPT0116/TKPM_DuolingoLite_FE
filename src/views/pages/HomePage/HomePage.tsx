/** @jsxImportSource @emotion/react */
import DisplayUnit from "../../components/LearnPage/DisplayUnit";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ICourse, ILesson } from "../../../interfaces/Course";

const scrollContainerStyle = css`
  scrollbar-width: 0px;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const HomePage: React.FC = () => {
  const [data, setData] = useState<ICourse | null>(null);
  useEffect(() => {
    axios
      .get("/mock_datas/course.json")
      .then((response) => {
        setData(response.data.value[0]);
      })
      .catch((error) => {
        console.error("Error fetching the mock data:", error);
      });
  }, []);
  return (
    <div
      className="w-full h-full flex justify-between"
      css={scrollContainerStyle}
    >
      <div className="w-3/5 h-full overflow-auto" css={scrollContainerStyle}>
        <DisplayUnit title={data?.name} type={1} lessons={data?.lessons} />
      </div>
      <div className="w-2/5 h-full">
        <div className="w-[95%] h-full flex flex-col">
          <div className="w-ful h-[12%]  flex justify-evenly items-center gap-10 ">
            <img
              src="https://static.wikia.nocookie.net/duolingo/images/5/59/American_flag.png"
              alt="america flag"
              width="40"
            />
            <div className="flex justify-center items-center gap-2">
              <img
                src="https://d35aaqx5ub95lt.cloudfront.net/images/icons/398e4298a3b39ce566050e5c041949ef.svg"
                alt="streaking icon"
              />
              <span className="text-[#FFAB32] font-bold">123</span>
            </div>
          </div>
          <div
            className="flex flex-col border-2 border-[#37464f] rounded-2xl gap-4"
            style={{ padding: "25px 25px" }}
          >
            <div className="w-full flex justify-between">
              <span className=" font-bold text-white">Giải đấu Kim Cương</span>
              <span className=" font-bold text-[#50D3FF]">XEM GIẢI ĐẤU</span>
            </div>

            <div className="flex flex-row gap-8">
              <img
                src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/afe5c7067cd5fb7de936d3928ea7add6.svg"
                alt="Logo leaderboard"
              />
              <div className="flex flex-col justify-start items-start gap-2">
                <span className="font-bold">Bạn đã đạt vị trí thứ 8</span>
                <span className="font-medium text-[#DCE6EC]">
                  Tuần này bạn đã kiếm được tổng cộng 899 KN
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
