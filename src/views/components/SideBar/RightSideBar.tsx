import { useEffect, useRef, useState } from "react";
import { getUserProfile } from "../../../services/Authentication/AuthService";
import { IUserProfile } from "../../../interfaces/Auth/IUserProfile";
import { useLocation, useNavigate } from "react-router-dom";
import Streaking from "../../pages/HomePage/StreakComponent/Streaking";
import Notify from "./Notify/Notify";

const RightSideBar: React.FC = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [user, setUser] = useState<IUserProfile | null>(null);
  const location = useLocation();
  const fetched = useRef(false);
  const navigate = useNavigate();
  const [currentIconUrl, setCurrentIconUrl] = useState<string>("");
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

  useEffect(() => {
    if (user) {
      setIsPremium(user?.subscription !== null);
    }
  });

  return (
    <div
      className=" w-[368px] flex flex-col shrink-0  sticky top-[20px] gap-[20px] font-bold z-[10]"
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
        {isPremium ? (
          <div
            className="flex flex-1 items-center justify-center gap-2 text-[#EE5555]"
            style={{ padding: "0 16px 0 10px" }}
          >
            <img
              src="https://d35aaqx5ub95lt.cloudfront.net/images/hearts/0c1a523b4b5882a97e4df162f4b5c58b.svg"
              className="w-auto h-[28px]"
            />
            <img
              src="https://d35aaqx5ub95lt.cloudfront.net/images/hearts/8d4c5fcd9cedabfd155d3eda8af269bc.svg"
              alt=""
            />
          </div>
        ) : (
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
        )}
      </div>
      {/* Premium box */}
      {!isPremium && (
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
              <h2
                className="text-[19px] font-bold"
                style={{ margin: "8px 0px" }}
              >
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
      )}
      {location.pathname === "/leaderboard" ? (
        //  Emoji box
        <div></div>
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
