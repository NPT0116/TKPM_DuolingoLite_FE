import { useEffect, useState } from "react";
import { getUserProfile } from "../../../services/Authentication/AuthService";
import { IUserProfile } from "../../../interfaces/Auth/IUserProfile";
import AvatarSection from "../../components/Profile/AvatarSection";
import InfoDetailSection from "../../components/Profile/InfoDetailSection";
import StatisticSection from "../../components/Profile/StatisticSection";

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<IUserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData.value);
      } catch (err) {
        setError("Failed to fetch user profile" + err);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div
      className="w-3/5 max-w-[592px] min-w-[348px] flex-grow justify-center"
      style={{ paddingTop: "25px" }}
    >
      {/* Profile Section */}
      <div className="w-[full] max-w-[592px] flex flex-col gap-y-[20px]">
        <AvatarSection profileImageUrl={user?.profileImageUrl || null} />
        <InfoDetailSection
          firstName={user?.firstName ?? ""}
          lastName={user?.lastName ?? ""}
          nickName={user?.nickName ?? ""}
          userActivity={
            user?.userActivities?.[0] ?? {
              userId: "",
              date: "",
              isActive: false,
              id: "",
            }
          }
        />
        <StatisticSection userStats={user?.userStats ?? null} />
        {/* Achievement Section */}
        <div style={{ marginBottom: "50px" }}>
          <div
            className="flex justify-between items-end"
            style={{ marginBottom: "12px" }}
          >
            <div className="text-[28px] font-bold">Thành tích</div>
            <a href="#" className="text-[15px] font-bold text-[#49C0F8]">
              XEM TẤT CẢ
            </a>
          </div>
          <div className="w-full">
            <ul className="h-[415px] border-2 border-[#37464F] rounded-2xl">
              <li
                className="flex w-full items-center border-b-2 border-[#37464F]"
                style={{ padding: "20px" }}
              >
                {/* Image and level */}
                <div className="relative w-fit">
                  <img
                    src="https://d35aaqx5ub95lt.cloudfront.net/images/achievements/217492e7baf0961abdd2ddfb5881e7f9.svg"
                    alt=""
                  />
                  <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[11px] text-[#131F24] font-bold">
                    Cấp 1
                  </div>
                </div>
                <div className="h-full w-[30px]"></div>

                {/* Content */}
                <div className="flex-1 pl-4">
                  <div
                    className="flex justify-between w-full"
                    style={{ marginBottom: "16px" }}
                  >
                    <div className="text-[19px] font-bold">Lửa rừng</div>
                    <div className="text-[17px] text-[#52656D]">1/3</div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {/* Progress Bar */}
                    <div className="relative w-full h-[14px] rounded-2xl overflow-hidden bg-[#37464F]">
                      <div
                        className="absolute top-0 left-0 h-full bg-[#FFC700] rounded-2xl transition-all"
                        style={{ width: "33.33%" }}
                      ></div>
                    </div>

                    <div className="font-semibold">Đạt chuỗi 3 ngày streak</div>
                  </div>
                </div>
              </li>

              <li
                className="flex w-full items-center border-b-2 border-[#37464F]"
                style={{ padding: "20px" }}
              >
                <div className="relative w-fit">
                  <img
                    src="https://d35aaqx5ub95lt.cloudfront.net/images/achievements/c2b4bc98d8229b08fd45e85087868c24.svg"
                    alt=""
                  />
                  <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[11px] text-[#131F24] font-bold">
                    Cấp 1
                  </div>
                </div>
                <div className="h-full w-[30px]"></div>
                <div className="flex-1 pl-4">
                  <div
                    className="flex justify-between w-full"
                    style={{ marginBottom: "16px" }}
                  >
                    <div className="text-[19px] font-bold">Cao nhân</div>
                    <div className="text-[17px] text-[#52656D]">78/100</div>
                  </div>
                  <div className="flex flex-col gap-y-[10px]">
                    {/* Progress Bar */}
                    <div className="relative w-full h-[14px] rounded-2xl overflow-hidden bg-[#37464F]">
                      <div
                        className="absolute top-0 left-0 h-full bg-[#FFC700] rounded-2xl transition-all"
                        style={{ width: "78%" }}
                      ></div>
                    </div>
                    <div className="font-semibold">Đạt được 100 KN</div>
                  </div>
                </div>
              </li>
              <li
                className="flex w-full items-center"
                style={{ padding: "20px" }}
              >
                <div className="relative w-fit">
                  <img
                    src="https://d35aaqx5ub95lt.cloudfront.net/images/achievements/f82ec78dd3c15dea85ae4c6a8e028a37.svg"
                    alt=""
                  />
                  <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[11px] text-[#131F24] font-bold">
                    Cấp 1
                  </div>
                </div>
                <div className="h-full w-[30px]"></div>
                <div className="flex-1 pl-4">
                  <div
                    className="flex justify-between w-full"
                    style={{ marginBottom: "16px" }}
                  >
                    <div className="text-[19px] font-bold">Học giả</div>
                    <div className="text-[17px] text-[#52656D]">21/50</div>
                  </div>
                  <div className="flex flex-col gap-y-[10px]">
                    {/* Progress Bar */}
                    <div className="relative w-full h-[14px] rounded-2xl overflow-hidden bg-[#37464F]">
                      <div
                        className="absolute top-0 left-0 h-full bg-[#FFC700] rounded-2xl transition-all"
                        style={{ width: "42%" }}
                      ></div>
                    </div>
                    <div className="font-semibold">
                      Học 50 từ mới trong một khóa học
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
