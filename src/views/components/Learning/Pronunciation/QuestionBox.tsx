/** @jsxImportSource @emotion/react */
import AnimatedSpeakerIcon from "./AnimatedSpearkerIcon";
import { useState, useRef, useEffect } from "react";
import { css } from "@emotion/react";

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
  const isMainAudioPlayingRef = useRef(false);

  // Function to play an audio file with an optional callback when finished
  const playAudio = (src: string, callback?: () => void) => {
    // Stop the previous hover play
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const audio = new Audio(src);
    audioRef.current = audio;
    audio.onended = () => {
      if (callback) {
        callback();
      }
    };
    audio.play().catch((error) => {
      console.error("Audio playback error:", error);
    });
  };

  // Handle mouse hover on an item
  const handleMouseEnter = (item: IItem, index: number) => {
    setHoverItem(index);
    setIsHover(true);

    if (isMainAudioPlayingRef.current) {
      queueRef.current = item;
    } else {
      playAudio(item.audio);
    }
  };

  // Handle playing the main audio when clicking on the speaker icon
  const handleMainAudioPlay = () => {
    if (!mainAudio) return;
    if (!isMainAudioPlayingRef.current) {
      isMainAudioPlayingRef.current = true;
      playAudio(mainAudio, () => {
        isMainAudioPlayingRef.current = false;
        if (queueRef.current) {
          playAudio(queueRef.current.audio);
          queueRef.current = null;
        }
      });
    }
  };
  useEffect(() => {
    console.log("Auto play audio at first");
    isMainAudioPlayingRef.current = true;
    const playAudio = setTimeout(() => {
      const audio = new Audio(mainAudio);
      audio.onended = () => {
        isMainAudioPlayingRef.current = false;
      };
      audio.play();
    }, 1000);
    return () => {
      isMainAudioPlayingRef.current = false;

      clearTimeout(playAudio);
    };
  }, []);

  return (
    <div className="relative">
      <div
        className="flex justify-center items-center gap-2 border-2 border-[#37464F] rounded-xl"
        style={{ padding: "15px 10px" }}
      >
        <div className="w-[30px]">
          <AnimatedSpeakerIcon
            mainAudio={mainAudio}
            onPlay={handleMainAudioPlay}
          />
        </div>
        <div className="flex flex-row">
          {questionElements.map((item, index) => (
            <div key={index}>
              <div
                className="relative font-medium text-white cursor-default border-b-2 border-dashed border-[#52656D]"
                style={{ marginLeft: "5px", paddingBottom: "5px" }}
                onMouseEnter={() => handleMouseEnter(item, index)}
                onMouseLeave={() => {
                  setHoverItem(-1);
                  setIsHover(false);
                }}
              >
                {item.englishText}
                {isHover && hoverItem === index && (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionBox;
