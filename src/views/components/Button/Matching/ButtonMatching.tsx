/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { usePlayAudio } from "../../LearnPage/Audio/AudioProvider";
import { useState } from "react";
import { IMatchingOption } from "../../../../interfaces/Options/IMatchingOption";

interface IButtonMatching {
  option: any;
  onClick?: () => void;
  disabled: boolean;
  index: number;
  isApplyReleased: boolean;
  isInWrongList?: boolean;
  buttonHeight?: string;
}
// Voice Wave Animation
const fluctuate = keyframes`
  0% { transform: scaleY(1); }
  25% { transform: scaleY(1.8); }
  50% { transform: scaleY(0.6); }
  75% { transform: scaleY(1.5); }
  100% { transform: scaleY(1); }
`;
// Released Button Animation
const releasedButtonEffect = keyframes`
  0% {transform: Scale(1.0);}
  50% {transform: Scale(1.05);}
  100% {transform: Scale(1.0);}
`;
// Button Animation
const normalButton = css`
  background: #131f24;
  border-color: #37464f;
`;
const activeButton = css`
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  &:active {
    border-bottom-width: 2px;
    transform: TranslateY(1px);
    transform-color: duration;
  }
`;
const disabledButtonEffect = keyframes`
  0% {border-color: #3F85A7; transform:scale(1.0);}
  50% {border-color: #79B933; color:#79B933; transform:scale(1.05);}
  100% {border-color: #37464F; transform:scale(1.0);}
`;
const disabledButton = css`
  color: #37464f;
  cursor: default;
  animation: ${disabledButtonEffect} 0.3s ease-in-out;
`;
const releasedButton = css`
  background: #202f36 !important;
  border-color: #3f85a7 !important;
  animation: ${releasedButtonEffect} 0.3s ease-in-out;
`;
// Wrong Button Effect
const wrongButtonEffect = keyframes`
  0% {
    border-color: #3f85a7;
    color:red;
    transform: scale(1);
  }
  25% {
    border-color: red;
    color:red;
    transform: scale(1.06);
  }
  35% {
    border-color: red;
    color:red;
    transform: scale(1);
  }
  50% {
    border-color: red;
    color:red;
    transform: scale(1.04);
  }
  65% {
    border-color: red;
    color:red;
    transform: scale(1);
  }
  70% {
    border-color: red;
    color:red;
    transform: scale(1.02);
  }
  100% {
    border-color: #37464f;
    color:red;
    transform: scale(1);
  }
`;

const wrongButton = css`
  animation: ${wrongButtonEffect} 0.5s ease-in-out !important;
`;

const ButtonMatching: React.FC<IButtonMatching> = ({
  option,
  onClick,
  disabled,
  index,
  isApplyReleased,
  isInWrongList,
  buttonHeight,
}) => {
  // dummy test
  // Preparing
  const playAudio = usePlayAudio();
  const type = option.type;
  // Audio Handle
  const [isAudioPlay, setAudioPlay] = useState(false);
  const waveBars = Array(10).fill(null);
  const waveBarElements = waveBars.map((_, index) => (
    <div
      key={index}
      css={css`
        background-color: ${disabled
          ? `#37464F`
          : isInWrongList
          ? "red"
          : `#41ace0`};
        width: 5px;
        height: 10px;
        border-radius: 9999px;
        ${isAudioPlay &&
        !disabled &&
        !isInWrongList &&
        css`
          animation: ${fluctuate} 1.2s ease-in-out;
          animation-delay: ${index * 0.2}s;
        `}
      `}
    />
  ));
  // Handle type
  const handleType = (option: any) => {
    switch (option.type) {
      case "Audio":
        return waveBarElements;
      case "EnglishText":
        return option.englishText;
      case "VietnameseText":
        return option.vietnameseText;
      case "Image":
        if (option.image && option.image.url) {
          return (
            <img
              className="w-full h-full rounded-lg"
              src={option.image.url}
              css={
                disabled
                  ? css`
                      object-fit: cover;
                      opacity: 0.5;
                    `
                  : css`
                      object-fit: cover;
                    `
              }
            />
          );
        } else {
          return null;
        }
      default:
        return null;
    }
  };
  //
  const handlePlayAudio = () => {
    if (option.audio && option.audio.url) {
      playAudio(option.audio.url);
      if (type === "Audio") {
        setAudioPlay(true);
        setTimeout(() => {
          setAudioPlay(false);
        }, 1000);
      }
    }
  };
  // Button Handle Release

  const [isReleased, setIsReleased] = useState(false);
  // Return
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) {
          onClick();
        }
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        setIsReleased(false);
      }}
      onMouseUp={(e) => {
        if (disabled) return;
        e.stopPropagation();

        handlePlayAudio();
        setIsReleased(true);
        setTimeout(() => {
          // setIsReleased(false);
        }, 200);
      }}
      className="group gap-2 w-full flex justify-start items-center text-white font-bold  rounded-xl
               border-[#37464F] border-2 border-b-4 
                 overflow-hidden"
      style={{ padding: "20px", height: `${buttonHeight}` }}
      css={
        disabled
          ? [disabledButton]
          : isInWrongList
          ? wrongButton
          : isApplyReleased
          ? isReleased
            ? [releasedButton]
            : [activeButton]
          : [normalButton, activeButton]
      }
    >
      <div
        className="border-inherit border-2 rounded-md"
        style={{ padding: "1px 6px" }}
      >
        {index + 1}
      </div>
      <div
        className="w-full h-full flex justify-center items-center gap-1 rounded-lg group-active:bg-[#18252B] overflow-hidden"
        style={{ padding: "10px 0" }}
      >
        {" "}
        {handleType(option)}
      </div>
    </div>
  );
};
export default ButtonMatching;
