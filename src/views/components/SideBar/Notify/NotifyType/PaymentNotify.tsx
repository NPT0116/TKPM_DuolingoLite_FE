interface PaymentNotifyProps {
  title: string;
  message: string;
}

const PaymentNotify: React.FC<PaymentNotifyProps> = ({ title, message }) => {
  return (
    <li className="  cursor-pointer rounded-xl">
      <div
        className="bg-[#9cf22b]  hover:bg-[#acf742] transition-colors ease-in-out flex rounded-xl"
        style={{ padding: "10px" }}
      >
        <img
          src="https://design.duolingo.com/fe225c25f1c6afe81424.svg"
          alt=""
          className="w-[100px]"
        />
        <div
          className="border-[#7fc91e] bg-white/20 border-2 h-fit p-4 rounded-2xl relative text-[#1F1F1F]"
          style={{ padding: "10px" }}
        >
          {/* Title */}
          <h2
            className="flex gap-1 text-[22px] text-[#44910a] border-b-3 border-[#95D346] w-fit"
            style={{ marginBottom: "5px" }}
          >
            {title.length !== 0 ? title : "Thông báo !"}
          </h2>
          <span className="font-semibold">
            {message.length !== 0
              ? message
              : "Bạn còn 2 ngày trải nghiệm Premium, hãy đăng ký thêm nào."}
          </span>
        </div>
      </div>
    </li>
  );
};

export default PaymentNotify;
