/** @jsxImportSource @emotion/react */
import DisplayUnit from "../../components/LearnPage/DisplayUnit";
import { css } from "@emotion/react";
const scrollContainerStyle = css`
  overflow-y: auto;
  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;

  /* WebKit */
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 5px;
    border: 2px solid #f1f1f1;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

const HomePage: React.FC = () => {
  return (
    <div className="w-full h-full flex gap-4">
      <div className="w-3/5 h-full overflow-auto">
        <DisplayUnit type={1} />
        <DisplayUnit type={2} />
        <DisplayUnit type={1} />
        <DisplayUnit type={2} />
      </div>
      <div className="w-2/5 h-full">
        <div className="w-full h-full flex flex-col gap-4">
          <div className="w-ful h-1/12  flex justify-evenly items-center gap-10 border-b-2 border-[#37464f]">
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
            className="flex flex-col border-2 border-[#37464f] rounded-3xl"
            style={{ padding: "10px 15px" }}
          >
            <span className="self-end font-bold text-[#50D3FF]">
              XEM GIẢI ĐẤU
            </span>
            <div className="flex flex-row gap-8">
              <img
                src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/afe5c7067cd5fb7de936d3928ea7add6.svg"
                alt="Logo leaderboard"
              />
              <div className="flex flex-col justify-start items-start gap-2">
                <span className="font-bold">Bạn đã đạt vị trí thứ 8</span>
                <span className="font-medium">
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
