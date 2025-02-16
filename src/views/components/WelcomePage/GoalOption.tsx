interface IGoalOption {
  frequency: string;
  level: string;
}

const GoalOption: React.FC<IGoalOption> = ({ frequency, level }) => {
  return (
    <button
      className="text-white cursor-pointer w-full h-full rounded-xl flex justify-between items-center font-bold border-[2px] border-b-[4px] border-[#37464F] active:border-b-[2px] active:translate-y-[2px] focus:text-[#1997D4] focus:border-[#3F85A7] active:border-[#3F85A7]"
      style={{
        padding: "0px 20px",
      }}
    >
      <span>{frequency}</span>
      <span className="font-medium">{level}</span>
    </button>
  );
};
export default GoalOption;
