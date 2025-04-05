import React, { useEffect, useState } from "react";
import { Input } from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";
import { IAddConfigure } from "../../../../interfaces/Configure/Configure";
import { IAddQuestion } from "../../../../interfaces/Questions/IBaseQuestion";
import FileUpload from "../Components/Upload";
import { IResource } from "../../../../interfaces/IResource";

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
  const [visibleFields, setVisibleFields] = useState<Record<string, boolean>>({
    instruction: false,
    vietnameseText: false,
    englishText: false,
    audio: false,
    image: false,
  });
  const [imgUpload, setImgUpload] = useState<IResource | null>(null);
  const [audioUpload, setAudioUpload] = useState<IResource | null>(null);
  const handleCheckBox = (field: string) => () => {
    const key = toCamelCase(field);
    const newValue = !visibleFields[key];
    setVisibleFields({ ...visibleFields, [key]: newValue });

    setQuestion((prev) => ({
      ...prev,
      questionConfiguration: {
        ...prev.questionConfiguration,
        [key]: newValue,
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
                <Checkbox onChange={handleCheckBox(field)}>
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
        </section>
      </div>
    </div>
  );
};

export default QuestionPrompt;
