import { useEffect, useState } from "react";
import StreakDisplay from "./StreakDisplay";
import { GetAllUser } from "../../../../services/User/GetAllUser";
import { IUser } from "../../../../interfaces/IUser";

interface StreakingProps {
  streakNumber?: number;
}

const Streaking: React.FC<StreakingProps> = ({ streakNumber }) => {
  const [isStreakVisible, setIsStreakVisible] = useState(false);
  const [userActivity, setUserActivity] = useState<IUser>();
  // Fetch User Activity
  const fetchUserActivity = async () => {
    try {
      const { data: users } = await GetAllUser();
      const userId = localStorage.getItem("userId");
      const currentUser = users!.find((u): u is IUser => {
        return u.userStats.userId == userId;
      });
      setUserActivity(currentUser as IUser);
    } catch (error) {
      console.log("Error while get all user:", error);
    }
  };

  useEffect(() => {
    fetchUserActivity();
  }, []);
  const currentDateNumber = new Date().getDay();
  const startStreakDay = 0;
  console.log("current User activity:");
  console.log(userActivity?.userStats);
  return (
    <div
      onMouseEnter={() => {
        setIsStreakVisible(true);
      }}
      onMouseLeave={() => {
        setIsStreakVisible(false);
      }}
      className="group flex justify-center items-center gap-2 rounded-xl hover:bg-[#202F36]"
      style={{ padding: "20px" }}
    >
      <img
        src="https://d35aaqx5ub95lt.cloudfront.net/images/icons/398e4298a3b39ce566050e5c041949ef.svg"
        alt="streaking icon"
      />
      <span className=" text-[#FFAB32] font-bold">
        {userActivity ? userActivity!.userStats.currentStreak : 0}
      </span>
      <div>
        <StreakDisplay
          startDay={
            currentDateNumber - userActivity!.userStats.currentStreak + 1 ?? 0
          }
          endDay={currentDateNumber}
          streakCount={userActivity ? userActivity!.userStats.currentStreak : 0}
        />
      </div>
    </div>
  );
};
export default Streaking;
