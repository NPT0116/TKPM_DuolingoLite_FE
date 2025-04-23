import { useEffect, useState } from "react";
import { getVNPaymentUrl } from "../../../services/Payment/GetPaymentUrlService";
import { ButtonMonthClick } from "./Button/ButtonMonthClick";
import { ButtonMonthUnclick } from "./Button/ButtonMonthUnclick";
import { useNavigate } from "react-router-dom";

interface ChooseMonthProps {
  onSelect: (month: number, money: number) => void;
}

const ChooseMonth: React.FC<ChooseMonthProps> = ({ onSelect }) => {
  const months = [1, 2, 3];
  const money = [100000, 200000, 300000];
  const upSelling = ["FOR NEWERS", "MOST POPULAR", "GOOD EXPERIENCE"];
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(selectedIndex);
  }, [selectedIndex]);

  const handlePayment = async () => {
    try {
      const selectedMoney = money[selectedIndex];
      const paymentUrl = await getVNPaymentUrl(selectedMoney);
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        console.error("Error: No payment URL received");
      }
    } catch (err) {
      console.error("Error fetching VNPaymentUrl:", err);
    }
  };
  return (
    <div
      className="font-bold h-full flex flex-col justify-start "
      style={{ marginTop: "100px" }}
    >
      <img
        src="https://d35aaqx5ub95lt.cloudfront.net/images/eab997f62389175bd43e8ea688bbf09d.svg"
        alt=""
        className="absolute left-6 top-5 cursor-pointer z-10"
        onClick={() => navigate("/")}
      />
      <div className="w-full flex flex-col items-center justify-center gap-[40px] ">
        <h2
          className="text-[32px] w-full sm:w-[540px] max-w-[540px] text-center"
          style={{ margin: "0 24px" }}
        >
          Hãy chọn gói tháng cho bạn
        </h2>
        <div
          className="flex flex-col gap-[22px] w-full items-center"
          style={{ margin: "16px" }}
        >
          {months.map((month, index) =>
            selectedIndex === index ? (
              <ButtonMonthClick
                key={index}
                money={money[index]}
                month={month}
                upSelling={upSelling[index]}
                onClick={() => {
                  setSelectedIndex(index);
                  onSelect(months[index], money[index]);
                }}
              />
            ) : (
              <ButtonMonthUnclick
                key={index}
                money={money[index]}
                month={month}
                upSelling={upSelling[index]}
                onClick={() => {
                  setSelectedIndex(index);
                  onSelect(months[index], money[index]);
                }}
              />
            )
          )}
        </div>
        <div className="flex gap-[20px] w-[80%] lg:w-[50%] xl:w-[40%] max-w-[592px]">
          {/* VNPAY button */}
          <button
            className="font-bold flex items-center justify-center bg-white rounded-xl w-full cursor-pointer hover:bg-white/90 transition-colors ease-in-out"
            style={{ padding: "5px" }}
            onClick={handlePayment}
          >
            <img
              src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png"
              alt=""
              className="w-[30px]"
              style={{ marginRight: "10px" }}
            />
            <span className="text-[#EE232B]">VN</span>
            <span className="text-[#0860AD]">PAY</span>
          </button>
          {/* MOMO button */}
          <button
            className="font-bold flex items-center justify-center bg-[#A80869] cursor-pointer hover:bg-[#A80869]/90 transition-colors ease-in-out rounded-xl w-full"
            style={{ padding: "5px" }}
          >
            <img
              src="https://play-lh.googleusercontent.com/uCtnppeJ9ENYdJaSL5av-ZL1ZM1f3b35u9k8EOEjK3ZdyG509_2osbXGH5qzXVmoFv0"
              alt=""
              className="w-[40px] h-auto"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseMonth;
