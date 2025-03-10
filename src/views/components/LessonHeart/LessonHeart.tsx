import { useEffect, useState } from "react";

interface LessonHeartProps {
  heartNumber?: number;
  isButtonCorrect?: boolean;
  isSubmit?: boolean;
}

const LessonHeart: React.FC<LessonHeartProps> = ({
  heartNumber,
  isButtonCorrect,
  isSubmit,
}) => {
  const [heart, setHeart] = useState(heartNumber);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setHeart(heartNumber);
  }, [heartNumber]);

  useEffect(() => {
    if (isSubmit && !isButtonCorrect) {
      setAnimate(true);
      setTimeout(() => {
        setHeart((prev) => Math.max(prev - 1, 0));
      }, 300);

      setTimeout(() => {
        setAnimate(false);
      }, 300);
    }
  }, [isSubmit, isButtonCorrect]);

  return (
    <div
      className={`flex h-[40px] items-center justify-center gap-2 text-[#EE5555] transition-transform  font-bold ${
        animate ? "scale-75 animate-pulse" : "scale-100"
      }`}
      style={{ padding: "0 16px 0 10px", marginTop: "48px" }}
    >
      <img
        src="https://d35aaqx5ub95lt.cloudfront.net/images/hearts/7631e3ee734dd4fe7792626b59457fa4.svg"
        alt="heart"
        className="w-[32px] h-[32px]"
      />
      <span>{heart}</span>
    </div>
  );
};

export default LessonHeart;
