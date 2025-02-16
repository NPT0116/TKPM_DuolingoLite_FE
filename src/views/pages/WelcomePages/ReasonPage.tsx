import OptionButton from "../../components/WelcomePage/OptionButton";
const ReasonPage: React.FC = () => {
  return (
    <div
      className="grid grid-cols-2 grid-rows-4 items-center w-full h-full gap-3"
      style={{ padding: "70px 300px" }}
    >
      <OptionButton
        imgUrl="https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/484f1c9610935dd40094a9f7cf06e009.svg"
        content="Kết nối với mọi người"
      />
      <OptionButton
        imgUrl="https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/5bbfb55fd21e21012a228bcef29bb557.svg"
        content="Chuẩn bị đi du lịch"
      />
      <OptionButton
        imgUrl="https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/f382d7a1e1a958dc07fca0deae2d16b7.svg"
        content="Sử dụng thời gian hiệu quả"
      />
      <OptionButton
        imgUrl="https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/61a06f02b3b988d1c388d484bc0e52e6.svg"
        content="Phát triển sự nghiệp"
      />
      <OptionButton
        imgUrl="https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/ab81d610a8a79f174a4db0a6085e7e2c.svg"
        content="Giải trí"
      />
      <OptionButton
        imgUrl="https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/d7315c6c7bbeba67df5ebda771d33da1.svg"
        content="Hỗ trợ việc học tập"
      />

      <OptionButton
        imgUrl="https://d35aaqx5ub95lt.cloudfront.net/images/hdyhau/d4419d84cb57b1295591e05cd60e45fb.svg"
        content="Khác"
      />
    </div>
  );
};
export default ReasonPage;
