import { Button, Input } from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";

interface OptionPromptProps {
  configureArray: string[];
}

const OptionPrompt: React.FC<OptionPromptProps> = ({ configureArray }) => {
  return (
    <div className="border border-[#cecece] rounded-t-xl shadow-xl">
      <div className="flex flex-col gap-4 ">
        <div
          className="bg-[#468FCC] text-white rounded-t-xl"
          style={{ padding: "20px" }}
        >
          <h3 className="text-[25px] font-semibold ">Option Configuration</h3>
        </div>
      </div>
      <div style={{ padding: "20px" }}>
        <ul
          className="flex gap-6 justify-between"
          style={{ marginBottom: "20px" }}
        >
          {configureArray.map((configure, index) => (
            <li>
              <Checkbox key={index}>
                <span className="text-[20px]">{configure}</span>
              </Checkbox>
            </li>
          ))}
        </ul>
        <Button
          color="primary"
          className="w-full"
          variant="dashed"
          style={{ padding: "20px", marginBottom: "20px" }}
        >
          <span className="font-bold">ADD OPTION</span>
        </Button>
        <ul>
          <li className="flex flex-col gap-4">
            <h3 className="text-[20px] font-bold text-center">Option 1</h3>
            <Button style={{ display: "flex", margin: "0 auto" }}>
              <span>+ ADD OPTION</span>
            </Button>
            <span className="text-[16px] text-black font-[500]">
              Search Option
            </span>
            <Input style={{ padding: "10px" }} placeholder="VD: Table"></Input>
            <span className="text-[16px] text-black font-[500]">
              VietNamese Text
            </span>
            <Input
              style={{ padding: "10px" }}
              placeholder="VD: Cái bàn"
            ></Input>
            <span className="text-[16px] text-black font-[500]">
              English Text
            </span>
            <Input style={{ padding: "10px" }} placeholder="VD: Table"></Input>
            <span className="text-[16px] text-black font-[500]">
              Search Option
            </span>
            <Input style={{ padding: "10px" }} placeholder="VD: Laptop"></Input>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OptionPrompt;
