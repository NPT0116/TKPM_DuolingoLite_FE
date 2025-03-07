/** @jsxImportSource @emotion/react */
import AnimatedSpeakerIcon from "./AnimatedSpearkerIcon";
import { useState, useRef } from "react";
import { css } from "@emotion/react";
const arrow = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -20px;

  border-top: 20px solid transparent;
  border-bottom: 0px solid transparent;
  border-right: 20px solid #37464f;

  &::before {
    content: "";
    position: absolute;
    background: 37464f;

    bottom: 2px;
    left: 6px;

    border-top: 16px solid transparent;
    border-bottom: 0px solid transparent;
    border-right: 16px solid #131f23;
  }
`;
const arrowVietnamese = css`
  position: absolute;
  top: -10px;
  transform: translateX(-50%);
  left: 50%;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #37464f;
`;
interface IItem {
  audio: string;
  englishText: string;
  vietnameseText: string;
}
interface IQuestionBox {
  questionElements: IItem[];
  mainAudio?: string;
}
const QuestionBox: React.FC<IQuestionBox> = ({
  questionElements,
  mainAudio,
}) => {
  const [isHover, setIsHover] = useState(false);
  const [hoverItem, setHoverItem] = useState(-1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const queueRef = useRef<IItem | null>(null);

  const handleMouseEnter = (item: IItem, index: number) => {
    setHoverItem(index);
    setIsHover(true);

    if (audioRef.current && !audioRef.current.paused) {
      queueRef.current = item;
    } else {
      playAudio(item);
    }
  };
  const playAudio = (item: IItem) => {
    const audio = new Audio(item.audio);
    audioRef.current = audio;
    audio.onended = () => {
      if (queueRef.current) {
        playAudio(queueRef.current);
        queueRef.current = null;
      }
    };
    audio.play();
  };

  return (
    <div className="relative">
      <div css={arrow}></div>
      <div
        className="flex justify-center items-center  gap-2 border-2 border-[#37464F] rounded-xl"
        style={{ padding: "15px 10px" }}
      >
        <div className="w-[30px]">
          <AnimatedSpeakerIcon mainAudio={mainAudio} />
        </div>
        <div className="flex flex-row">
          {" "}
          {questionElements.map((item, index) => {
            return (
              <div key={index}>
                <div
                  className=" relative font-medium text-white cursor-default border-b-2 border-dashed border-[#52656D]"
                  style={{ marginLeft: "5px", paddingBottom: "5px" }}
                  onMouseEnter={() => {
                    handleMouseEnter(item, index);
                  }}
                  onMouseLeave={() => {
                    setHoverItem(-1);
                    setIsHover(false);
                  }}
                >
                  {item.englishText}
                  {isHover && hoverItem == index && (
                    <div
                      className="absolute w-fit left-1/2 top-[150%] -translate-x-1/2 bg-[#202F36] text-center font-medium text-white border-2 border-[#37464f] rounded-lg"
                      style={{ padding: "10px" }}
                    >
                      {item.vietnameseText}
                      <div css={arrowVietnamese}></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default QuestionBox;
