/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { useEffect, useState } from "react";
import {
  IVNContent,
  IELContent,
} from "../../../../interfaces/Options/IMatchingOption";
type Content = IELContent | IVNContent;
interface IButtonMatching {
  setPickingQueue: React.Dispatch<React.SetStateAction<any>>;
  setWrongPickingList: React.Dispatch<React.SetStateAction<any>>;
  correctPickingList: string[];
  content: IELContent | IVNContent;
  wrongPickingList: Content[];
}
const isVietnameseContent = (
  content: IVNContent | IELContent
): content is IVNContent => {
  return (content as IVNContent).vietnameseText !== undefined;
};

const keyframes_ScaleFocus = css`
  @keyframes scaleFocus {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
`;
const keyframes_BorderColor = css`
  @keyframes borderAnimation {
    0% {
      border-color: #37464f;
    }
    50% {
      border-color: #93d333;
    }
    100% {
      border-color: #37464f;
    }
  }
`;
const bounceInScale = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
`;
const CSS_Default = css`
  ${keyframes_ScaleFocus}
  &:focus {
    animation: scaleFocus 0.3s ease-in;
    background: #202f36;
    border-color: #3f85a7;
  }
`;

const CSS_Correct = css`
  ${keyframes_BorderColor}
  ${keyframes_ScaleFocus}
  color: #37464f;
  cursor: default;
  pointer-events: none;
  animation: scaleFocus 0.3s ease-in, borderAnimation 0.3s ease-in;
  &:focus {
    border-color: #37464f;
    background: #131f23;
  }
`;
const CSS_Wrong = css`
  ${bounceInScale}
  color: #b6807e;
  border-color: #6c5152;
  animation: ${bounceInScale} 0.5s ease-in-out;
`;
// Type guard to check if an item is IVNContent
function isIVNContent(item: Content): item is IVNContent {
  return (item as IVNContent).vietnameseText !== undefined;
}

// Type guard to check if an item is IELContent
function isIELContent(item: Content): item is IELContent {
  return (item as IELContent).englishText !== undefined;
}

function checkSameType(item1: Content, item2: Content) {
  return (
    (isVietnameseContent(item1) && isVietnameseContent(item2)) ||
    (isIELContent(item1) && isIELContent(item2))
  );
}
const ButtonMatching: React.FC<IButtonMatching> = ({
  content,
  setPickingQueue,
  correctPickingList,
  wrongPickingList,
  setWrongPickingList,
}) => {
  const playAudio = () => {
    if (isIELContent(content)) {
      const audio = new Audio(content.audio.url);
      audio.play();
    }
  };
  const [tempWrong, setTempWrong] = useState(false);
  useEffect(() => {
    const isWrong = wrongPickingList.some((item) => {
      return item.optionId == content.optionId && checkSameType(item, content);
    });
    if (isWrong) {
      console.log("wrong");
      setTempWrong(true);
      const timer = setTimeout(() => {
        setWrongPickingList([]);
        setTempWrong(false);
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [wrongPickingList]);

  const displayText = isVietnameseContent(content)
    ? content.vietnameseText
    : content.englishText;
  const isCorrect = correctPickingList.includes(content.optionId);
  return (
    <button
      css={
        tempWrong ? CSS_Wrong : isCorrect == true ? CSS_Correct : CSS_Default
      }
      onClick={(e) => {
        e.stopPropagation();
        playAudio();
        setPickingQueue((prev: any) => {
          const isSelf = prev.some(
            (item: Content) => JSON.stringify(item) === JSON.stringify(content)
          );
          const isSameType = prev.some((item: Content) => {
            return checkSameType(content, item);
          });
          const isSolved = correctPickingList.includes(content.optionId);
          if (!isSolved) {
            if (prev.length < 2 && !isSelf && !isSameType && !isSolved) {
              return [...prev, content];
            } else {
              return [content];
            }
          } else {
            return [];
          }
        });
      }}
      className=" cursor-pointer text-white rounded-xl border-2 border-[#37464F] border-b-5 active:border-b-2 active:translate-y-[2px] "
    >
      {displayText}
    </button>
  );
};
export default ButtonMatching;
