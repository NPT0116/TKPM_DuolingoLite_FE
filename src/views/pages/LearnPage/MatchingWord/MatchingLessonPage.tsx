/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { IMatchingQuestion } from "../../../../interfaces/Questions/IMatchingQuestion";
import { IMatchingOption } from "../../../../interfaces/Options/IMatchingOption";

import ButtonMatching from "../../../components/Button/Matching/ButtonMatching";

interface IVNContent {
  optionId: string;
  sourceType: string;
  vietnameseText: string;
}
interface IELContent {
  optionId: string;
  targetType: string;
  englishText: string;
}
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
    const sourceCollection = data.options.map((option: IMatchingOption) => ({
      optionId: option.optionId,
      sourceType: option.sourceType,
      vietnameseText: option.vietnameseText,
    }));
    const targetCollection = data.options.map((option: IMatchingOption) => ({
      optionId: option.optionId,
      targetType: option.targetType,
      englishText: option.englishText,
    }));
    setSourceCollection(shuffleArray(sourceCollection));
    setTargetCollection(shuffleArray(targetCollection));
  }, []);

  // Process the picking queue whenever it changes.
  useEffect(() => {
    if (pickingQueue.length === 2) {
      const [firstItem, secondItem] = pickingQueue;
      if (firstItem.optionId === secondItem.optionId) {
        setCorrectPickingList((prev) => [...prev, firstItem.optionId]);
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
  return (
    <div onClick={() => handleScreenClick()}>
      {/* Lesson Container */}
      <div className="relative w-[100vw] h-[75vh] ">
        <div className="absolute text-white font-bold text-3xl left-[200px] top-[40px]">
          Chọn cặp từ
        </div>
        <div
          className="relative w-full h-full grid grid-cols-2 grid-row-1 gap-4"
          style={{ padding: "120px 350px 50px 350px" }}
        >
          <div className="w-full h-full grid grid-cols-1 grid-rows-5 gap-4 ">
            {sourceCollection.map((content) => (
              <ButtonMatching
                key={`source-${content.optionId}`}
                setWrongPickingList={setWrongPickingList}
                wrongPickingList={wrongPickingList}
                correctPickingList={correctPickingList}
                setPickingQueue={setPickingQueue}
                content={content}
              />
            ))}
          </div>
          <div className="w-full h-full grid grid-cols-1 grid-rows-5 gap-4">
            {targetCollection.map((content) => (
              <ButtonMatching
                key={`target-${content.optionId}`}
                setWrongPickingList={setWrongPickingList}
                wrongPickingList={wrongPickingList}
                correctPickingList={correctPickingList}
                setPickingQueue={setPickingQueue}
                content={content}
              />
            ))}
          </div>
        </div>
        )
      </div>
    </div>
  );
};

export default MatchingLessonPage;
