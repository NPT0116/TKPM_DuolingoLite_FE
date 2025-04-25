import React, { useEffect, useRef } from "react";
import congratulationImage from "../../../../assets/imgs/congratulation_image.png";
import congratulationSound from "../../../../assets/sounds/congratulation_sound.mp4";

interface CongratulationPageProps {
  xp: number;
  correctRate: number;
}

const CongratulationPage: React.FC<CongratulationPageProps> = ({
  xp = 0,
  correctRate = 0,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((e) => {
        console.warn("Cannot autoplay sound (user interaction required)", e);
      });
    }
  }, []);
  return (
    <div className="w-full h-[80vh] flex items-center overflow-auto">
      <audio ref={audioRef} src={congratulationSound} />
      <div className="flex flex-col items-center w-full">
        <img src={congratulationImage} alt="congratulation" />
        <div
          className="flex flex-col items-center gap-4 text-[#52656D] font-bold text-[19px]"
          style={{ margin: "40px 0" }}
        >
          <span className="text-[#FFC700] font-bold text-[32px]">
            Tuyệt vời!
          </span>
          <span>
            Bạn đã củng cố được kỹ năng tiếng anh. Cố gắng phát huy nhé!
          </span>
        </div>
        <div className="flex gap-4 bg-[#121E26] w-[20%] rounded-md">
          {/* Total XP Card */}
          <div
            className="flex flex-col items-center gap-4 justify-center bg-[#FFC700]  w-full  rounded-[16px] "
            style={{ padding: "5px" }}
          >
            <span className="text-sm font-bold">TỔNG ĐIỂM KN</span>
            <div
              className="flex items-center justify-center gap-2 font-bold text-lg bg-[#131F24] w-full rounded-[16px]"
              style={{ padding: "20px 0px" }}
            >
              <img
                src="https://d35aaqx5ub95lt.cloudfront.net/images/icons/f5358b2d4087a109790fc809eedc08c5.svg"
                alt=""
              />
              <span className="text-[#FFC700]">{xp}</span>
            </div>
          </div>

          {/* Accuracy Card */}
          <div
            className="flex flex-col items-center gap-4 justify-center bg-[#93D333]  w-full  rounded-[16px]"
            style={{ padding: "5px" }}
          >
            <span className="text-sm font-bold">CHÍNH XÁC!</span>
            <div
              className="flex items-center justify-center gap-2 text-lg font-bold bg-[#131F24] w-full rounded-[16px]"
              style={{ padding: "20px 0px" }}
            >
              <img
                src="https://d35aaqx5ub95lt.cloudfront.net/images/icons/9ace13520a375f5661415ff7d470f243.svg"
                alt=""
              />
              <span className="text-[#93D333]">{correctRate}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CongratulationPage;
