import { IUserStats } from "../../../interfaces/Auth/IUserProfile";

interface StatisticSectionProps {
  userStats: IUserStats | null;
}

const StatisticSection: React.FC<StatisticSectionProps> = ({ userStats }) => {
  return (
    <div>
      <div className="text-[28px] font-bold">Thống kê</div>
      <div
        className="grid grid-cols-2 w-full gap-3 whitespace-nowrap "
        style={{ marginTop: "10px" }}
      >
        <div
          className="border-2 border-[#37464F] rounded-2xl h-[78px] flex items-start"
          style={{ padding: "15px 24px" }}
        >
          <img
            src={`${
              userStats?.longestStreak === 0
                ? "https://d35aaqx5ub95lt.cloudfront.net/images/icons/65b8a029d7a148218f1ac98a198f8b42.svg"
                : "https://d35aaqx5ub95lt.cloudfront.net/images/profile/8a6dca76019d059a81c4c7c1145aa7a4.svg"
            }`}
            alt=""
            className="w-[21px]"
            style={{ marginRight: "15px" }}
          />
          <div className="transition translate-y-[-6px]">
            <div
              className={`font-bold text-[20px] ${
                userStats?.longestStreak === 0 ? "text-[#52656D]" : ""
              }`}
            >
              {userStats?.longestStreak}
            </div>
            <div className="text-[#52656D] font-semibold text-[16px] ">
              Ngày streak
            </div>
          </div>
        </div>
        <div
          className="border-2 border-[#37464F] rounded-2xl h-[78px] flex items-start"
          style={{ padding: "15px 24px" }}
        >
          <img
            src={` ${
              userStats?.experiencePoint === 0
                ? "https://d35aaqx5ub95lt.cloudfront.net/images/profile/19ec3540a6f61850c006fe779299abfe.svg"
                : "https://d35aaqx5ub95lt.cloudfront.net/images/profile/01ce3a817dd01842581c3d18debcbc46.svg"
            }`}
            alt=""
            className="w-[21px]"
            style={{ marginRight: "15px" }}
          />
          <div className="transition translate-y-[-6px]">
            <div
              className={`font-bold text-[20px] ${
                userStats?.experiencePoint === 0 ? "text-[#52656D]" : ""
              }`}
            >
              {userStats?.experiencePoint}
            </div>
            <div className="text-[#52656D] font-semibold text-[16px]">
              Tổng điểm KN
            </div>
          </div>
        </div>
        <div
          className="border-2 border-[#37464F] rounded-2xl h-[78px] flex items-start"
          style={{ padding: "15px 24px" }}
        >
          <img
            src="	https://d35aaqx5ub95lt.cloudfront.net/images/leagues/0f2ec3b0ead032476829f47c4157a4fd.svg"
            alt=""
            className="w-[21px]"
            style={{ marginRight: "15px" }}
          />
          <div className="transition translate-y-[-6px] w-[80%]">
            <div className="font-bold text-[20px] text-[#52656D] overflow-hidden  whitespace-nowrap max-w-[full]">
              Chưa có xếp hạng
            </div>

            <div className="text-[#52656D] font-semibold text-[16px] overflow-hidden">
              Giải đấu hiện tại
            </div>
          </div>
        </div>
        <div
          className="border-2 border-[#37464F] rounded-2xl h-[78px] flex items-start w-full"
          style={{ padding: "15px 24px" }}
        >
          <img
            src="https://d35aaqx5ub95lt.cloudfront.net/images/profile/96e056d06fd492261f98901b53ccc256.svg"
            alt=""
            className="w-[21px]"
            style={{ marginRight: "15px" }}
          />
          <div className="transition translate-y-[-6px] w-full">
            <div className="font-bold text-[20px] text-[#52656D] overflow-hidden">
              0
            </div>
            <div className="text-[#52656D] font-semibold text-[16px] overflow-hidden max-w-[90%]">
              Số lần đạt top 3
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticSection;
