import React from "react";
import { Button, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Checkbox from "antd/es/checkbox/Checkbox";

const QuestionPrompt: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-evenly">
      {/* Header */}
      <header className="h-1/6 ">
        <h3 className="text-3xl font-extrabold tracking-wide uppercase text-center">
          Prompt Configuration
        </h3>
        <section>
          <ul className="flex flex-wrap gap-8 justify-center">
            <li>
              <Checkbox>
                <span className="text-lg">Instruction</span>
              </Checkbox>
            </li>
            <li>
              <Checkbox>
                <span className="text-lg">Vietnamese Text</span>
              </Checkbox>
            </li>
            <li>
              <Checkbox>
                <span className="text-lg">Audio</span>
              </Checkbox>
            </li>
            <li>
              <Checkbox>
                <span className="text-lg">English Text</span>
              </Checkbox>
            </li>
            <li>
              <Checkbox>
                <span className="text-lg">Image</span>
              </Checkbox>
            </li>
          </ul>
        </section>
      </header>

      <div className="w-full h-5/6 flex flex-col justify-center gap-4">
        {/* Checkbox List */}

        {/* Input Form */}
        <section className="space-y-6">
          {/* Instruction Input */}
          <div className="flex flex-col gap-2">
            <label className="text-base font-medium">
              <span className="text-red-500">*</span> Instruction
            </label>
            <Input
              placeholder="VD: Chọn đáp án đúng"
              size="large"
              className="rounded-md bg-gray-50 text-gray-700"
            />
          </div>

          {/* Vietnamese Text Input */}
          <div className="flex flex-col gap-2">
            <label className="text-base font-medium">
              <span className="text-red-500">*</span> Vietnamese Text
            </label>
            <Input
              placeholder="VD: Đâu là cái bàn?"
              size="large"
              className="rounded-md bg-gray-50 text-gray-700"
            />
          </div>

          {/* Audio Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-base font-medium">
              <span className="text-red-500">*</span> Audio
            </label>
            <Upload
              name="audio"
              accept="audio/*"
              showUploadList={false}
              beforeUpload={(file) => {
                console.log("Audio file:", file);
                return false; // Ngăn auto upload
              }}
            >
              <Button
                icon={<UploadOutlined />}
                size="large"
                className="rounded-md"
              >
                Upload Audio
              </Button>
            </Upload>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-base font-medium">
              <span className="text-red-500">*</span> Image
            </label>
            <Upload
              name="image"
              accept="image/*"
              listType="picture"
              showUploadList={false}
              beforeUpload={(file) => {
                console.log("Image file:", file);
                return false; // Ngăn auto upload
              }}
            >
              <Button
                icon={<UploadOutlined />}
                size="large"
                className="rounded-md"
              >
                Upload Image
              </Button>
            </Upload>
          </div>
        </section>
      </div>
    </div>
  );
};

export default QuestionPrompt;
