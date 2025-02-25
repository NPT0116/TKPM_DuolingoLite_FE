/** @jsxImportSource @emotion/react */
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import WelcomeOwl from "../../../components/Learning/Matching/WelcomeOwl";
import ContinueButton from "../../../components/Button/Matching/ContinueButton";
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

type PickingQueueItem = IVNContent | IELContent;

const MatchingLessonPage: React.FC = () => {
  const [state, setState] = useState(1);
  const [isButtonActivate, setButtonActivate] = useState(false);
  const [correctPickingList, setCorrectPickingList] = useState<string[]>([]);
  const [pickingQueue, setPickingQueue] = useState<PickingQueueItem[]>([]);
  const [wrongPickingList, setWrongPickingList] = useState<PickingQueueItem[]>(
    []
  );

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
      setButtonActivate(true);
    }
  }, [correctPickingList]);

  // Memoize the CSS style for performance.
  const statusCheckCSS = useMemo(
    () => css`
      background: ${isButtonActivate ? "#93D333" : "#52656d"};
    `,
    [isButtonActivate]
  );
  const effectCSS = css`
    width: ${(correctPickingList.length / totalItem) * 100}%;
    transition: width 0.5s ease;
  `;
  const handleScreenClick = () => {
    setPickingQueue([]);
  };
  return (
    <div onClick={() => handleScreenClick()}>
      {/* Progress Bar Container */}
      <div
        className="relative w-[100vw] h-[10vh] flex justify-center items-center translate-y-6"
        style={{ padding: "0px 200px" }}
      >
        <div className="w-full flex flex-row justify-between gap-4 items-center">
          <Link to="/learn" className="absolute -translate-x-[30px]">
            <img
              src="https://d35aaqx5ub95lt.cloudfront.net/images/df223d5b9feb8017b323ed21103eb5ac.svg"
              alt="Back to homepage button"
            />
          </Link>
          <div className="relative bg-[#37464F] w-full h-[15px] rounded-full">
            <div
              css={effectCSS}
              className="relative  bg-[#3B4EFF] rounded-full flex justify-center items-center"
              style={{ padding: "0px 10px 5px 10px", height: "100%" }}
            >
              <div className=" bg-[#6271FF] w-full h-1/5 top-[3px] rounded-full"></div>
            </div>
            {/* <div
              css={statusCheckCSS}
              className="absolute flex justify-center items-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[25px] h-[25px] rounded-full"
            >
              <img
                className="absolute"
                src="https://d35aaqx5ub95lt.cloudfront.net/images/bf8b7058ea10715c26469f85f15f8c07.svg"
                alt="checking icons"
              />
            </div> */}
          </div>
        </div>
      </div>

      {/* Lesson Container */}
      <div className="relative w-[100vw] h-[75vh] ">
        <div className="absolute text-white font-bold text-3xl left-[200px] top-[40px]">
          Chọn cặp từ
        </div>
        {state === 1 && <WelcomeOwl />}
        {state === 2 && (
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
        )}
      </div>

      {/* Navigation Button Container */}
      <div className="relative border-t-2 border-[#37464F] w-[100vw] h-[15vh] flex items-center bg-[#131F23]">
        <ContinueButton
          state={state}
          isButtonActivate={isButtonActivate}
          setState={setState}
          mainColor="3B4EFF"
          borderColor="3F22EC"
          hoverColor="4156FF"
          paddingWidth={80}
          positionRight={250}
        />
      </div>
    </div>
  );
};

export default MatchingLessonPage;
