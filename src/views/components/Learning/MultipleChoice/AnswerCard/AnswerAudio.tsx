/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { useState } from "react";
import { IMultipleChoiceOption } from "../../../../../interfaces/Options/IMultipleChoiceOption";
import { usePlayAudio } from "../../../LearnPage/Audio/AudioProvider";

interface AnswerAudioProps {
  option: IMultipleChoiceOption;
  index: number;
  isSelected: boolean;
  isSubmit: boolean;
  onSelect: () => void;
}

const fluctuate = keyframes`
  0% { transform: scaleY(1); }
  25% { transform: scaleY(1.8); }
  50% { transform: scaleY(0.6); }
  75% { transform: scaleY(1.5); }
  100% { transform: scaleY(1); }
`;

const AnswerAudio: React.FC<AnswerAudioProps> = ({
  option,
  index,
  isSelected,
  isSubmit,
  onSelect,
}) => {
  const playAudio = usePlayAudio();
  const [isAudioPlay, setIsAudioPlay] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handlePlay = () => {
    if (option.audio?.url) {
      playAudio(option.audio.url);
      setIsAudioPlay(true);
      setTimeout(() => setIsAudioPlay(false), 1000);
    }
  };

  const waveBars = Array(10)
    .fill(null)
    .map((_, i) => (
      <div
        key={i}
        css={css`
          width: 5px;
          height: 10px;
          background-color: ${isSubmit
            ? isSelected && option.isCorrect
              ? "#5F8428"
              : isSelected
              ? "#3F85A7"
              : "#37464F"
            : "#41ace0"};
          border-radius: 9999px;
          ${isAudioPlay &&
          css`
            animation: ${fluctuate} 1.2s ease-in-out;
            animation-delay: ${i * 0.2}s;
          `}
        `}
      />
    ));

  const borderColor = isSubmit
    ? isSelected && option.isCorrect
      ? "#5F8428"
      : isSelected
      ? "#3F85A7"
      : "#37464F"
    : isSelected
    ? "#3F85A7"
    : "#37464F";

  const boxShadow = `0 2.5px 0 0 ${borderColor}`;

  return (
    <div
      className={`group gap-2 w-full flex justify-start items-center font-bold rounded-xl border-2 border-b-4 overflow-hidden ${
        !isSubmit ? "cursor-pointer hover:bg-[#202F36]" : ""
      } ${isPressed ? "translate-y-[2px]" : ""}`}
      style={{
        padding: "20px",
        borderColor: borderColor,
        boxShadow: boxShadow,
      }}
      onMouseDown={(e) => {
        if (isSubmit) return;
        e.currentTarget.style.boxShadow = "0 0 0 0";
        setIsPressed(true);
      }}
      onMouseUp={(e) => {
        if (isSubmit) return;
        e.currentTarget.style.boxShadow = boxShadow;
        setIsPressed(false);
        handlePlay();
        onSelect();
      }}
    >
      <div
        className="border-inherit border-2 rounded-md text-white"
        style={{ padding: "1px 6px" }}
      >
        {index + 1}
      </div>
      <div className="w-full h-full flex justify-center items-center gap-1 rounded-lg overflow-hidden">
        {waveBars}
      </div>
    </div>
  );
};

export default AnswerAudio;
