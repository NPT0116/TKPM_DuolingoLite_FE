import React, { useEffect, useState } from "react";
import { Input } from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";
import { IAddConfigure } from "../../../../interfaces/Configure/Configure";
import { IAddQuestion } from "../../../../interfaces/Questions/IBaseQuestion";
import FileUpload from "../Components/Upload";
import { IResource } from "../../../../interfaces/IResource";
import { QuestionType } from "../../../../enums/questionType";

interface QuestionPromptProps {
  configureArray: string[];
  question: IAddQuestion;
  setQuestion: React.Dispatch<React.SetStateAction<IAddQuestion>>;
}

const QuestionPrompt: React.FC<QuestionPromptProps> = ({
  configureArray,
  question,
  setQuestion,
}) => {
  const [audioForced, setAudioForced] = useState(false);
  const [vietNameseTextForced, setVietnameseTextForced] = useState(false);
  const [englishTextForced, setEnglishTextForced] = useState(false);
  const [visibleFields, setVisibleFields] = useState<Record<string, boolean>>({
    instruction: false,
    vietnameseText: false,
    englishText: false,
    audio: false,
    image: false,
  });
  const [imgUpload, setImgUpload] = useState<IResource | null>(null);
  const [audioUpload, setAudioUpload] = useState<IResource | null>(null);

  useEffect(() => {
    setQuestion((prev) => {
      return {
        ...prev,
        instruction: visibleFields.instruction ? prev.instruction || "" : "",
        vietnameseText: visibleFields.vietnameseText
          ? prev.vietnameseText || ""
          : "",
        englishText: visibleFields.englishText ? prev.englishText || "" : "",
        sentence:
          question.type === QuestionType.BuildSentence
            ? prev.sentence || ""
            : "",

        audio: visibleFields.audio ? prev.audio || null : null,
        image: visibleFields.image ? prev.image || null : null,
      };
    });
  }, [visibleFields]);

  const handleCheckBox = (field: string) => () => {
    const key = toCamelCase(field);
    const newValue = !visibleFields[key];
    if (key === "englishText") {
      setVisibleFields((prev) => ({
        ...prev,
        englishText: newValue,
        audio: newValue,
        vietnameseText: !newValue,
      }));
      setVietnameseTextForced(newValue);
      setAudioForced(newValue);
    } else if (key === "vietnameseText") {
      setVisibleFields((prev) => ({
        ...prev,
        englishText: !newValue,
        vietnameseText: newValue,
      }));
      setEnglishTextForced(newValue);
    } else if (!audioForced || key !== "audio") {
      setVisibleFields((prev) => ({
        ...prev,
        [key]: newValue,
      }));
    }
    setQuestion((prev) => ({
      ...prev,
      questionConfiguration: {
        ...prev.questionConfiguration,
        [key]: newValue,
        ...(key === "englishText" ? { audio: newValue } : {}),
      },
    }));
  };

  const handleInputChange =
    (key: keyof IAddQuestion) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuestion((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };

  const toCamelCase = (str: string): keyof IAddConfigure => {
    return (str.charAt(0).toLowerCase() +
      str.slice(1).replace(/\s+/g, "")) as keyof IAddConfigure;
  };

  useEffect(() => {
    const { id, ...restConfig } = question.questionConfiguration;
    setVisibleFields(restConfig);
  }, [question.questionConfiguration]);

  useEffect(() => {
    setQuestion((prev) => ({
      ...prev,
      audio: audioUpload?.url ?? null,
      image: imgUpload?.url ?? null,
    }));
  }, [imgUpload, audioUpload]);
  return (
    <div className="w-full h-full flex flex-col justify-evenly overflow-y-auto">
      {/* Header */}
      <header className="h-1/6 ">
        <h3 className="text-3xl font-extrabold tracking-wide uppercase text-center">
          Question Configuration
        </h3>
        <section>
          <ul className="flex flex-wrap gap-8 justify-center">
            {configureArray.map((field, index) => (
              <li key={index}>
                <Checkbox
                  onChange={handleCheckBox(field)}
                  checked={visibleFields[toCamelCase(field)]}
                  disabled={
                    toCamelCase(field) === "englishText"
                      ? englishTextForced
                      : toCamelCase(field) === "vietnameseText"
                      ? vietNameseTextForced
                      : toCamelCase(field) === "audio"
                      ? audioForced
                      : false
                  }
                >
                  <span className="text-[18px]">{field}</span>
                </Checkbox>
              </li>
            ))}
          </ul>
        </section>
      </header>

      <div className="w-full h-5/6 flex flex-col justify-center gap-4">
        {/* Checkbox List */}

        {/* Input Form */}
        <section className="space-y-6 flex flex-col gap-[40px]">
          {/* Instruction Input */}
          {visibleFields.instruction && (
            <div className="flex flex-col gap-2">
              <label className="text-base font-medium">
                <span className="text-red-500">*</span> Instruction
              </label>
              <Input
                onChange={handleInputChange("instruction")}
                placeholder="VD: Chọn đáp án đúng"
                size="large"
                className="rounded-md bg-gray-50 text-gray-700"
              />
            </div>
          )}

          {/* Vietnamese Text Input */}
          {visibleFields.vietnameseText && (
            <div className="flex flex-col gap-2">
              <label className="text-base font-medium">
                <span className="text-red-500">*</span> Vietnamese Text
              </label>
              <Input
                onChange={handleInputChange("vietnameseText")}
                placeholder="VD: Đâu là cái bàn?"
                size="large"
                className="rounded-md bg-gray-50 text-gray-700"
              />
            </div>
          )}

          {/* English Text Input */}
          {visibleFields.englishText && (
            <div className="flex flex-col gap-2">
              <label className="text-base font-medium">
                <span className="text-red-500">*</span> English Text
              </label>
              <Input
                onChange={handleInputChange("englishText")}
                placeholder="VD: Which is the table?"
                size="large"
                className="rounded-md bg-gray-50 text-gray-700"
              />
            </div>
          )}

          {/* Audio Upload */}
          {visibleFields.audio && (
            <div className="flex flex-col gap-2">
              <label className="text-base font-medium">
                <span className="text-red-500">*</span> Audio
              </label>
              <FileUpload type="audio" setAudioUpload={setAudioUpload} />
            </div>
          )}

          {/* Image Upload */}
          {visibleFields.image && (
            <div className="flex flex-col gap-2">
              <label className="text-base font-medium">
                <span className="text-red-500">*</span> Image
              </label>
              <FileUpload type="image" setImageUpload={setImgUpload} />
            </div>
          )}
          {question.type === QuestionType.BuildSentence && (
            <div className="flex flex-col gap-2">
              <label className="text-base font-medium">
                <span className="text-red-500">*</span> Sentence
              </label>
              <Input
                onChange={handleInputChange("sentence")}
                placeholder="VD: I love coffee"
                size="large"
                className="rounded-md bg-gray-50 text-gray-700"
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default QuestionPrompt;
