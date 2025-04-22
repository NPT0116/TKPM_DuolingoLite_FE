/** @jsxImportSource @emotion/react */

import { useEffect, useRef, useState } from "react";
import trophyImg from "../../../assets/imgs/leaderboard/trophy.png";
import { MockUserRankingData, MockCurrentUserRanking } from "./MockUserRanking";
import { IUserRanking } from "../../../interfaces/IRanking";
import { css } from "@emotion/react";
import UserRankingBar from "./UserRankingBar";
import { getRankingList } from "../../../services/LeaderBoard/GetRankingList";
import { getUserRanking } from "../../../services/LeaderBoard/GetUserRanking";
import { IUser } from "../../../interfaces/IUser";
import { GetAllUser } from "../../../services/User/GetAllUser";

const hidingScrollBar = css`
  scrollbar-width: 0px;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;
const LeaderboardPage: React.FC = () => {
  const [userRankingData, setUserRankingData] = useState<IUserRanking[]>();
  const [currentUserRanking, setCurrentUserRanking] = useState<IUserRanking>();
  const [prevUserRanking, setPrevUserRanking] = useState();
  useEffect(() => {
    const loadAll = async () => {
      const stored = localStorage.getItem("previousUserRanking");
      if (stored) {
        setPrevUserRanking(JSON.parse(stored));
      }
      try {
        const [
          { data: users },
          { data: userRankings },
          { data: currentRanking },
        ] = await Promise.all([
          GetAllUser(),
          getRankingList(),
          getUserRanking(),
        ]);

        const rawRankings = userRankings?.userRankings || [];
        const merged = rawRankings.map((r) => {
          const u = users!.find((u) => {
            return u.userStats.userId === r.userId;
          }) as IUser;
          return {
            ...r,
            profileImageUrl:
              u.profileImageUrl ??
              "https://simg-ssl.duolingo.com/ssr-avatars/1288943247/SSR-Dnq9imvO9g/xxlarge",
          };
        });
        const findUser = users?.find((u) => {
          return u.userStats.userId === currentRanking?.userId;
        }) as IUser;
        const currentUserRanking = {
          ...currentRanking!,
          profileImageUrl:
            findUser?.profileImageUrl ??
            "https://simg-ssl.duolingo.com/ssr-avatars/1288943247/SSR-Dnq9imvO9g/xxlarge",
        };

        setUserRankingData(merged!);
        setCurrentUserRanking(currentUserRanking);
      } catch (error) {
        console.error("Error while fetching leaderboard data: ", error);
      }
    };
    loadAll();
  }, []);
  useEffect(() => {
    console.log("Previous User Ranking: ", prevUserRanking);
    console.log("Current User Ranking: ", currentUserRanking?.rank);
  }, [currentUserRanking]);
  return (
    <div className="w-full h-full">
      {/* Header */}
      <div
        className="w-full h-1/3 border-b-2 border-[#37464F]"
        style={{ padding: "40px 0 0 0" }}
      >
        <div className="w-full h-full flex flex-col gap-4">
          <img src={trophyImg} alt="" className="w-full h-1/2 object-contain" />
          <div className="w-full h-1/3 flex flex-col gap-1 justify-center items-center font-bold text-2xl">
            {" "}
            <span> Bảng xếp hạng</span>
            <div className="font-medium text-lg">
              Top 10 người dùng có thành tích học tập cao nhất{" "}
            </div>
          </div>
        </div>
      </div>
      {/* Ranking List */}
      <div className="w-full h-2/3 overflow-auto" css={hidingScrollBar}>
        <div className="w-full h-full flex flex-col">
          {userRankingData?.map((userRanking, index) => (
            <UserRankingBar
              index={index}
              userRanking={userRanking}
              currentUserRanking={currentUserRanking!}
            />
          ))}
          {currentUserRanking?.rank! >= 11 && (
            <div>
              <div
                className="w-full flex justify-center items-center  text-[#FE4C4B] font-bold"
                style={{ paddingBottom: "10px", paddingTop: "5px" }}
              >
                Cố gắng hơn để vào top 10 nhé
              </div>
              <UserRankingBar
                indexColor="#FE4C4B"
                index={currentUserRanking?.rank! - 1}
                userRanking={currentUserRanking!}
                currentUserRanking={currentUserRanking!}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
