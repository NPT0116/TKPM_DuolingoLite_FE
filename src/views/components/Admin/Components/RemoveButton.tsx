interface IRemoveButton {
  onClick: () => void;
  content?: string;
}
const RemoveButton: React.FC<IRemoveButton> = ({ onClick, content }) => {
  return (
    <div
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      style={{ padding: "10px" }}
      className="w-full h-full rounded-xl flex justify-center items-center text-center bg-[#F7F7F7] text-[#AFAFAF] text-bold border-1 border-dashed hover:scale-102 
        hover:bg-red-500 hover:text-white hover:border-white transition-all duration-200 cursor-pointer
        font-bold text-xl"
    >
      {content ? content : "-"}
    </div>
  );
};
export default RemoveButton;
