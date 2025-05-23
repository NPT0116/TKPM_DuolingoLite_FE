import React, { useEffect, useState } from "react";
import icon_check from "../../../assets/icons/ic_check.png";
import ChooseMonth from "../../components/BuyPremium/ChooseMonth";
import { useNavigate } from "react-router-dom";
import { upgradePreimium } from "../../../services/Payment/UpgradePremiumService";

const BuyPremiumPage = () => {
  const [isPaymentSuccess, setIsPaymentSuccess] = useState<boolean>(false);
  const [isTrialButtonClick, setIsTrialButtonClick] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [selectedMoney, setSelectedMoney] = useState<number>(100000);
  const navigate = useNavigate();
  useEffect(() => {
    const query = window.location.search;

    const fetchPaymentResult = async () => {
      if (!query) return;

      try {
        const res = await fetch(
          `http://localhost:5142/api/VnpayPayment/Callback${query}`
        );
        const data = await res.json();
        if (data.isSuccess) setIsPaymentSuccess(true);
      } catch (err) {
        console.error("Lỗi khi gọi API callback:", err);
      }
    };

    fetchPaymentResult();
  }, [navigate]);

  const handleGoHome = () => {
    localStorage.setItem(
      "upgradeAfterPayment",
      JSON.stringify({
        month: selectedMonth,
        money: selectedMoney,
      })
    );
    navigate("/home");
  };

  return (
    <div
      className="w-full h-[100vh] min-h-[100vh] bg-gradient-to-b text-white overflow-auto"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, #0B4B47, #0C316D, #401F73)",
        padding: "20px",
      }}
    >
      <div className="flex justify-end ">
        <img
          src="https://d35aaqx5ub95lt.cloudfront.net/images/super/2e50c3e8358914df5285dc8cf45d0b4c.svg"
          alt=""
          className="w-[103px] absolute right-6 top-5 z-10"
        />
      </div>
      {isPaymentSuccess ? (
        <div className="flex flex-col gap-[40px] justify-center items-center h-full text-[19px] font-bold">
          <div
            className="bg-white/20 rounded-xl flex flex-col"
            style={{ padding: "40px" }}
          >
            <div
              className="w-[50px] h-[50px] rounded-full bg-[#15BD12] flex"
              style={{ padding: "5px", margin: "0px auto 10px" }}
            >
              <img src={icon_check} alt="" />
            </div>
            <span className="text-[22px] text-center">
              Thanh toán thành công
            </span>
            <hr
              className="h-px w-full bg-white/20"
              style={{ margin: "20px 0" }}
            />
            <span className="text-center">Đã mở khoá chức năng</span>
            <span className="text-[#268EF9] text-center">Vô hạn trái tim</span>
          </div>
          <div className="flex">
            <img
              className="h-[200px]"
              src="https://design.duolingo.com/266788168c5f135b35e3.svg"
              alt=""
            />
            <img
              className="h-[200px]"
              src="https://design.duolingo.com/fe225c25f1c6afe81424.svg"
              alt=""
            />
          </div>
          <button className="text-[16px] cursor-pointer" onClick={handleGoHome}>
            QUAY VỀ TRANG CHỦ
          </button>
        </div>
      ) : isTrialButtonClick ? (
        <ChooseMonth
          onSelect={(month, money) => {
            setSelectedMonth(month);
            setSelectedMoney(money);
          }}
        />
      ) : (
        <div
          className="flex flex-col h-full gap-[40px] w-[650px] justify-start items-center"
          style={{ margin: "5% auto" }}
        >
          <h2 className="font-bold text-[40px] text-center ">
            Tiến bộ nhanh hơn trong khóa học tiếng Anh của bạn với Super!
          </h2>
          {/* Grid Layout */}
          <div
            className="bg-white/10 p-6 rounded-xl w-full relative"
            style={{ padding: "24px" }}
          >
            <div className="bg-white/20 h-[80%] w-[31%] absolute right-[24px] rounded-xl"></div>
            <div className="grid grid-cols-3 text-[19px] font-[500]">
              {/* Header Row */}
              <div className=""></div>
              <div
                className=" text-center font-bold"
                style={{ padding: "10px" }}
              >
                MIỄN PHÍ
              </div>
              <div className=" text-center flex justify-center">
                <img
                  src="https://d35aaqx5ub95lt.cloudfront.net/images/super/2e50c3e8358914df5285dc8cf45d0b4c.svg"
                  alt="Super Icon"
                  className="w-[103px]"
                />
              </div>

              {/* Body Rows */}
              {[
                ["Nội dung học", "✔", "✔"],
                ["Vô hạn trái tim", "—", "✔"],
              ].map(([feature, free, superTier], index) => (
                <>
                  {/* Feature Name */}
                  <div
                    key={`feature-${index}`}
                    className={`${
                      index !== 0 && "border-t border-white/30"
                    }  text-left`}
                    style={{ padding: "12px 0px 12px 8px" }}
                  >
                    {feature}
                  </div>

                  {/* Free Column */}
                  <div
                    key={`free-${index}`}
                    className={`${
                      index !== 0 && "border-t border-white/30"
                    } text-center flex items-center justify-center`}
                  >
                    {free === "✔" ? (
                      <img
                        src={icon_check}
                        alt="Check"
                        className="w-[25px] mx-auto"
                      />
                    ) : (
                      <span className="text-[#516B97]">—</span>
                    )}
                  </div>

                  {/* Super Column */}
                  <div
                    key={`super-${index}`}
                    className={`${
                      index !== 0 && "border-t border-white/30"
                    } text-center flex items-center justify-center`}
                  >
                    {superTier === "✔" ? (
                      <img
                        src={icon_check}
                        alt="Check"
                        className="w-[25px] mx-auto"
                      />
                    ) : (
                      "—"
                    )}
                  </div>
                </>
              ))}
            </div>
          </div>
          <div
            className="flex w-full gap-[5%] justify-center"
            style={{ padding: "20px 20px 0px 20px", marginTop: "20px" }}
          >
            <button
              className="text-black text-[16px] font-bold flex items-center justify-center bg-[white] cursor-pointer transition-colors ease-in-out rounded-2xl w-[50%] active:  translate-y-[2px]"
              style={{ padding: "10px", boxShadow: "0 3px 0 0 #9892B9" }}
              onMouseDown={(e) => {
                e.currentTarget.style.boxShadow = "0 0 0 0 #9892B9";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.boxShadow = "0 3px 0 0 #9892B9";
              }}
              onClick={() => setIsTrialButtonClick(true)}
            >
              <span>TRẢI NGHIỆM NGAY</span>
            </button>
          </div>
          <button className="font-bold text-[16px]">
            <a href="/home">Không cảm ơn</a>
          </button>
        </div>
      )}
    </div>
  );
};

export default BuyPremiumPage;
