import { Button, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Checkbox from "antd/es/checkbox/Checkbox";
import { useEffect, useState } from "react";
import { IMultipleChoiceQuestion } from "../../../../interfaces/Questions/IMultipleChoiceQuestion";
import { Configure } from "../../../../interfaces/Configure/Configure";
import { IResource } from "../../../../interfaces/IResource";

interface QuestionPromptProps {
  configureArray: string[];
  question: IMultipleChoiceQuestion;
  setQuestion: React.Dispatch<React.SetStateAction<IMultipleChoiceQuestion>>;
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

  const toCamelCase = (str: string): keyof Configure => {
    return (str.charAt(0).toLowerCase() +
      str.slice(1).replace(/\s+/g, "")) as keyof Configure;
  };

  const handleCheckBox = (field: string) => () => {
    const key = toCamelCase(field);
    const newValue = !visibleFields[key];
    setVisibleFields({ ...visibleFields, [key]: newValue });

    setQuestion((prev) => ({
      ...prev,
      questionConfigure: {
        ...prev.questionConfigure,
        [key]: newValue,
      },
    }));
  };

  useEffect(() => {
    const { id, ...restConfig } = question.questionConfigure;
    setVisibleFields(restConfig);
  }, [question.questionConfigure]);

  return (
    <div className="flex flex-col gap-4 border border-[#cecece] rounded-t-xl shadow-xl">
      <div
        className="bg-[#58cc02] text-white rounded-t-xl"
        style={{ padding: "20px" }}
      >
        <h3 className="text-[25px] font-bold ">Prompt Configuration</h3>
      </div>
      <div style={{ padding: "20px" }}>
        <ul
          className="flex gap-6 justify-between"
          style={{ marginBottom: "20px" }}
        >
          {configureArray.map((field, index) => (
            <li>
              <Checkbox
                key={index}
                onClick={handleCheckBox(field as keyof Configure)}
              >
                <span className="text-[20px]">{field}</span>
              </Checkbox>
            </li>
          ))}
        </ul>
        <ul className="grid grid-cols-2 gap-5">
          {visibleFields.instruction && (
            <li className="flex flex-1 flex-col gap-2">
              <span className="text-[16px] font-[500] text-black">
                <span className="text-red-500">* </span>Instruction
              </span>
              <Input
                placeholder="VD: Chọn đáp án đúng"
                onChange={(e) =>
                  setQuestion((prev) => ({
                    ...prev,
                    instruction: e.target.value,
                  }))
                }
              />
            </li>
          )}
          {visibleFields.vietnameseText && (
            <li className="flex flex-1 flex-col gap-2">
              <span className="text-[16px] font-[500] text-black">
                <span className="text-red-500">* </span>Vietnamese Text
              </span>
              <Input
                placeholder="VD: Đâu là cái bàn?"
                onChange={(e) =>
                  setQuestion((prev) => ({
                    ...prev,
                    vietnameseText: e.target.value,
                  }))
                }
              />
            </li>
          )}

          {visibleFields.englishText && (
            <li className="flex flex-col gap-2">
              <span className="text-[16px] font-[500] text-black">
                <span className="text-red-500">* </span>English Text
              </span>
              <Input
                placeholder="VD: Which is the table?"
                onChange={(e) =>
                  setQuestion((prev) => ({
                    ...prev,
                    englishText: e.target.value,
                  }))
                }
              />
            </li>
          )}

          <li className=" flex flex-col justify-center gap-4 w-full">
            {visibleFields.audio && (
              <div className="w-full">
                <input
                  type="file"
                  accept="audio/*"
                  id="audio-upload"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const resource: IResource = {
                        id: crypto.randomUUID(),
                        fileName: file.name,
                        url: URL.createObjectURL(file),
                        mimeType: 1,
                        size: file.size,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                      };

                      setQuestion((prev) => ({
                        ...prev,
                        audio: resource,
                      }));
                    }
                  }}
                />
                <Button
                  className="w-full"
                  icon={<UploadOutlined />}
                  onClick={() =>
                    document.getElementById("audio-upload")?.click()
                  }
                >
                  Upload Audio
                </Button>
              </div>
            )}

            {visibleFields.image && (
              <div className="w-full">
                <input
                  type="file"
                  accept="image/*"
                  id="image-upload"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const resource: IResource = {
                        id: crypto.randomUUID(),
                        fileName: file.name,
                        url: URL.createObjectURL(file),
                        mimeType: 1,
                        size: file.size,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                      };

                      setQuestion((prev) => ({
                        ...prev,
                        picture: resource,
                      }));
                    }
                  }}
                />
                <Button
                  className="w-full"
                  icon={<UploadOutlined />}
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                >
                  Upload Image
                </Button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default QuestionPrompt;
