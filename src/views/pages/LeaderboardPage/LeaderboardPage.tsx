import trophyImg from "../../../assets/imgs/leaderboard/trophy.png";

const LeaderboardPage: React.FC = () => {
  return (
    <div
      className="w-full flex gap-[48px] justify-center min-h-screen overflow-y-auto relative"
      style={{ paddingTop: "24px" }}
    >
      <div className="max-w-[592px] w-[70%] relative">
        {/* Introduce Section */}
        <div className="w-full  sticky top-0 z-10 bg-[#131F24]">
          <div className="flex justify-center">
            <img
              src={trophyImg}
              alt="medal image"
              className="w-[80px h-[91px]"
            />
          </div>
          <span
            className="flex justify-center text-[25px] font-bold"
            style={{ margin: "24px 0px 20px 0px" }}
          >
            Bảng xếp hạng
          </span>
          <span
            className="flex justify-center text-[19px] font-bold text-[#DCE6EC]"
            style={{ marginBottom: "5px" }}
          >
            Tốp 10 sẽ được thăng hạng lên giải đấu cao hơn
          </span>
          <span
            className="flex justify-center text-[17px] font-bold text-[#FFC700]"
            style={{ marginBottom: "16px" }}
          >
            6 ngày
          </span>
          <hr className="h-[2px] bg-[#37464F] border-0" />
        </div>
        {/* Leaderboard List */}
        <div className="relative">
          <div
            className="absolute top-0 left-0 w-full "
            style={{ paddingBottom: "50px" }}
          >
            {/* 1st */}
            <a
              href="#"
              className="flex items-center w-full"
              style={{ padding: "8px 24px 8px 16px" }}
            >
              <img
                src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/9e4f18c0bc42c7508d5fa5b18346af11.svg"
                alt=""
              />
              <div className="relative" style={{ margin: "0px 28px 0px 12px" }}>
                <img
                  src="https://simg-ssl.duolingo.com/ssr-avatars/1719531763/SSR-1Iz5ZtEi9E/medium"
                  alt=""
                  className="rounded-full"
                />
                <div className="absolute top-[-6px] right-[-16px] bg-white rounded-tl-full rounded-r-full">
                  <img
                    src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/6b8a8db5ac7f847e7e87efe97c8b451a.svg"
                    alt=""
                    className="w-[26px] h-[26px]"
                  />
                </div>
              </div>
              {/* Name */}
              <span className="font-bold flex-1 items-center w-auto truncate">
                hurley
              </span>
              {/* Experience Point */}
              <span className="flex items-center justify-end text-[#DCE6EC]">
                450 KN
              </span>
            </a>
            {/* 2nd */}
            <a
              href="#"
              className="flex items-center w-full"
              style={{ padding: "8px 24px 8px 16px" }}
            >
              <img
                src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/cc7b8f8582e9cfb88408ab851ec2e9bd.svg"
                alt=""
              />
              <div className="relative" style={{ margin: "0px 28px 0px 12px" }}>
                <img
                  src="https://simg-ssl.duolingo.com/ssr-avatars/1713230496/SSR-xJNDbWgOtc/medium"
                  alt=""
                  className="rounded-full"
                />
                <div className="absolute top-[-6px] right-[-16px] bg-white rounded-tl-full rounded-r-full">
                  <img
                    src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/6b8a8db5ac7f847e7e87efe97c8b451a.svg"
                    alt=""
                    className="w-[26px] h-[26px]"
                  />
                </div>
              </div>
              {/* Name */}
              <span className="font-bold flex-1 items-center w-auto truncate">
                balwind
              </span>
              {/* Experience Point */}
              <span className="flex items-center justify-end text-[#DCE6EC]">
                312 KN
              </span>
            </a>
            {/* 3rd */}
            <a
              href="#"
              className="flex items-center w-full"
              style={{ padding: "8px 24px 8px 16px" }}
            >
              <img
                src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/eef523c872b71178ef5acb2442d453a2.svg"
                alt=""
              />
              <div className="relative" style={{ margin: "0px 28px 0px 12px" }}>
                <img
                  src="https://simg-ssl.duolingo.com/ssr-avatars/1719531763/SSR-1Iz5ZtEi9E/medium"
                  alt=""
                  className="rounded-full"
                />
                <div className="absolute top-[-6px] right-[-16px] bg-white rounded-tl-full rounded-r-full">
                  <img
                    src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/6b8a8db5ac7f847e7e87efe97c8b451a.svg"
                    alt=""
                    className="w-[26px] h-[26px]"
                  />
                </div>
              </div>
              {/* Name */}
              <span className="font-bold flex-1 items-center w-auto truncate">
                hurley
              </span>
              {/* Experience Point */}
              <span className="flex items-center justify-end text-[#DCE6EC]">
                183 KN
              </span>
            </a>
            {/* 4st */}
            <a
              href="#"
              className="flex items-center w-full"
              style={{ padding: "8px 24px 8px 16px" }}
            >
              <span className="w-[41px] text-center text-[#79B933] text-[17px] font-bold">
                4
              </span>
              <div className="relative" style={{ margin: "0px 28px 0px 12px" }}>
                <img
                  src="https://simg-ssl.duolingo.com/ssr-avatars/1719531763/SSR-1Iz5ZtEi9E/medium"
                  alt=""
                  className="rounded-full"
                />
                <div className="absolute top-[-6px] right-[-16px] bg-white rounded-tl-full rounded-r-full">
                  <img
                    src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/6b8a8db5ac7f847e7e87efe97c8b451a.svg"
                    alt=""
                    className="w-[26px] h-[26px]"
                  />
                </div>
              </div>
              {/* Name */}
              <span className="font-bold flex-1 items-center w-auto truncate">
                hurley
              </span>
              {/* Experience Point */}
              <span className="flex items-center justify-end text-[#DCE6EC]">
                183 KN
              </span>
            </a>
            <a
              href="#"
              className="flex items-center w-full"
              style={{ padding: "8px 24px 8px 16px" }}
            >
              <span className="w-[41px] text-center text-[#79B933] text-[17px] font-bold">
                4
              </span>
              <div className="relative" style={{ margin: "0px 28px 0px 12px" }}>
                <img
                  src="https://simg-ssl.duolingo.com/ssr-avatars/1719531763/SSR-1Iz5ZtEi9E/medium"
                  alt=""
                  className="rounded-full"
                />
                <div className="absolute top-[-6px] right-[-16px] bg-white rounded-tl-full rounded-r-full">
                  <img
                    src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/6b8a8db5ac7f847e7e87efe97c8b451a.svg"
                    alt=""
                    className="w-[26px] h-[26px]"
                  />
                </div>
              </div>
              {/* Name */}
              <span className="font-bold flex-1 items-center w-auto truncate">
                hurley
              </span>
              {/* Experience Point */}
              <span className="flex items-center justify-end text-[#DCE6EC]">
                183 KN
              </span>
            </a>
            <a
              href="#"
              className="flex items-center w-full"
              style={{ padding: "8px 24px 8px 16px" }}
            >
              <span className="w-[41px] text-center text-[#79B933] text-[17px] font-bold">
                4
              </span>
              <div className="relative" style={{ margin: "0px 28px 0px 12px" }}>
                <img
                  src="https://simg-ssl.duolingo.com/ssr-avatars/1719531763/SSR-1Iz5ZtEi9E/medium"
                  alt=""
                  className="rounded-full"
                />
                <div className="absolute top-[-6px] right-[-16px] bg-white rounded-tl-full rounded-r-full">
                  <img
                    src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/6b8a8db5ac7f847e7e87efe97c8b451a.svg"
                    alt=""
                    className="w-[26px] h-[26px]"
                  />
                </div>
              </div>
              {/* Name */}
              <span className="font-bold flex-1 items-center w-auto truncate">
                hurley
              </span>
              {/* Experience Point */}
              <span className="flex items-center justify-end text-[#DCE6EC]">
                183 KN
              </span>
            </a>
            <a
              href="#"
              className="flex items-center w-full"
              style={{ padding: "8px 24px 8px 16px" }}
            >
              <span className="w-[41px] text-center text-[#79B933] text-[17px] font-bold">
                4
              </span>
              <div className="relative" style={{ margin: "0px 28px 0px 12px" }}>
                <img
                  src="https://simg-ssl.duolingo.com/ssr-avatars/1719531763/SSR-1Iz5ZtEi9E/medium"
                  alt=""
                  className="rounded-full"
                />
                <div className="absolute top-[-6px] right-[-16px] bg-white rounded-tl-full rounded-r-full">
                  <img
                    src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/6b8a8db5ac7f847e7e87efe97c8b451a.svg"
                    alt=""
                    className="w-[26px] h-[26px]"
                  />
                </div>
              </div>
              {/* Name */}
              <span className="font-bold flex-1 items-center w-auto truncate">
                hurley
              </span>
              {/* Experience Point */}
              <span className="flex items-center justify-end text-[#DCE6EC]">
                183 KN
              </span>
            </a>
            <a
              href="#"
              className="flex items-center w-full"
              style={{ padding: "8px 24px 8px 16px" }}
            >
              <span className="w-[41px] text-center text-[#79B933] text-[17px] font-bold">
                4
              </span>
              <div className="relative" style={{ margin: "0px 28px 0px 12px" }}>
                <img
                  src="https://simg-ssl.duolingo.com/ssr-avatars/1719531763/SSR-1Iz5ZtEi9E/medium"
                  alt=""
                  className="rounded-full"
                />
                <div className="absolute top-[-6px] right-[-16px] bg-white rounded-tl-full rounded-r-full">
                  <img
                    src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/6b8a8db5ac7f847e7e87efe97c8b451a.svg"
                    alt=""
                    className="w-[26px] h-[26px]"
                  />
                </div>
              </div>
              {/* Name */}
              <span className="font-bold flex-1 items-center w-auto truncate">
                hurley
              </span>
              {/* Experience Point */}
              <span className="flex items-center justify-end text-[#DCE6EC]">
                183 KN
              </span>
            </a>
            <a
              href="#"
              className="flex items-center w-full"
              style={{ padding: "8px 24px 8px 16px" }}
            >
              <span className="w-[41px] text-center text-[#79B933] text-[17px] font-bold">
                4
              </span>
              <div className="relative" style={{ margin: "0px 28px 0px 12px" }}>
                <img
                  src="https://simg-ssl.duolingo.com/ssr-avatars/1719531763/SSR-1Iz5ZtEi9E/medium"
                  alt=""
                  className="rounded-full"
                />
                <div className="absolute top-[-6px] right-[-16px] bg-white rounded-tl-full rounded-r-full">
                  <img
                    src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/6b8a8db5ac7f847e7e87efe97c8b451a.svg"
                    alt=""
                    className="w-[26px] h-[26px]"
                  />
                </div>
              </div>
              {/* Name */}
              <span className="font-bold flex-1 items-center w-auto truncate">
                hurley
              </span>
              {/* Experience Point */}
              <span className="flex items-center justify-end text-[#DCE6EC]">
                183 KN
              </span>
            </a>
            <a
              href="#"
              className="flex items-center w-full"
              style={{ padding: "8px 24px 8px 16px" }}
            >
              <span className="w-[41px] text-center text-[#79B933] text-[17px] font-bold">
                4
              </span>
              <div className="relative" style={{ margin: "0px 28px 0px 12px" }}>
                <img
                  src="https://simg-ssl.duolingo.com/ssr-avatars/1719531763/SSR-1Iz5ZtEi9E/medium"
                  alt=""
                  className="rounded-full"
                />
                <div className="absolute top-[-6px] right-[-16px] bg-white rounded-tl-full rounded-r-full">
                  <img
                    src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/6b8a8db5ac7f847e7e87efe97c8b451a.svg"
                    alt=""
                    className="w-[26px] h-[26px]"
                  />
                </div>
              </div>
              {/* Name */}
              <span className="font-bold flex-1 items-center w-auto truncate">
                hurley
              </span>
              {/* Experience Point */}
              <span className="flex items-center justify-end text-[#DCE6EC]">
                183 KN
              </span>
            </a>
            <a
              href="#"
              className="flex items-center w-full"
              style={{ padding: "8px 24px 8px 16px" }}
            >
              <span className="w-[41px] text-center text-[#79B933] text-[17px] font-bold">
                4
              </span>
              <div className="relative" style={{ margin: "0px 28px 0px 12px" }}>
                <img
                  src="https://simg-ssl.duolingo.com/ssr-avatars/1719531763/SSR-1Iz5ZtEi9E/medium"
                  alt=""
                  className="rounded-full"
                />
                <div className="absolute top-[-6px] right-[-16px] bg-white rounded-tl-full rounded-r-full">
                  <img
                    src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/6b8a8db5ac7f847e7e87efe97c8b451a.svg"
                    alt=""
                    className="w-[26px] h-[26px]"
                  />
                </div>
              </div>
              {/* Name */}
              <span className="font-bold flex-1 items-center w-auto truncate">
                hurley
              </span>
              {/* Experience Point */}
              <span className="flex items-center justify-end text-[#DCE6EC]">
                183 KN
              </span>
            </a>
            <a
              href="#"
              className="flex items-center w-full"
              style={{ padding: "8px 24px 8px 16px" }}
            >
              <span className="w-[41px] text-center text-[#79B933] text-[17px] font-bold">
                4
              </span>
              <div className="relative" style={{ margin: "0px 28px 0px 12px" }}>
                <img
                  src="https://simg-ssl.duolingo.com/ssr-avatars/1719531763/SSR-1Iz5ZtEi9E/medium"
                  alt=""
                  className="rounded-full"
                />
                <div className="absolute top-[-6px] right-[-16px] bg-white rounded-tl-full rounded-r-full">
                  <img
                    src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/6b8a8db5ac7f847e7e87efe97c8b451a.svg"
                    alt=""
                    className="w-[26px] h-[26px]"
                  />
                </div>
              </div>
              {/* Name */}
              <span className="font-bold flex-1 items-center w-auto truncate">
                hurley
              </span>
              {/* Experience Point */}
              <span className="flex items-center justify-end text-[#DCE6EC]">
                183 KN
              </span>
            </a>
            <a
              href="#"
              className="flex items-center w-full"
              style={{ padding: "8px 24px 8px 16px" }}
            >
              <span className="w-[41px] text-center text-[#79B933] text-[17px] font-bold">
                4
              </span>
              <div className="relative" style={{ margin: "0px 28px 0px 12px" }}>
                <img
                  src="https://simg-ssl.duolingo.com/ssr-avatars/1719531763/SSR-1Iz5ZtEi9E/medium"
                  alt=""
                  className="rounded-full"
                />
                <div className="absolute top-[-6px] right-[-16px] bg-white rounded-tl-full rounded-r-full">
                  <img
                    src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/6b8a8db5ac7f847e7e87efe97c8b451a.svg"
                    alt=""
                    className="w-[26px] h-[26px]"
                  />
                </div>
              </div>
              {/* Name */}
              <span className="font-bold flex-1 items-center w-auto truncate">
                hurley
              </span>
              {/* Experience Point */}
              <span className="flex items-center justify-end text-[#DCE6EC]">
                183 KN
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Side bar */}
      <div className="w-[368px] h-[100vh]">
        {/* Tool box */}
        <div
          className="flex flex-col sticky top-0  gap-[10px] border-2 border-[#37464f] rounded-xl"
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
      </div>
    </div>
  );
};

export default LeaderboardPage;
