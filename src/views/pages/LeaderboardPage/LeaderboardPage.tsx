import trophyImg from "../../../assets/imgs/leaderboard/trophy.png";

const LeaderboardPage: React.FC = () => {
  return (
    <div className="max-w-[592px] w-[70%] relative">
      {/* Introduce Section */}
      <div className="w-full  sticky top-0 z-10 bg-[#131F24]">
        <div className="flex justify-center">
          <img src={trophyImg} alt="medal image" className="w-[80px h-[91px]" />
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
  );
};

export default LeaderboardPage;
