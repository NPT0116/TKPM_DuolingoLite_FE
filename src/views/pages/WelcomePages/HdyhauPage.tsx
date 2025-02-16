import OptionButton from "../../components/WelcomePage/OptionButton";
const HdyhauPage: React.FC = () => {
  return (
    <div
      className="grid grid-cols-2 grid-rows-4 items-center w-full h-full gap-3"
      style={{ padding: "70px 300px" }}
    >
      <OptionButton
        imgUrl="https://d35aaqx5ub95lt.cloudfront.net/images/hdyhau/0d0c3c81ccd1fd2ea84371e6bf4546b3.svg"
        content="Tin tức/báo chí/blog"
      />
      <OptionButton
        imgUrl="https://d35aaqx5ub95lt.cloudfront.net/images/hdyhau/947546a876aaea3a9811abf4cca1b618.svg"
        content="Bạn bè/gia đình"
      />
      <OptionButton
        imgUrl="https://d35aaqx5ub95lt.cloudfront.net/images/hdyhau/b2a0faf7b835cf2ab9a75afe033fdad9.svg"
        content="TV"
      />
      <OptionButton
        imgUrl="https://d35aaqx5ub95lt.cloudfront.net/images/hdyhau/8e3f5e058dd4dd5eb43646c2d1f19b3c.svg"
        content="Tìm kiếm Google"
      />
      <OptionButton
        imgUrl="https://d35aaqx5ub95lt.cloudfront.net/images/hdyhau/f2969a78ee365da5e7676dc6afd8c1b4.svg"
        content="TikTok"
      />
      <OptionButton
        imgUrl="https://d35aaqx5ub95lt.cloudfront.net/images/hdyhau/5ae4d4bc2af930b5bc002b5d0b7cbad7.svg"
        content="Youtube"
      />
      <OptionButton
        imgUrl="https://d35aaqx5ub95lt.cloudfront.net/images/hdyhau/9eb3a5707704c76b653a5e85fbf9ca0e.svg"
        content="Facebook/Instagram"
      />
      <OptionButton
        imgUrl="https://d35aaqx5ub95lt.cloudfront.net/images/hdyhau/d4419d84cb57b1295591e05cd60e45fb.svg"
        content="Khác"
      />
    </div>
  );
};
export default HdyhauPage;
