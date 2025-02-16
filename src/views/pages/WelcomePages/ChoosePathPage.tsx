import PathOption from "../../components/WelcomePage/PathOption";
const ChoosePathPage: React.FC = () => {
  return (
    <div
      className="grid grid-cols-1 grid-rows-2 items-center w-full h-full gap-3"
      style={{ padding: "70px 395px" }}
    >
      <PathOption
        imgUrl="https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/9730040521a168519871561cbea6509e.svg"
        mainTopic="Bắt đầu từ cơ bản"
        subTopic="Học từ những bài dễ nhất trong khóa học Tiếng Anh"
      />
      <PathOption
        imgUrl="https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/03d40e9ad439925dfe47e8e77072318f.svg"
        mainTopic="Xác định trình độ hiện tại"
        subTopic="Hãy để Duo giúp bạn xác định điểm khởi đầu phù hợp nhé"
      />
    </div>
  );
};
export default ChoosePathPage;
