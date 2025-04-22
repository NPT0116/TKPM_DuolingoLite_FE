/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef, useMemo } from "react";
import { IMatchingQuestion } from "../../../../interfaces/Questions/IMatchingQuestion";
import { IMatchingOption } from "../../../../interfaces/Options/IMatchingOption";
import ButtonMatching from "../../../components/Button/Matching/ButtonMatching";
import incorrectSound from "../../../../assets/sounds/duo_incorrect_sound.mp4";
import { usePlayAudio } from "../../../components/LearnPage/Audio/AudioProvider";

interface IMatchingLessonPage {
  setIsButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsButtonCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNext: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSubmit?: React.Dispatch<React.SetStateAction<boolean>>;
  data?: IMatchingQuestion;
}
interface IWrongItem {
  id: string;
  isSource: boolean;
  isTarget: boolean;
}

const MatchingLessonPage: React.FC<IMatchingLessonPage> = ({
  setIsButtonActive,
  setIsButtonCorrect,
  setIsNext,
  setIsSubmit,
  data,
}) => {
  let displayUnit = 5;
  let buttonHeight = "70px";

  if (data?.optionConfigure.image) {
    console.log("option have image");
    buttonHeight = "200px";
    displayUnit = 2;
  }
  // Prepare data
  const getSourceOption = (option: IMatchingOption) => {
    switch (option.sourceType) {
      case "Audio":
        return {
          id: option.optionId,
          type: option.sourceType,
          audio: option.audio,
        };
      case "Image":
        return {
          id: option.optionId,
          type: option.sourceType,
          image: option.image,
        };
      case "VietnameseText":
        return {
          id: option.optionId,
          type: option.sourceType,
          vietnameseText: option.vietnameseText,
        };
      case "EnglishText":
      default:
        return {
          id: option.optionId,
          type: option.sourceType,
          audio: option.audio,
          englishText: option.englishText,
        };
    }
  };
  const getTargetOption = (option: IMatchingOption) => {
    switch (option.targetType) {
      case "Audio":
        return {
          id: option.optionId,
          type: option.targetType,
          audio: option.audio,
        };
      case "Image":
        return {
          id: option.optionId,
          type: option.targetType,
          image: option.image,
        };
      case "VietnameseText":
        return {
          id: option.optionId,
          type: option.targetType,
          vietnameseText: option.vietnameseText,
        };
      case "EnglishText":
      default:
        return {
          id: option.optionId,
          type: option.targetType,
          audio: option.audio,
          englishText: option.englishText,
        };
    }
  };
  const [displayOptions, setDisplayedOptions] = useState<IMatchingOption[]>([]);
  const [remainingOptions, setRemainingOptions] = useState<IMatchingOption[]>(
    []
  );
  const optionsList = data?.options || [];
  const maxDisplaySize =
    optionsList.length > displayUnit ? displayUnit : optionsList.length;
  useEffect(() => {
    const initialDisplayOptions = optionsList.slice(0, maxDisplaySize);
    const remainingOptions = optionsList.slice(
      maxDisplaySize,
      optionsList.length
    );
    setDisplayedOptions(initialDisplayOptions);
    setRemainingOptions(remainingOptions);
  }, [data?.questionId]);
  const sourceOptions = displayOptions!.map((option) => ({
    ...getSourceOption(option),
    isSource: true,
    isTarget: false,
  }));
  const shuffleArray = (array: any[]) => {
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  let targetOptions = useMemo(() => {
    const targets = displayOptions.map((option) => ({
      ...getTargetOption(option),
      isSource: false,
      isTarget: true,
    }));
    return shuffleArray(targets);
  }, [remainingOptions]);

  // Option handle
  const [selectedTarget, setSelectedTarget] = useState<any>();
  const [selectedSource, setSelectedSource] = useState<any>();
  // Manipulate button effect
  // Check Correct
  const [correctList, setCorrectList] = useState<string[]>([]);
  const [wrongList, setWrongList] = useState<IWrongItem[]>([]);
  // play Audio if wrong
  const playAudio = usePlayAudio();
  if (wrongList.length) {
    playAudio(incorrectSound);
  }

  if (selectedSource && selectedTarget) {
    if (selectedSource.id == selectedTarget.id) {
      if (!correctList.includes(selectedSource.id)) {
        setCorrectList((prev) => [...prev, selectedSource.id]);
        if (remainingOptions.length > 0) {
          setTimeout(() => {
            const nextOption = remainingOptions[0];
            setRemainingOptions(remainingOptions.slice(1));
            setDisplayedOptions((prev) => {
              const index = prev.findIndex(
                (o) => o.optionId === selectedSource.id
              );
              if (index !== -1) {
                const newOptions = [...prev];
                newOptions[index] = nextOption;
                return newOptions;
              }
              return prev;
            });
          }, 500);
        }
      }
    } else {
      setWrongList([
        { id: selectedSource.id, isSource: true, isTarget: false },
        { id: selectedTarget.id, isSource: false, isTarget: true },
      ]);
      setTimeout(() => {
        setWrongList([]);
      }, 500);
    }
    setSelectedSource(null);
    setSelectedTarget(null);
  }
  // Handle Navigation Button
  if (correctList.length === optionsList!.length) {
    setIsButtonActive(true);
    if (setIsSubmit) setIsSubmit(true);
    setIsButtonCorrect(true);
    setIsNext(true);
  }
  useEffect(() => {
    setCorrectList([]);
    setWrongList([]);
  }, [data?.questionId]);
  // Return
  return (
    <div
      onClick={() => {
        setSelectedSource(null);
        setSelectedTarget(null);
      }}
      className="w-full h-full flex justify-center items-center flex-col bg-[#131F24]"
      style={{ padding: "0 0 40px 0" }}
    >
      <div className="w-2/3 h-full flex flex-col justify-center items-center">
        <div className="flex justify-start items-center w-full h-1/5  text-3xl font-bold text-white">
          {data?.instruction}
        </div>
        <div className="w-full h-4/5  flex flex-row gap-8">
          <div className="w-1/2 h-full  flex flex-col gap-2">
            {sourceOptions?.map((option, index) => (
              <ButtonMatching
                buttonHeight={buttonHeight}
                isInWrongList={wrongList.some(
                  (item) =>
                    item.id === option.id &&
                    item.isSource === option.isSource &&
                    item.isTarget === option.isTarget
                )}
                isApplyReleased={
                  selectedSource ? option.id === selectedSource.id : false
                }
                index={index}
                disabled={correctList.includes(option.id!)}
                key={option.id}
                option={option}
                onClick={() => {
                  if (option.id && !correctList.includes(option.id))
                    setSelectedSource(option);
                }}
              />
            ))}
          </div>
          <div className="w-1/2 h-full  flex flex-col gap-2">
            {targetOptions?.map((option, index) => (
              <ButtonMatching
                buttonHeight={buttonHeight}
                isInWrongList={wrongList.some(
                  (item) =>
                    item.id === option.id &&
                    item.isSource === option.isSource &&
                    item.isTarget === option.isTarget
                )}
                isApplyReleased={
                  selectedTarget ? option.id === selectedTarget.id : false
                }
                index={index + maxDisplaySize}
                disabled={correctList.includes(option.id!)}
                key={option.id}
                option={option}
                onClick={() => {
                  if (option.id && !correctList.includes(option.id))
                    setSelectedTarget(option);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchingLessonPage;
