import ResultContent from "../../components/WelcomePage/ResultContent";
const CourseOverviewPage: React.FC = () => {
  return (
    <div
      className="grid grid-cols-1 grid-rows-3 items-center w-full h-full gap-3"
      style={{ padding: "70px 300px" }}
    >
      <ResultContent
        imgUrl="https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/958e9a5aac8a0aeb099e08c28e327de7.svg"
        mainContent="Tự tin giao tiếp"
        subContent="Các bài học nói và nghe không hề áp lực"
      />
      <ResultContent
        imgUrl="https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/bc1008ae41c90c9b1a6f63bb9e142f7f.svg"
        mainContent="Kho từ vựng đa dạng"
        subContent="Các từ vựng phổ biến và cụm từ thiết thực"
      />
      <ResultContent
        imgUrl="https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/3757137c3beb1fbf0bfe21fdf9254023.svg"
        mainContent="Tạo thói quen học tập"
        subContent="Nhắc nhở thông minh, thử thách vui nhộn và còn nhiều tính năng thú vị khác"
      />
    </div>
  );
};
export default CourseOverviewPage;
