import { useState } from "react";
import { IMatchingOption } from "../../../../interfaces/Options/IMatchingOption";
import { v4 as uuidv4 } from "uuid";
import { IResource } from "../../../../interfaces/IResource";
import { IMatchingQuestion } from "../../../../interfaces/Questions/IMatchingQuestion";
import InputBox from "../Components/InputBox";
import AudioUpload from "../Components/AudioUpload";
import StepButton from "../Components/StepButton";
import { Checkbox } from "antd";
import { IAddQuestion } from "../../../../interfaces/Questions/IBaseQuestion";
import { IAddConfigure } from "../../../../interfaces/Configure/Configure";
import { IAddOption } from "../../../../interfaces/Options/IBaseOption";

const createAddEmptyOption = (): IAddOption => ({
  order: 0,
  optionId: "",
  isCorrect: false,
  sourceType: null,
  targetType: null,
  position: null,
});

interface MatchingOptionPromptProps {
  configureArray: string[];
  question: IAddQuestion;
  setQuestion: React.Dispatch<React.SetStateAction<IAddQuestion>>;
}

const MatchingOptionPrompt: React.FC<MatchingOptionPromptProps> = ({
  configureArray,
  question,
  setQuestion,
}) => {
  const [mode, setMode] = useState(0);
  // State to store input value for a new matching option
  const [newVietnameseText, setNewVietnameseText] = useState("");
  const [newEnglishText, setNewEnglishText] = useState("");
  const [newAudio, setNewAudio] = useState<IResource | null>(null);
  const [newAudioUrl, setNewAudioUrl] = useState<string | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [addAnswerOptions, setAddAnswerOptions] = useState<IAddOption[]>([]);

  const [visibleFields, setVisibleFields] = useState<Record<string, boolean>>({
    instruction: false,
    vietnameseText: false,
    englishText: false,
    audio: false,
    image: false,
  });
  const [audioForced, setAudioForced] = useState(false);
  const [vietnameseTextForced, setVietnameseTextForced] = useState(false);
  const [englishTextForced, setEnglishTextForced] = useState(false);
  // State to hold the matching lessing
  const [matchingLesson, setMatchingLesson] = useState<IMatchingQuestion>({
    instruction: "",
    questionId: uuidv4(),
    order: 1,

    vietnameseText: null,
    picture: null,
    englishText: "",
    audio: null,
    type: "Matching",
    questionConfigure: {
      audio: false,
      englishText: false,
      vietnameseText: false,
      instruction: true,
      image: false,
      id: uuidv4(),
    },
    optionConfigure: {
      audio: true,
      englishText: true,
      vietnameseText: true,
      instruction: false,
      image: false,
      id: uuidv4(),
    },
    options: [],
  });
  const toCamelCase = (str: string): keyof IAddConfigure => {
    return (str.charAt(0).toLowerCase() +
      str.slice(1).replace(/\s+/g, "")) as keyof IAddConfigure;
  };
  const handleCheckBox = (field: string) => () => {
    const key = toCamelCase(field);
    const newValue = !visibleFields[key];
    if (key === "englishText") {
      setVisibleFields((prev) => ({
        ...prev,
        englishText: newValue,
        audio: newValue,
      }));
      if (newValue) {
        setVisibleFields((prev) => ({
          ...prev,
          vietnameseText: false,
        }));
      }
      setVietnameseTextForced(newValue);
      setAudioForced(newValue);
    } else if (key === "vietnameseText") {
      setVisibleFields((prev) => ({
        ...prev,
        vietnameseText: newValue,
      }));
      if (newValue) {
        setVisibleFields((prev) => ({
          ...prev,
          englishText: false,
        }));
      }
      setEnglishTextForced(newValue);
    } else if (!audioForced || key !== "audio") {
      setVisibleFields((prev) => ({
        ...prev,
        [key]: newValue,
      }));
    }
    setQuestion((prev) => ({
      ...prev,
      optionConfiguration: {
        ...prev.optionConfiguration,
        [key]: newValue,
        ...(key === "englishText" ? { audio: newValue } : {}),
      },
    }));
  };
  const HandleAdd = () => {
    if (newVietnameseText && newEnglishText && newAudio) {
      const newOption: IMatchingOption = {
        optionId: uuidv4(),
        order: matchingLesson.options.length + 1,
        audio: newAudio,
        vietnameseText: newVietnameseText,
        englishText: newEnglishText,
        sourceType: "VietnameseText",
        targetType: "EnglishText",
        image: null,
      };
      setMatchingLesson((prev) => ({
        ...prev,
        options: [...prev.options, newOption],
      }));
      console.log("Add option");
      setNewVietnameseText("");
      setNewEnglishText("");
      setNewAudioUrl(null);
      setNewAudio(null);
    }
  };
  const handleOptionClick = (option: IMatchingOption) => {
    console.log("Option click");
    setSelectedOptionId(option.optionId);
    setNewVietnameseText(option.vietnameseText);
    setNewEnglishText(option.englishText);
    setNewAudio(option.audio);
    setNewAudioUrl(option.audio.url);
    setMode(1);
  };
  // update handle
  const handleCancel = () => {
    console.log("Cancel update");
    setNewVietnameseText("");
    setNewEnglishText("");
    setNewAudio(null);
    setNewAudioUrl(null);
    setMode(0);
  };
  const handleDelete = () => {
    console.log("Delete selected character");
    if (selectedOptionId) {
      setMatchingLesson((prev) => ({
        ...prev,
        options: prev.options.filter(
          (option) => option.optionId !== selectedOptionId
        ),
      }));
    }
    alert("Xóa thành công từ !");
    handleCancel();
  };
  const handleUpdate = () => {
    console.log("Update successfully");
    if (selectedOptionId && newVietnameseText && newEnglishText && newAudio) {
      setMatchingLesson((prev) => ({
        ...prev,
        options: prev.options.map((option: IMatchingOption) =>
          option.optionId === selectedOptionId
            ? {
                ...option,
                vietnameseText: newVietnameseText,
                englishText: newEnglishText,
                audio: newAudio,
              }
            : option
        ),
      }));
    }
    alert("Cập nhật thành công từ!");
    handleCancel();
  };
  return (
    <div className="w-full h-full">
      <header className="h-1/6 bg-gray-300">
        <h3 className="text-3xl font-extrabold tracking-wide uppercase text-center">
          Option Configuration
        </h3>
        <section>
          <ul className="flex flex-wrap gap-8 justify-center">
            {configureArray.map((field, index) => (
              <li key={index}>
                {field !== "Instruction" && (
                  <Checkbox
                    onChange={handleCheckBox(field)}
                    checked={visibleFields[toCamelCase(field)]}
                    disabled={
                      toCamelCase(field) === "englishText"
                        ? englishTextForced
                        : toCamelCase(field) === "vietnameseText"
                        ? vietnameseTextForced
                        : toCamelCase(field) === "audio"
                        ? audioForced
                        : false
                    }
                  >
                    <span className="text-[18px]">{field}</span>
                  </Checkbox>
                )}
              </li>
            ))}
          </ul>
        </section>
      </header>
      <div className="h-full w-full  flex flex-row justify-between">
        {/* Input */}
        <div className="w-1/2 h-full border-r-1 border-[#E5E5E5] flex flex-col justify-center items-center">
          <div className="w-full h-5/6 flex flex-col gap-2">
            <div className="font-bold text-xl h-1/12 ">A. NHẬP TỪ</div>
            <div
              className="w-full h-11/12 flex flex-col justify-between gap-2 "
              style={{ padding: "0px 30px 50px 30px" }}
            >
              <InputBox
                value={newVietnameseText}
                onChange={(e) => setNewVietnameseText(e.target.value)}
                title="1. Nhập nghĩa tiếng Việt"
                id="vneseText"
                type="text"
                placeholder="VD: Chiếc xe hơi"
              />
              <InputBox
                value={newEnglishText}
                onChange={(e) => setNewEnglishText(e.target.value)}
                title="2. Nhập nghĩa tiếng Anh"
                id="engText"
                type="text"
                placeholder="VD: Car"
              />
              <AudioUpload
                onFileSelect={(audio: IResource) => {
                  setNewAudio(audio);
                  setNewAudioUrl(audio.url);
                }}
                audioUrl={newAudioUrl}
              />
            </div>
          </div>
          <div className="w-full h-1/6 flex flex-row justify-center items-center ">
            {mode == 0 && (
              <StepButton width="90%" content="THÊM TỪ" onClick={HandleAdd} />
            )}
            {mode == 1 && (
              <div className="w-full h-full flex flex-row justify-evenly items-center  gap-4">
                <div className="w-1/7 h-full flex justify-center items-center">
                  <StepButton
                    width="100%"
                    content="HỦY"
                    bgColor="#1CB0F6"
                    textColor="white"
                    borderColor="#198CC5"
                    onClick={handleCancel}
                  />
                </div>
                <div className="w-3/7 h-full flex justify-center items-center">
                  <StepButton
                    width="100%"
                    content="XÓA TỪ"
                    bgColor="#FF4B4B"
                    textColor="white"
                    borderColor="#CD3D3C"
                    onClick={handleDelete}
                  />
                </div>
                <div className="w-3/7 h-full flex justify-center items-center">
                  <StepButton
                    width="100%"
                    content="CẬP NHẬT"
                    bgColor="#58CB05"
                    borderColor="#47A30B"
                    textColor="white"
                    onClick={handleUpdate}
                  />
                </div>{" "}
              </div>
            )}
          </div>
        </div>
        {/* Create */}
        <div
          className="w-1/2 h-full border-l-1 border-[#E5E5E5] flex flex-col justify-center items-center"
          style={{ padding: "10px" }}
        >
          <div className="w-full h-5/6  flex flex-col gap-2">
            <div className="font-bold text-xl h-1/12 ">B. TẠO BÀI HỌC</div>
            <div
              className="w-full h-11/12 flex flex-col justify-center gap-2 "
              style={{ padding: "10px 30px" }}
            >
              <div
                className="border-2 border-gray rounded-xl w-full h-full"
                style={{ padding: "10px" }}
              >
                {matchingLesson.options.length == 0 ? (
                  <div className="text-center">
                    {" "}
                    Chưa bài học nào được thêm.
                  </div>
                ) : (
                  <div
                    className="w-full h-full justify-start flex-row items-center flex flex-wrap gap-2 overflow-auto"
                    style={{ alignItems: "start" }}
                  >
                    {matchingLesson.options.map((option, index) => (
                      <div
                        key={index}
                        className="border-1 w-fit rounded-xl h-fit cursor-pointer"
                        style={{ padding: "10px" }}
                        onClick={() => handleOptionClick(option)}
                      >
                        {option.vietnameseText}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchingOptionPrompt;
