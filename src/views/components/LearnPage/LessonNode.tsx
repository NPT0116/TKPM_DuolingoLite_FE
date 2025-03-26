/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ILessonInformation, ILessonValue } from "../../../interfaces/Course";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserHeart } from "../../../services/User/GetHeartService";
interface ILessonNode {
  topColor: string;
  botColor: string;
  shadowColor: string;
  transX: string;
  lessonInformation: ILessonInformation;
  courseId?: string;
  isEnable: boolean;
  isFinished: boolean;
  whiteIcon: string;
  grayIcon: string;
  currentOrder: number;
  lessonOrder: number;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
}
const LessonNode: React.FC<ILessonNode> = ({
  topColor,
  botColor,
  shadowColor,
  transX,
  lessonInformation,
  courseId,
  isEnable,
  isFinished,
  whiteIcon,
  grayIcon,
  currentOrder,
  lessonOrder,
  setShowToast,
}) => {
  const [userHeart, setUserHeart] = useState<number>(0);
  const navigate = useNavigate();
  const nodeColor = css`
    background: #${isEnable ? botColor : "2C383F"};
    &::before {
      background: #${isEnable ? topColor : "37464F"};
    }
  `;
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
  }, []);

  const goToLessonPage = () => {
    navigate("/lesson", {
      state: { lessonInformation, courseId, currentOrder, lessonOrder },
    });
  };

  const handleClick = () => {
    if (!isEnable) return;

    if (userHeart !== 0) {
      goToLessonPage();
    } else {
      setShowToast(true);
    }
  };
  return (
    <button
      onClick={handleClick}
      css={nodeColor}
      style={{ transform: `translateX(${transX}px)` }}
      className={`cursor-pointer group hover:before:translate-y-[-8px] relative flex justify-center items-center w-[70px] h-[58px] rounded-[100%] rounded-tr-[50px] rounded-tl-[50px] before:absolute before:translate-y-[-10px]  before:flex before:justify-center before:items-center before:w-[70px] before:h-[58px] before:rounded-[100%]`}
    >
      <img
        src={
          isFinished
            ? "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/bfa591f6854b4de08e1656b3e8ca084f.svg"
            : isEnable
            ? whiteIcon
            : grayIcon
        }
        className="h-[60%] w-[60%] group-hover:translate-y-[-6px] translate-y-[-8px] z-50"
        alt=""
      />
      <span className="h-[46px] rounded-[100%] w-[56px] absolute group-hover:translate-y-[-8px] translate-x-[-1px] translate-y-[-10px]">
        <svg
          width="56"
          height="46"
          viewBox="0 0 56 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M34.2346 3.25135C35.3157 2.1269 34.7053 0.276787 33.1512 0.143156C32.0512 0.0485729 30.9331 0 29.8002 0C13.342 0 0 10.2517 0 22.8979C0 26.3985 1.02236 29.7157 2.85016 32.6827C3.47761 33.7012 4.88715 33.7751 5.71626 32.9128L34.2346 3.25135Z"
            fill={isEnable ? `$#${shadowColor}` : ""}
          ></path>
          <path
            d="M55.0954 12.5231C53.3548 9.61289 49.8186 6.8733 47.2219 5.21074C46.2417 4.58319 44.9772 4.77038 44.1616 5.60066C34.5035 15.4328 18.3374 31.8498 12.05 38.0427C10.9724 39.1041 10.996 40.8688 12.249 41.716C16.2271 44.4058 20.9121 45.5851 23.4852 45.9072C24.1853 45.9949 24.8657 45.7259 25.3691 45.2315C34.775 35.9934 50.2041 19.9015 54.7166 15.0879C55.3787 14.3818 55.5923 13.3539 55.0954 12.5231Z"
            fill={isEnable ? `#${shadowColor}` : ""}
          ></path>
        </svg>
      </span>
    </button>
  );
};
export default LessonNode;
