import GoalOption from "../../components/WelcomePage/GoalOption";
const DailyGoalPage: React.FC = () => {
  return (
    <div
      className="grid grid-cols-1 grid-rows-4 items-center w-full h-full gap-3"
      style={{ padding: "70px 400px" }}
    >
      <GoalOption frequency="5 phút / ngày" level="Dễ" />
      <GoalOption frequency="10 phút / ngày" level="Vừa" />
      <GoalOption frequency="15 phút / ngày" level="Khó" />
      <GoalOption frequency="20 phút / ngày" level="Siêu khó" />
    </div>
  );
};
export default DailyGoalPage;
