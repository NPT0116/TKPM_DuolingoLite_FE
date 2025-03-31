import { Button, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Checkbox from "antd/es/checkbox/Checkbox";

const QuestionPrompt: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-[25px] font-semibold ">Prompt Configuration</h3>
      <ul
        className="flex gap-6 justify-between"
        style={{ marginBottom: "20px" }}
      >
        <li>
          <Checkbox>
            <span className="text-[20px]">Instruction</span>
          </Checkbox>
        </li>
        <li>
          <Checkbox>
            <span className="text-[20px]">Vietnamese Text</span>
          </Checkbox>
        </li>
        <li>
          <Checkbox>
            <span className="text-[20px]">Audio</span>
          </Checkbox>
        </li>
        <li>
          <Checkbox>
            <span className="text-[20px]">English Text</span>
          </Checkbox>
        </li>
        <li>
          <Checkbox>
            <span className="text-[20px]">Image</span>
          </Checkbox>
        </li>
      </ul>
      <ul className="flex flex-col gap-5">
        <li className="flex flex-col gap-2">
          <span className="text-[16px] text-black font-[500]">
            <span className="text-red-500">* </span>Instruction
          </span>
          <Input placeholder="VD: Chọn đáp án đúng"></Input>
        </li>
        <li className="flex flex-col gap-2">
          <span className="text-[16px] text-black font-[500]">
            <span className="text-red-500">* </span>VietNamese Text
          </span>
          <Input placeholder="VD: Đâu là cái bàn?"></Input>
        </li>
        <li className="flex flex-col gap-2">
          <span className="text-[16px] text-black font-[500]">
            <span className="text-red-500">* </span>Audio
          </span>
          <Upload
            name="audio"
            accept="audio/*"
            showUploadList={false}
            beforeUpload={(file) => {
              console.log("Audio file:", file);
              return false; // ⛔ để ngăn auto upload
            }}
          >
            <Button icon={<UploadOutlined />}>Upload Audio</Button>
          </Upload>
        </li>

        <li className="flex flex-col gap-2">
          <span className="text-[16px] text-black font-[500]">
            <span className="text-red-500">* </span>Image
          </span>
          <Upload
            name="image"
            accept="image/*"
            listType="picture"
            showUploadList={false}
            beforeUpload={(file) => {
              console.log("Image file:", file);
              return false; // ⛔ để ngăn auto upload
            }}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </li>
      </ul>
    </div>
  );
};

export default QuestionPrompt;
