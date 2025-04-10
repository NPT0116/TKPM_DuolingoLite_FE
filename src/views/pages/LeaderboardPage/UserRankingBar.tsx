/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { IUserRanking } from "../../../interfaces/IRanking";

const currentUserRankingCss = css`
  background: #202f36 !important;
`;
interface IUserRankingBar {
  index: number;
  userRanking: IUserRanking;
  currentUserRanking: IUserRanking;
  indexColor?: string;
}
const UserRankingBar: React.FC<IUserRankingBar> = ({
  index,
  userRanking,
  currentUserRanking,
  indexColor,
}) => {
  return (
    <div
      css={
        currentUserRanking && currentUserRanking.rank - 1 === index
          ? currentUserRankingCss
          : css``
      }
      className="w-full  flex flex-row hover:bg-[#202F36] rounded-2xl cursor-pointer transition-all duration-50 gap-3"
      style={{ padding: "10px", color: `${indexColor}` }}
    >
      <div className="w-1/12  flex justify-center items-center">
        {index > 2 ? (
          <span
            className="text-[#79B933] font-bold"
            style={{ color: `${indexColor}` }}
          >
            {index + 1}
          </span>
        ) : index === 0 ? (
          <img src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/9e4f18c0bc42c7508d5fa5b18346af11.svg" />
        ) : index === 1 ? (
          <img src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/cc7b8f8582e9cfb88408ab851ec2e9bd.svg" />
        ) : index === 2 ? (
          <img src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/eef523c872b71178ef5acb2442d453a2.svg" />
        ) : (
          <div></div>
        )}
      </div>
      <div className="w-1/12">
        <img
          className="rounded-full w-[50px]"
          src="https://simg-ssl.duolingo.com/ssr-avatars/1288943247/SSR-Dnq9imvO9g/xxlarge"
          alt="avatar"
        />
      </div>
      <div
        className="w-7/12 font-semibold flex items-center"
        style={{ paddingLeft: "10px" }}
      >
        {userRanking.nickName}
      </div>
      <div className="w-2/12 flex justify-end opacity-90 items-center font-semibold">
        {userRanking.experiencePoint} KN
      </div>
    </div>
  );
};
export default UserRankingBar;
