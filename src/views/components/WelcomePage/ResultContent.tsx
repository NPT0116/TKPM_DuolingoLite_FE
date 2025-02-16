interface IResultContent {
  imgUrl: string;
  mainContent: string;
  subContent: string;
}

const ResultContent: React.FC<IResultContent> = ({
  imgUrl,
  mainContent,
  subContent,
}) => {
  return (
    <div
      className="font-bold text-white flex flex-row gap-4 border-b-[2px] border-[#202F36] "
      style={{ padding: "10px 0px" }}
    >
      <img src={imgUrl} alt="" />
      <div className="flex flex-col gap-1">
        <span>{mainContent}</span>
        <span className="text-[12px] font-medium">{subContent}</span>
      </div>
    </div>
  );
};
export default ResultContent;
