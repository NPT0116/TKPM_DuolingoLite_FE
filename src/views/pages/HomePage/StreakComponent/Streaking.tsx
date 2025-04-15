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
  console.log(userActivity);
  const fetchUserActivity = async () => {
    try {
      const data = await GetAllUser();
      const userId = localStorage.getItem("userId");
      const currentUser = data!.find((u: any) => {
        return u.userStats.userId == userId;
      });
      setUserActivity(currentUser);
    } catch (error) {
      console.log("Error while get all user:", error);
    }
  };

  useEffect(() => {
    fetchUserActivity();
  }, []);
  const lastDateActivity = userActivity?.userStats.lastActiveDate;
  const weekDayNumber = lastDateActivity
    ? new Date(lastDateActivity).getDay()
    : 0;
  const currentDate = new Date();
  const currentDateNumber = currentDate.getDay();
  console.log(lastDateActivity);
  console.log(weekDayNumber);

  return (
    <div
      onMouseEnter={() => {
        setIsStreakVisible(true);
      }}
      onMouseLeave={() => {
        setIsStreakVisible(false);
      }}
      className="group flex justify-center items-center gap-2 rounded-xl hover:bg-[#202F36]"
      style={{ padding: "10px 15px" }}
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
          startDay={currentDateNumber}
          endDay={weekDayNumber}
          streakCount={userActivity!.userStats.currentStreak}
        />
      </div>
    </div>
  );
};
export default Streaking;
