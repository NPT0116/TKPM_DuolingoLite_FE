import { text } from "framer-motion/client";

interface IFooterStatus {
  type: number;
}

const imgUrls = [
  "https://d35aaqx5ub95lt.cloudfront.net/images/2e76e45f3a761f700b7350be8e04fe16.svg",
  "https://d35aaqx5ub95lt.cloudfront.net/images/bd13fa941b2407b4914296afe4435646.svg",
  "https://d35aaqx5ub95lt.cloudfront.net/images/a793ee93ab0ebea37cdf9d5e048aba87.svg",
];
const mainTitles = [
  "Tuyệt",
  "Cứ tiếp tục đi vậy",
  "Hmm...nghe có vẻ không đúng",
];
const subTitle = [
  "Hãy tiếp tục phát huy nhé",
  "Hãy cố gắng hơn nhé",
  "Thử lại lần nữa nhé",
];
const textColors = ["#79B933", "#D84948", "#D79433"];

const footerStatus: React.FC<IFooterStatus> = ({ type }) => {
  return (
    <div className="absolute w-full h-full  bg-[#202F36]">
      {" "}
      <div className="w-1/2 h-full flex justify-center items-center gap-4">
        <div className="bg-[#131F24]  w-[80px] h-[80px] rounded-full flex justify-center items-center">
          <img src={imgUrls[type]} alt="Icon" width="50" />
        </div>
        <div
          className="flex flex-col gap-2"
          style={{ color: textColors[type] }}
        >
          <div className="font-bold text-xl">{mainTitles[type]}</div>
          <div className="font-medium">{subTitle[type]}</div>
        </div>
      </div>
    </div>
  );
};
export default footerStatus;
