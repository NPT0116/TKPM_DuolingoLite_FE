import Instruction from "../../../components/Learning/Instruction/Instruction";

const MultipleChoicePage: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center ">
      <div className="w-[600px] h-[450px] flex flex-col gap-[24px]">
        <Instruction instruction="Đâu là 'xe tắc-xi'?" />
        {/* Answer Section */}
        <div className="h-full w-full flex flex-col-3 items-center gap-[8px]">
          {/* Answer Card */}
          <div className="h-[80%] border-2 border-[#37464F] rounded-xl flex flex-col items-center cursor-pointer hover:bg-[#202F36]">
            <img
              src="https://d2pur3iezf4d1j.cloudfront.net/images/557ae6485402007dd47203cedf18f158"
              alt="card-image"
              className="w-[70%] h-[80%] mb-[10px]"
            />
            <div className="flex w-[70%] justify-between ">
              <span className="text-[17px] font-bold text-white">taxi</span>
              <span className="text-[15px] border-2 border-[#37464F] text-[#52656D] h-full aspect-square flex items-center justify-center rounded-lg">
                1
              </span>
            </div>
          </div>
          <div className="h-[80%] border-2 border-[#37464F] rounded-xl flex flex-col items-center cursor-pointer hover:bg-[#202F36]">
            <img
              src="https://d2pur3iezf4d1j.cloudfront.net/images/557ae6485402007dd47203cedf18f158"
              alt="card-image"
              className="w-[70%] h-[80%] mb-[10px]"
            />
            <div className="flex w-[70%] justify-between ">
              <span className="text-[17px] font-bold text-white">taxi</span>
              <span className="text-[15px] border-2 border-[#37464F] text-[#52656D] h-full aspect-square flex items-center justify-center rounded-lg">
                1
              </span>
            </div>
          </div>
          <div className="h-[80%] border-2 border-[#37464F] rounded-xl flex flex-col items-center cursor-pointer hover:bg-[#202F36]">
            <img
              src="https://d2pur3iezf4d1j.cloudfront.net/images/557ae6485402007dd47203cedf18f158"
              alt="card-image"
              className="w-[70%] h-[80%] mb-[10px]"
            />
            <div className="flex w-[70%] justify-between ">
              <span className="text-[17px] font-bold text-white">taxi</span>
              <span className="text-[15px] border-2 border-[#37464F] text-[#52656D] h-full aspect-square flex items-center justify-center rounded-lg">
                1
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultipleChoicePage;
