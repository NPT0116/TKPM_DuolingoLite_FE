/** @jsxImportSource @emotion/react */
import QuestionBox from "../../../components/Learning/Pronunciation/QuestionBox";
import { css, keyframes } from "@emotion/react";
import { useState, useRef } from "react";
import axios from "axios";
const fluctuate = keyframes`
  0% { transform: scaleY(1); }
  25% { transform: scaleY(1.8); }
  50% { transform: scaleY(0.6); }
  75% { transform: scaleY(1.5); }
  100% { transform: scaleY(1); }
`;
const questionElements = [
  {
    englishText: "Good",
    vietnameseText: "Có", // Add Vietnamese translation
    audio: "",
  },
  {
    englishText: "bye",
    vietnameseText: "cái này", // Add Vietnamese translation
    audio: "",
  },
  {
    englishText: "have",
    vietnameseText: "đen", // Add Vietnamese translation
    audio: "",
  },
  {
    englishText: "a",
    vietnameseText: "túi", // Add Vietnamese translation
    audio: "",
  },
  {
    englishText: "nice",
    vietnameseText: "mười", // Add Vietnamese translation
    audio: "",
  },
  {
    englishText: "day",
    vietnameseText: "đô la", // Add Vietnamese translation
    audio: "",
  },
  {
    englishText: ".",
    vietnameseText: ".", // Punctuation remains the same
    audio: "",
  },
];
const waveBars = Array(5).fill(null);

const PronunciationPage: React.FC = () => {
  const timeoutRef = useRef<number | null>(null);
  const [btnState, setBtnState] = useState(0);
  const [isRecord, setIsRecord] = useState(false);

  // Audio handle
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Start Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstart = () => {
        console.log("Recording started...");
        audioChunksRef.current = []; // Clear old chunks
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };
  // Stop Recording
  const stopRecording = () => {
    const mediaRecorder = mediaRecorderRef.current;
    if (!mediaRecorder) return;
    mediaRecorder.stop();

    mediaRecorder.onstop = async () => {
      console.log("Recording stopped...");
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });

      const formData = new FormData();
      // The key 'audioFile' must match your backend’s requirement
      formData.append("audioFile", audioBlob, "recording.webm");
      try {
        const response = await axios.post("/api/Speech/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Upload response:", response.data);
      } catch (error) {
        console.error("Error uploading audio:", error);
      }
    };
  };

  // Record button
  const handleRecordButton = () => {
    setIsRecord(true);
    if (timeoutRef.current != null) {
      stopRecording();
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setIsRecord(false);
    } else {
      startRecording();
      timeoutRef.current = setTimeout(() => {
        stopRecording();
        setIsRecord(false);
        timeoutRef.current = null;
      }, 10000);
    }
  };

  return (
    <div>
      {/* Main content */}
      <div
        className="relative w-[100vw] h-[75vh] flex flex-col justify-center items-center"
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
            <button className="w-full h-2/6" onClick={handleRecordButton}>
              <div
                id="record-micro"
                className="hover:bg-[#121C1F] bg-[#131F23] flex justify-center items-center gap-4 border-2 border-b-4 border-[#313F47] w-full  rounded-xl active:border-b-2 active:translate-y-[2px] cursor-pointer "
                style={{ padding: "15px" }}
              >
                <div className="flex flex-row gap-2 h-[20px]">
                  {!isRecord && (
                    <img
                      src="https://d35aaqx5ub95lt.cloudfront.net/images/18758dd8bd61ed4f1783c8b0917fe899.svg"
                      alt="Micro icon"
                      width="20"
                    />
                  )}

                  <div className="font-bold text-[#41ACE0] h-full ">
                    {" "}
                    {!isRecord && "NHẤN ĐỂ ĐỌC"}
                    {isRecord && (
                      <div className="flex flex-row justify-center items-start gap-2 translate-y-2">
                        {waveBars.map((_, index) => (
                          <div
                            key={index}
                            css={css`
                              background-color: #41ace0;
                              width: 5px;
                              height: 10px;
                              border-radius: 9999px;
                              animation: ${fluctuate} 1.2s ease-in-out infinite;
                              animation-delay: ${index * 0.2}s;
                            `}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PronunciationPage;
