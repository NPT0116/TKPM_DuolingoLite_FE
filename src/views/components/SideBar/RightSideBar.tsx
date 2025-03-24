import { useEffect, useRef, useState } from "react";
import { getUserProfile } from "../../../services/Authentication/AuthService";
import { IUserProfile } from "../../../interfaces/Auth/IUserProfile";
import { useLocation, useNavigate } from "react-router-dom";
import Streaking from "../../pages/HomePage/StreakComponent/Streaking";
import Notify from "./Notify/Notify";

const RightSideBar: React.FC = () => {
  const [user, setUser] = useState<IUserProfile | null>(null);
  const location = useLocation();
  const fetched = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!fetched.current) {
      fetched.current = true; // Đánh dấu rằng API đã được gọi
      const fetchUserProfile = async () => {
        try {
          const userData = await getUserProfile();
          setUser(userData.value);
        } catch (err) {
          console.log("Failed to fetch user profile: " + err);
        }
      };

      fetchUserProfile();
    }
  }, []);

  return (
    <div
      className=" w-[368px] flex flex-col shrink-0  sticky top-[20px] gap-[20px] font-bold"
      style={{ marginTop: "20px" }}
    >
      <div className="w-full h-[12%]  flex justify-evenly items-center gap-10 max-h-[44px]">
        {/* America flag */}
        <div className="flex-1">
          {" "}
          <img
            src="https://static.wikia.nocookie.net/duolingo/images/5/59/American_flag.png"
            alt="america flag"
            className="w-auto h-[28px]"
          />
        </div>
        {/* Notification */}
        <Notify />
        {/* Streak */}
        <div className="flex flex-1 justify-center items-center gap-2">
          <Streaking streakNumber={user?.userStats.currentStreak} />
        </div>
        {/* XP */}
        <div className="flex flex-1 h-full items-center justify-center  text-[#FFD900]">
          <img
            src="https://d35aaqx5ub95lt.cloudfront.net/images/goals/2b5a211d830a24fab92e291d50f65d1d.svg"
            alt="XP"
            className="w-auto h-[28px]"
          />
          <span>{user?.userStats.experiencePoint}</span>
        </div>
        {/* Heart */}
        <div
          className="flex flex-1 items-center justify-center gap-2 text-[#EE5555]"
          style={{ padding: "0 16px 0 10px" }}
        >
          <img
            src="https://d35aaqx5ub95lt.cloudfront.net/images/hearts/8fdba477c56a8eeb23f0f7e67fdec6d9.svg"
            alt="heart"
            className="w-auto h-[28px]"
          />
          <span>{user?.userStats.heart}</span>
        </div>
      </div>
      {/* Premium box */}
      <div
        className="flex flex-col border-2 border-[#37464f] rounded-2xl gap-4"
        style={{ padding: "25px 25px" }}
      >
        <div className="flex items-start">
          <div>
            <img
              src="https://d35aaqx5ub95lt.cloudfront.net/images/super/2e50c3e8358914df5285dc8cf45d0b4c.svg"
              alt=""
            />
            <h2 className="text-[19px] font-bold" style={{ margin: "8px 0px" }}>
              Try Super from now!
            </h2>
            <div style={{ margin: "8px 0px 24px 0px" }}>
              <span className="font-[500]">
                Unlimited hearts, personalized practice
              </span>
            </div>
          </div>
          <img
            src="https://d35aaqx5ub95lt.cloudfront.net/images/super/fb7130289a205fadd2e196b9cc866555.svg"
            alt=""
          />
        </div>
        <button
          className="bg-[#3B4CFC] rounded-2xl cursor-pointer hover:bg-[#4255FF] active:translate-y-1"
          style={{ padding: "10px 0", boxShadow: "0 4px 0 0 #3F22EB" }}
          onMouseDown={(e) => {
            e.currentTarget.style.boxShadow = "0 0 0 0 #3F22EB";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 0 0 #3F22EB";
          }}
          onClick={() => {
            navigate("/buy-premium");
          }}
        >
          <span className="font-bold">BUY PREMIUM</span>
        </button>
      </div>
      {location.pathname === "/leaderboard" ? (
        //  Emoji box
        <div
          className="flex flex-col  top-0  gap-[10px] border-2 border-[#37464f] rounded-xl"
          style={{ padding: "20px" }}
        >
          {/* Header tool box */}
          <div
            className="flex justify-between items-center"
            style={{ marginBottom: "15px" }}
          >
            <span className="text-[19px] font-bold">
              Đặt biểu tượng trạng thái
            </span>
            <span className="text-[15px] font-bold text-[#49C0F8]">XOÁ</span>
          </div>
          {/* Avartar & Emoji choices */}
          <div className="flex flex-col gap-[10px] items-center">
            <div
              className="w-[80px] h-[85px] relative"
              style={{ marginBottom: "22px" }}
            >
              <img
                className="w-[80px] h-[80px] rounded-full"
                src="//simg-ssl.duolingo.com/ssr-avatars/1700707066/SSR-u1wpOO8VJE/xxlarge"
                alt=""
              />
              <div className="bg-[#93D333] h-[40px] w-[40px] rounded-tl-full rounded-r-full flex items-center absolute right-[-16px] top-[-12px]">
                <img
                  src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/2439bac00452e99ba7bf6a7ed0b04196.svg"
                  alt=""
                />
              </div>
            </div>
            {/* Emoji row 1 */}
            <div className="flex flex-col-6 gap-[8px]">
              {/* Emoji col 1 */}
              <button className="bg-[#93D333] rounded-[12px] w-[48px] h-[48px] border-2 border-b-4 border-[#397896]">
                <img
                  className="w-[44px] h-[42px]"
                  src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/2439bac00452e99ba7bf6a7ed0b04196.svg"
                  alt=""
                />
              </button>
              {/* Emoji col 2 */}
              <button className="bg-[#131F24] w-[48px] h-[48px] rounded-[12px] border-2 border-b-4 border-[#313F47]">
                <img
                  className="w-[44px] h-[42px]"
                  src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/2ceb401cae52712705b66a77df83ce40.svg"
                  alt=""
                />
              </button>
              {/* Emoji col 3 */}
              <button className="bg-[#131F24] w-[48px] h-[48px] rounded-[12px] border-2 border-b-4 border-[#313F47]">
                <img
                  className="w-[44px] h-[42px]"
                  src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/6b8a8db5ac7f847e7e87efe97c8b451a.svg"
                  alt=""
                />
              </button>
              {/* Emoji col 4 */}
              <button className="bg-[#131F24] w-[48px] h-[48px] rounded-[12px] border-2 border-b-4 border-[#313F47]">
                <img
                  className="w-[44px] h-[42px]"
                  src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/a8e5c18e80054228b2c61168846ff643.svg"
                  alt=""
                />
              </button>
              {/* Emoji col 5 */}
              <button className="bg-[#131F24] w-[48px] h-[48px] rounded-[12px] border-2 border-b-4 border-[#313F47]">
                <img
                  className="w-[44px] h-[42px]"
                  src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/573de2bc90b2499eeb2b3738cff90133.svg"
                  alt=""
                />
              </button>
              <button className="bg-[#131F24] w-[48px] h-[48px] rounded-[12px] border-2 border-b-4 border-[#313F47]">
                <img
                  className="w-[44px] h-[42px]"
                  src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/535fc27de224cc7d311dbb5de4f33be6.svg"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Ranking box
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
      )}
    </div>
  );
};

export default RightSideBar;
