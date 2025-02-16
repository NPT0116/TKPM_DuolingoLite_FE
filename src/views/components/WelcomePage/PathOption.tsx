interface IPathOption {
  imgUrl: string;
  mainTopic: string;
  subTopic: string;
}

const PathOption: React.FC<IPathOption> = ({ imgUrl, mainTopic, subTopic }) => {
  return (
    <button
      className="text-white cursor-pointer w-full h-full rounded-xl flex gap-4 flex-row justify-start items-center font-bold border-[2px] border-b-[4px] border-[#37464F] active:border-b-[2px] active:translate-y-[2px] focus:text-[#1997D4] focus:border-[#3F85A7] active:border-[#3F85A7]"
      style={{
        padding: "0px 10px",
      }}
    >
      <img src={imgUrl} alt="" width="70" />
      <div className="flex flex-col justify-start items-start gap-1">
        <span>{mainTopic}</span>
        <span className="font-medium text-[14px]">{subTopic} </span>
      </div>
    </button>
  );
};
export default PathOption;
