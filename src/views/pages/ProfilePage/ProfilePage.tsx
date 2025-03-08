import { useEffect, useState } from "react";
import { getUserProfile } from "../../../services/Authentication/AuthService";
import { UserProfile } from "../../../interfaces/Auth/UserProfile";
import AvatarSection from "../../components/Profile/AvatarSection";
import InfoDetailSection from "../../components/Profile/InfoDetailSection";
import StatisticSection from "../../components/Profile/StatisticSection";

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      console.log("a");
      try {
        const userData = await getUserProfile();
        setUser(userData.value);
      } catch (err) {
        setError("Failed to fetch user profile");
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div
      className="w-full flex justify-center min-h-screen overflow-y-auto"
      style={{ paddingTop: "25px" }}
    >
      <div className="w-[1008px] flex">
        {/* Profile Section */}
        <div className="w-[592px] flex flex-col gap-y-[20px]">
          <AvatarSection profileImageUrl="https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/480599581_628294509907140_7591753771768341862_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeH51vsEchcl53mbqjozwAHYpn4MQT1eYzqmfgxBPV5jOlBB7FY2_caGPUUEhXxUNQzhb0jAbdvf13Y2wDIUjhDC&_nc_ohc=9Q5ZEwKxYBwQ7kNvgEYTKkC&_nc_oc=AdhRSkWfIErzPWdU13g2nuNrgLON0tCgZj3jTSufJD7XA_a_g7ccTfl7OW8u-OVLDpJgF1acUg2qde5VSVVvfSbN&_nc_zt=23&_nc_ht=scontent.fsgn8-3.fna&_nc_gid=A-9kpryQUtQoTCdnXtLsYgD&oh=00_AYEw-bz8c406IbcJeUNpnIoLh-JGAPzH65gZfm--3Xd6bA&oe=67D1DE9B" />
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
              <ul className="h-[415px] border-2 border-[#37464F] rounded-2xl overflow-y-auto">
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

                      <div className="font-semibold">
                        Đạt chuỗi 3 ngày streak
                      </div>
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
    </div>
  );
};
export default ProfilePage;
