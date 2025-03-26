import { useEffect, useRef, useState } from "react";
import { getUserHeart } from "../../../services/User/GetHeartService";
import { postLoseHeart } from "../../../services/User/PostLoseHeartService";
import { useNavigate } from "react-router-dom";
import ic_heart_white from "../../../assets/icons/ic_white_heart.png";
import { getUserProfile } from "../../../services/Authentication/AuthService";

interface LessonHeartProps {
  isButtonCorrect?: boolean;
  isSubmit?: boolean;
  state: number;
}

const handlePostLoseHeart = async () => {
  try {
    await postLoseHeart();
  } catch (err) {
    console.error("Error while post lose heart", err);
  }
};

const LessonHeart: React.FC<LessonHeartProps> = ({
  isButtonCorrect,
  isSubmit,
  state,
}) => {
  const [isPremium, setIsPremium] = useState(false);
  const [userHeart, setUserHeart] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const fetched = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!fetched.current) {
      fetched.current = true; // Đánh dấu rằng API đã được gọi
      const fetchUserProfile = async () => {
        try {
          const userData = await getUserProfile();
          setIsPremium(userData.value.subscription !== null);
        } catch (err) {
          console.log("Failed to fetch user profile: " + err);
        }
      };
      fetchUserProfile();
    }
  }, []);

  useEffect(() => {
    const fetchUserHeart = async () => {
      try {
        const userHeartData = await getUserHeart();
        setUserHeart(userHeartData.value.remainingHearts);
      } catch (err) {
        console.log("Failed to fetch user heart in RightSideLayout" + err);
      }
    };

    fetchUserHeart();
  }, [state]);

  useEffect(() => {
    if (isSubmit && !isButtonCorrect && !isPremium) {
      handlePostLoseHeart();
      setAnimate(true);
      setTimeout(() => {
        setUserHeart((prev) => {
          const newVal = Math.max(prev - 1, 0);
          if (newVal === 0) setShowToast(true);
          return newVal;
        });
      }, 300);

      setTimeout(() => {
        setAnimate(false);
      }, 300);
    }
  }, [isSubmit, isButtonCorrect]);

  return (
    <>
      {isPremium ? (
        <div
          className={`flex h-[40px] items-center justify-center gap-2 text-[#EE5555] transition-transform  font-bold ${
            animate ? "scale-75 animate-pulse" : "scale-100"
          }`}
          style={{ padding: "0 16px 0 10px", marginTop: "48px" }}
        >
          <img
            src="https://d35aaqx5ub95lt.cloudfront.net/images/hearts/0c1a523b4b5882a97e4df162f4b5c58b.svg"
            alt="heart"
            className="w-[32px] h-[32px] "
          />

          <img
            src="https://d35aaqx5ub95lt.cloudfront.net/images/hearts/8d4c5fcd9cedabfd155d3eda8af269bc.svg"
            alt=""
          />
        </div>
      ) : (
        <div
          className={`flex h-[40px] items-center justify-center gap-2 text-[#EE5555] transition-transform  font-bold ${
            animate ? "scale-75 animate-pulse" : "scale-100"
          }`}
          style={{ padding: "0 16px 0 10px", marginTop: "48px" }}
        >
          <img
            src="https://d35aaqx5ub95lt.cloudfront.net/images/hearts/7631e3ee734dd4fe7792626b59457fa4.svg"
            alt="heart"
            className="w-[32px] h-[32px] "
          />

          <span>{userHeart}</span>
        </div>
      )}
      {/* Overlay + Toast */}
      {showToast && (
        <div className="fixed top-0 left-0 w-full h-full z-50 bg-black/20 backdrop-blur-none flex justify-center items-center">
          <div
            className="bg-[#131F24] text-white font-bold p-8 rounded-2xl shadow-xl flex flex-col items-center gap-4 w-full sm:w-[70%] md:w-[400px] text-center"
            style={{ padding: "30px" }}
          >
            <img
              src="https://d35aaqx5ub95lt.cloudfront.net/images/48d11e733b7b84a998e06460930feed7.svg"
              alt=""
            />
            <h2
              className="text-[25px] font-bold"
              style={{ marginBottom: "20px" }}
            >
              Bạn đã hết tim. Hãy nghỉ ngơi và quay lại sau nhé!
            </h2>

            <button
              className="bg-[#49C0F8] hover:bg-[#50D3FF] text-black text-[15px] font-bold rounded-2xl transition w-full h-[46px] active:translate-y-[2px]"
              style={{ boxShadow: "0 3px 0 0 #1899D6" }}
              onMouseDown={(e) => {
                e.currentTarget.style.boxShadow = "0 0 0 0 #1899D6";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.boxShadow = "0 3px 0 0 #1899D6";
              }}
              onClick={() => navigate("/")}
            >
              TRỞ VỀ TRANG CHỦ
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LessonHeart;
