interface ButtonMonthClickProps {
  month: number;
  money: number;
  upSelling: string;
  onClick?: () => void;
}

export const ButtonMonthClick: React.FC<ButtonMonthClickProps> = ({
  month,
  money,
  upSelling,
  onClick,
}) => {
  return (
    <button
      className="bg-gradient-to-br rounded-[14px] w-full sm:w-[40%] xl:w-[40%] relative max-w-[427px] min-w-[365px] cursor-pointer"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, #26E67A, #268AFF, #EB59FF)",
        padding: "4px",
      }}
      onClick={onClick}
    >
      <img
        src="https://d35aaqx5ub95lt.cloudfront.net/images/super/da83ea01644abf0e0831e733d565d4ae.svg"
        alt=""
        className="w-[30px] h-[30px] absolute right-[-10px] top-[-10px]"
      />
      <div className="bg-white rounded-[10px]">
        <h3
          className="bg-gradient-to-b w-fit rounded-tl-[10px] rounded-br-[10px] translate-x-[-2px] translate-y-[-2px]"
          style={{
            backgroundImage: "linear-gradient(to bottom, #26DF83, #26CBA3)",
            padding: "6px 10px",
          }}
        >
          {upSelling}
        </h3>
        <div
          className="w-full flex justify-between items-center text-[#268AFF] translate-y-[-8px]"
          style={{ padding: "24px 16px" }}
        >
          <h2 className="text-[25px]">{month} month</h2>
          <span className="text-[17px]">₫{money.toLocaleString()}</span>
        </div>
      </div>
    </button>
  );
};
