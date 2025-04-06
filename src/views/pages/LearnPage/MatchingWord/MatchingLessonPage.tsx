/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef } from "react";
import { IMatchingQuestion } from "../../../../interfaces/Questions/IMatchingQuestion";
import { IMatchingOption } from "../../../../interfaces/Options/IMatchingOption";

import ButtonMatching from "../../../components/Button/Matching/ButtonMatching";
import {
  IVNContent,
  IELContent,
} from "../../../../interfaces/Options/IMatchingOption";
import { usePlayAudio } from "../../../components/LearnPage/Audio/AudioProvider";

interface IMatchingLessonPage {
  setIsButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsButtonCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNext: React.Dispatch<React.SetStateAction<boolean>>;
  data: IMatchingQuestion;
}

type PickingQueueItem = IVNContent | IELContent;

const MatchingLessonPage: React.FC<IMatchingLessonPage> = ({
  setIsButtonActive,
  setIsButtonCorrect,
  setIsNext,
  data,
}) => {
  //
  const [correctPickingList, setCorrectPickingList] = useState<string[]>([]);
  const [pickingQueue, setPickingQueue] = useState<PickingQueueItem[]>([]);
  const [wrongPickingList, setWrongPickingList] = useState<PickingQueueItem[]>(
    []
  );
  const [sourceCollection, setSourceCollection] = useState<IVNContent[]>([]);
  const [targetCollection, setTargetCollection] = useState<IELContent[]>([]);
  function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }
  useEffect(() => {
    const sourceCollection = data.options
      .filter((option: IMatchingOption) => option.optionId != null)
      .map((option: IMatchingOption) => ({
        optionId: option.optionId,
        sourceType: option.sourceType,
        vietnameseText: option.vietnameseText,
      }));
    const targetCollection = data.options
      .filter((option: IMatchingOption) => option.optionId != null)
      .map((option: IMatchingOption) => ({
        optionId: option.optionId,
        targetType: option.targetType,
        englishText: option.englishText,
        audio: option.audio,
      }));
    setSourceCollection(shuffleArray(sourceCollection));
    setTargetCollection(shuffleArray(targetCollection));
  }, []);
  // Process the picking queue whenever it changes.
  useEffect(() => {
    if (pickingQueue.length === 2) {
      const [firstItem, secondItem] = pickingQueue;
      if (firstItem.optionId === secondItem.optionId) {
        setCorrectPickingList((prev) => [...prev, firstItem.optionId!]);
      } else {
        setWrongPickingList((prev) => [firstItem, secondItem]);
      }
      setPickingQueue([]);
    }
  }, [pickingQueue]);

  // Activate button when the correct picking list reaches 5 items.
  useEffect(() => {
    if (correctPickingList.length === 5) {
      setIsButtonActive(true);
      setIsButtonCorrect(true);
      setIsNext(true);
    }
  }, [correctPickingList]);

  const handleScreenClick = () => {
    setPickingQueue([]);
  };
  // Handle Overlap audio
  const playAudio = usePlayAudio();
  return (
    <div
      onClick={() => handleScreenClick()}
      className="w-full h-full "
      style={{ padding: "0 0 40px 0" }}
    >
      {/* Lesson Container */}
      <div className="relative w-full h-full flex flex-col justify-center items-center">
        <div className="w-1/2   text-white font-bold text-3xl h-1/5  flex items-center justify-start">
          Chọn cặp từ
        </div>
        <div className="relative h-4/5 w-full  grid grid-cols-2 grid-row-1 gap-4">
          <div className="h-full grid grid-cols-1 grid-rows-5 gap-4 w-1/2 justify-self-end">
            {sourceCollection.map((content) => (
              <ButtonMatching
                key={`source-${content.optionId}`}
                setWrongPickingList={setWrongPickingList}
                wrongPickingList={wrongPickingList}
                correctPickingList={correctPickingList}
                setPickingQueue={setPickingQueue}
                content={content as IVNContent}
              />
            ))}
          </div>
          <div className=" h-full grid grid-cols-1 grid-rows-5 gap-4 w-1/2 justify-self-start">
            {targetCollection.map((content) => (
              <ButtonMatching
                onClick={() => {
                  if (content.audio && content.audio.url) {
                    playAudio(content.audio.url);
                  }
                }}
                key={`target-${content.optionId}`}
                setWrongPickingList={setWrongPickingList}
                wrongPickingList={wrongPickingList}
                correctPickingList={correctPickingList}
                setPickingQueue={setPickingQueue}
                content={content as IELContent}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchingLessonPage;
