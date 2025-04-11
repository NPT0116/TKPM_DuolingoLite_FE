import RemoveButton from "./RemoveButton";

interface IPopupHeader {
  turnOff?: () => void;
  headerTitle?: string;
  isReloadButton?: boolean;
  handleReload?: () => void;
  isDeleteButton?: boolean;
  handleDelete?: () => void;
}
const PopupHeader: React.FC<IPopupHeader> = ({
  turnOff,
  headerTitle,
  isReloadButton,
  handleReload,
  isDeleteButton,
  handleDelete,
}) => {
  return (
    <div
      className="relative w-full h-full border-b-2 border-[#E5E5E5] flex justify-end items-center gap-4"
      style={{ padding: "20px" }}
    >
      <div className="absolute top-0 left-0 w-full h-full font-bold text-2xl flex justify-center items-center !z-0">
        {headerTitle}
      </div>
      {isDeleteButton && (
        <div className="!z-10 ">
          <RemoveButton
            content="Delete Lesson"
            onClick={() => {
              if (handleDelete) handleDelete();
            }}
          />
        </div>
      )}
      {isReloadButton && (
        <img
          onClick={() => {
            if (turnOff) {
              turnOff();
            }
            if (handleReload) {
              handleReload();
            }
          }}
          style={{ padding: "5px" }}
          width={30}
          className="opacity-50 cursor-pointer hover:opacity-80 !z-10 hover:bg-gray-100 rounded-full transition-all duration-200"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Refresh_icon.svg/2048px-Refresh_icon.svg.png"
          alt="CancelAddQuiz"
        />
      )}

      <img
        onClick={turnOff}
        style={{ padding: "5px" }}
        className="cursor-pointer !z-10 hover:bg-gray-100 rounded-full transition-all duration-200"
        src="https://schools-cdn.duolingo.com/images/820ea64de9b060e534c11110cd80b7fd.svg"
        alt="CancelAddQuiz"
      />
    </div>
  );
};
export default PopupHeader;
