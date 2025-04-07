interface IQuizOption {
  index: number;
  type: string;
  onClick: () => void;
}
const QuestionChoice: React.FC<IQuizOption> = ({ index, type, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-full h-[70px] active:translate-y-[1px] active:border-b-1 rounded-lg border-1 border-b-3 bg-gray-200 hover:bg-gray-50 cursor-pointer flex justify-start items-center gap-4"
      style={{ padding: "10px" }}
    >
      <span
        className="text-gray-700 font-bold border-1 rounded-sm"
        style={{ padding: "2px 5px" }}
      >
        {index}
      </span>
      <span className="w-fit font-semibold">{type}</span>
    </div>
  );
};
export default QuestionChoice;
