interface ButtonMonthUnclickProps {
  month: number;
  money: number;
  upSelling: string;
  onClick?: () => void;
}

export const ButtonMonthUnclick: React.FC<ButtonMonthUnclickProps> = ({
  month,
  money,
  upSelling,
  onClick,
}) => {
  return (
    <button
      className="bg-white rounded-[10px] w-[97%] sm:w-[33%] xl:w-[40] relative opacity-70 max-w-[389px]  min-w-[335px] cursor-pointer"
      onClick={onClick}
    >
      <h3
        className="bg-gradient-to-b w-fit rounded-tl-[10px] rounded-br-[10px]"
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
    </button>
  );
};
