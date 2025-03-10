import StreakDisplay from "./StreakDisplay";

interface StreakingProps {
  streakNumber?: number;
}

const Streaking: React.FC<StreakingProps> = ({ streakNumber }) => {
  return (
    <div
      className="group flex justify-center items-center gap-2 rounded-xl hover:bg-[#202F36]"
      style={{ padding: "10px 15px" }}
    >
      <img
        src="https://d35aaqx5ub95lt.cloudfront.net/images/icons/398e4298a3b39ce566050e5c041949ef.svg"
        alt="streaking icon"
      />
      <span className=" text-[#FFAB32] font-bold">{streakNumber}</span>
      <div>
        <StreakDisplay />
      </div>
    </div>
  );
};
export default Streaking;
