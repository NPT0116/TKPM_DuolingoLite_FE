/** @jsxImportSource @emotion/react */
import QuestionBox from "../../../components/Learning/Pronunciation/QuestionBox";
import { css } from "@emotion/react";

const questionElements = [
  {
    englishText: "Is",
    vietnameseText: "Có", // Add Vietnamese translation
    audio: "/audio/correct-156911.mp3",
  },
  {
    englishText: "this",
    vietnameseText: "cái này", // Add Vietnamese translation
    audio: "/audio/correct-156911.mp3",
  },
  {
    englishText: "black",
    vietnameseText: "đen", // Add Vietnamese translation
    audio: "/audio/correct-156911.mp3",
  },
  {
    englishText: "bag",
    vietnameseText: "túi", // Add Vietnamese translation
    audio: "/audio/correct-156911.mp3",
  },
  {
    englishText: "ten",
    vietnameseText: "mười", // Add Vietnamese translation
    audio: "/audio/correct-156911.mp3",
  },
  {
    englishText: "dollars",
    vietnameseText: "đô la", // Add Vietnamese translation
    audio: "/audio/correct-156911.mp3",
  },
  {
    englishText: "?",
    vietnameseText: "?", // Punctuation remains the same
    audio: "",
  },
];

const PronunciationPage: React.FC = () => {
  return (
    <div>
      {/* Main content */}
      <div
        className="relative w-[100vw] h-[75vh] flex flex-col justify-center items-center "
        style={{ padding: "0px 300px" }}
      >
        <div className="w-full h-full  flex flex-col justify-evenly items-center">
          {" "}
          <div className="font-bold text-3xl text-white w-full h-1/6 flex justify-start items-center">
            Đọc câu này
          </div>
          <div className="w-full h-5/6 flex flex-col justify-center items-center gap-8">
            <div
              id="reading-content"
              className="flex flex-row justify-center items-end gap-4 w-full h-4/6"
            >
              <div className="w-full h-2/3 flex flex-row gap-8">
                {" "}
                <img
                  src="https://duoplanet.com/wp-content/uploads/2022/04/Duolingo-Lily-1.png"
                  alt=""
                  className="h-full"
                />
                <div className="w-full h-full flex justify-start items-center">
                  {" "}
                  <QuestionBox questionElements={questionElements} />
                </div>
              </div>
            </div>
            <div className="w-full h-2/6">
              <div
                id="record-micro"
                className="flex justify-center items-center gap-4 border-2 border-b-4 border-[#313F47] w-full  rounded-xl active:border-b-2 active:translate-y-[2px] cursor-pointer"
                style={{ padding: "15px" }}
              >
                <img
                  src="https://d35aaqx5ub95lt.cloudfront.net/images/18758dd8bd61ed4f1783c8b0917fe899.svg"
                  alt="Micro icon"
                  width="20"
                />
                <div className="font-bold text-[#41ACE0]"> NHẤN ĐỂ ĐỌC</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PronunciationPage;
