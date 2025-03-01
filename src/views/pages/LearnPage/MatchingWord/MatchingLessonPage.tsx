/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useMemo } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { css } from "@emotion/react";
import WelcomeOwl from "../../../components/Learning/Matching/WelcomeOwl";
import ContinueButton from "../../../components/Button/ContinueButton";
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
  setXp: React.Dispatch<
    React.SetStateAction<{ accumulated: number; total: number }>
  >;
  state: number;
  setIsButtonActive: React.Dispatch<React.SetStateAction<boolean>>;
}

type PickingQueueItem = IVNContent | IELContent;

const MatchingLessonPage: React.FC<IMatchingLessonPage> = ({
  setXp,
  state,
  setIsButtonActive,
}) => {
  const [correctPickingList, setCorrectPickingList] = useState<string[]>([]);
  const [pickingQueue, setPickingQueue] = useState<PickingQueueItem[]>([]);
  const [wrongPickingList, setWrongPickingList] = useState<PickingQueueItem[]>(
    []
  );
  // const { setXp, state, setIsButtonActive } =
  //   useOutletContext<OutletContextType>();

  const sourceCollection: IVNContent[] = [
    { optionId: "1", sourceType: "VietNamText", vietnameseText: "đắt" },
    { optionId: "2", sourceType: "VietNamText", vietnameseText: "đô-la" },
    { optionId: "3", sourceType: "VietNamText", vietnameseText: "bia" },
    { optionId: "4", sourceType: "VietNamText", vietnameseText: "cái mũ" },
    { optionId: "5", sourceType: "VietNamText", vietnameseText: "xe hơi" },
  ];

  const targetCollection: IELContent[] = [
    { optionId: "1", targetType: "EnglishText", englishText: "expensive" },
    { optionId: "2", targetType: "EnglishText", englishText: "dollar" },
    { optionId: "3", targetType: "EnglishText", englishText: "beer" },
    { optionId: "4", targetType: "EnglishText", englishText: "hat" },
    { optionId: "5", targetType: "EnglishText", englishText: "car" },
  ];
  const totalItem = targetCollection.length;

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
    }
  }, [correctPickingList, setXp]);

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

      {/* Navigation Button Container */}
    </div>
  );
};

export default MatchingLessonPage;
