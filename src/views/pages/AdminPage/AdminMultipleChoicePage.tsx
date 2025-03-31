import QuestionPrompt from "../../components/Admin/Lesson/QuestionPrompt";
import { Button, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Checkbox from "antd/es/checkbox/Checkbox";

const AdminMultipleChoicePage: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <QuestionPrompt />
      <div className="flex flex-col gap-4">
        <h3 className="text-[25px] font-semibold ">Option Configuration</h3>
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
      </div>
      <Button className="w-fit">ADD OPTION</Button>
    </div>
  );
};

export default AdminMultipleChoicePage;
