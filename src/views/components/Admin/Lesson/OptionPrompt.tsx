import { Checkbox } from "antd";

const OptionPrompt: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-evenly">
      <header className="h-1/6 bg-gray-300">
        <h3 className="text-3xl font-extrabold tracking-wide uppercase text-center">
          Option Configuration
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
      <div className="w-full h-5/6"></div>
    </div>
  );
};

export default OptionPrompt;
