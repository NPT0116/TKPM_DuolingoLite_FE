const ProfilePage: React.FC = () => {
  return (
    <div
      className="w-full flex justify-center min-h-screen overflow-y-auto"
      style={{ paddingTop: "25px" }}
    >
      <div className="w-[1008px] flex">
        {/* Profile Section */}
        <div className="w-[592px] flex flex-col gap-y-[20px]">
          {/* Avartar Section */}
          <div className="w-full h-[224px] bg-[#202F36] rounded-2xl relative overflow-y-hidden">
            <button
              className="border-2 border-[#172227] rounded-2xl absolute top-[14px] right-[14px] w-[46px] h-[44px] flex justify-center items-center cursor-pointer hover:bg-[#1d2b31] active:translate-y-0.5"
              style={{
                boxShadow: "0 3px 0 0 #172227",
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 0 0 #172227";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.boxShadow = "0 3px 0 0 #172227";
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.8637 2.28623L12.1531 1.00038C13.4906 -0.33346 15.659 -0.333457 16.9965 1.00038C18.3339 2.33421 18.3339 4.49679 16.9965 5.83062L15.7071 7.11648L10.8637 2.28623ZM9.34202 3.80383L0.902018 12.2209C0.0785876 13.0421 -0.354215 16.9413 0.363097 17.6567C1.08041 18.3722 4.90788 17.8864 5.7454 17.0512L14.1854 8.63408L9.34202 3.80383Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
            <div className="absolute bottom-[-80px] left-[35%]">
              <img
                src="	https://d35aaqx5ub95lt.cloudfront.net/images/05147135350f5234cbf147813eee4db8.svg"
                alt="Profile Picture"
              />
            </div>
          </div>
          {/* Info Detail Section */}
          <div className="h-[134px] border-b-2 border-[#37464F] relative">
            <img
              src="https://d35aaqx5ub95lt.cloudfront.net/images/borderlessFlags/b9817d83179e278c91771d903953bfc6.svg"
              alt=""
              className="w-[31px] h-[24px] absolute right-0 bottom-[26px]"
            />
            {/* Name */}
            <div className="text-[28px] font-bold">Huy Trần</div>
            {/* Nick name */}
            <div className="text-[#52656D] font-semibold text-[17px] transform translate-y-[-4px]">
              HuyTrn916781
            </div>
            {/* Date Join */}
            <div className="text-white text-[17px]  transform translate-y-[-4px]">
              Đã tham gia Tháng Hai 2025
            </div>
          </div>
          {/* Statistic Section */}
          <div>
            <div className="text-[28px] font-bold">Thống kê</div>
            <div className="grid grid-cols-2 w-full gap-3">
              <div
                className="border-2 border-[#37464F] rounded-2xl h-[78px] flex items-start"
                style={{ padding: "15px 24px" }}
              >
                <img
                  src="	https://d35aaqx5ub95lt.cloudfront.net/images/profile/8a6dca76019d059a81c4c7c1145aa7a4.svg"
                  alt=""
                  className="w-[21px]"
                  style={{ marginRight: "15px" }}
                />
                <div className="transition translate-y-[-6px]">
                  <div className="font-bold text-[20px] ">1</div>
                  <div className="text-[#52656D] font-semibold text-[16px]">
                    Ngày streak
                  </div>
                </div>
              </div>
              <div
                className="border-2 border-[#37464F] rounded-2xl h-[78px] flex items-start"
                style={{ padding: "15px 24px" }}
              >
                <img
                  src="https://d35aaqx5ub95lt.cloudfront.net/images/profile/01ce3a817dd01842581c3d18debcbc46.svg"
                  alt=""
                  className="w-[21px]"
                  style={{ marginRight: "15px" }}
                />
                <div className="transition translate-y-[-6px]">
                  <div className="font-bold text-[20px] ">78</div>
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
                <div className="transition translate-y-[-6px]">
                  <div className="font-bold text-[20px] text-[#52656D]">
                    Chưa có xếp hạng
                  </div>
                  <div className="text-[#52656D] font-semibold text-[16px]">
                    Giải đấu hiện tại
                  </div>
                </div>
              </div>
              <div
                className="border-2 border-[#37464F] rounded-2xl h-[78px] flex items-start"
                style={{ padding: "15px 24px" }}
              >
                <img
                  src="https://d35aaqx5ub95lt.cloudfront.net/images/profile/96e056d06fd492261f98901b53ccc256.svg"
                  alt=""
                  className="w-[21px]"
                  style={{ marginRight: "15px" }}
                />
                <div className="transition translate-y-[-6px]">
                  <div className="font-bold text-[20px] text-[#52656D] ">0</div>
                  <div className="text-[#52656D] font-semibold text-[16px]">
                    Số lần đạt top 3
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Achievement Section */}
          <div>
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
                  className="flex w-full items-center border-b-2 border-[#37464F]"
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
