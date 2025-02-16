interface IOptionButton {
  imgUrl: string;
  content: string;
}

const OptionButton: React.FC<IOptionButton> = ({ imgUrl, content }) => {
  return (
    <button
      className="text-white cursor-pointer w-full h-full rounded-xl flex justify-start items-center font-bold border-[2px] border-b-[4px] border-[#37464F] active:border-b-[2px] active:translate-y-[2px] focus:text-[#1997D4] focus:border-[#3F85A7] active:border-[#3F85A7]"
      style={{
        padding: "0px 20px",
      }}
    >
      <img src={imgUrl} alt="" width="35" style={{ marginRight: "10px" }} />
      <span>{content}</span>
    </button>
  );
};
export default OptionButton;
