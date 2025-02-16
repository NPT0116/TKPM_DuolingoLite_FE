import OptionButton from "../../components/WelcomePage/OptionButton";
const ProficiencyPage: React.FC = () => {
  return (
    <div
      className="grid grid-cols-1 grid-rows-5 items-center w-full h-full gap-3"
      style={{ padding: "50px 400px" }}
    >
      <OptionButton
        imgUrl="https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/5f3f4451d9b4ceb393aa44aa3b44f8ff.svg"
        content="Tôi mới học tiếng Anh"
      />
      <OptionButton
        imgUrl="https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/06f993f9019fb13ce4741ba9fe2cfb41.svg"
        content="Tôi biết một vài từ thông dụng"
      />
      <OptionButton
        imgUrl="https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/42a5b255caeca300ca1a80bb69f5bb16.svg"
        content="Tôi có thể giao tiếp cơ bản"
      />
      <OptionButton
        imgUrl="https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/c428ae5ee9c14e872d59ae26543c6fda.svg"
        content="Tôi có thể nói về nhiều chủ đề"
      />
      <OptionButton
        imgUrl="https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/cd5dbf897151b9edc42919324382e4b7.svg"
        content="Tôi có thể thảo luận sâu về hầu hết các chủ đề"
      />
    </div>
  );
};
export default ProficiencyPage;
