import { useState, useEffect } from "react";
import { IMultipleChoiceOption } from "../../../../interfaces/Options/IMultipleChoiceOption";
import { IMultipleChoiceQuestion } from "../../../../interfaces/Questions/IMultipleChoiceQuestion";
import Checkbox from "antd/es/checkbox/Checkbox";
import { AutoComplete, Button, Input, Radio } from "antd";
import { getOptionByEnglishText } from "../../../../services/Option/GetOptionService";
import CreateOptionForm from "./CreateOptionForm";

interface QuestionPromptProps {
  configureArray: string[];
  question: IMultipleChoiceQuestion;
  setQuestion: React.Dispatch<React.SetStateAction<IMultipleChoiceQuestion>>;
}

const createEmptyOption = (): IMultipleChoiceOption => ({
  isCorrect: false,
  vietnameseText: null,
  englishText: null,
  image: null,
  audio: null,
});

const AnswerOptionPrompt: React.FC<QuestionPromptProps> = ({
  configureArray,
  question,
  setQuestion,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [existedOptions, setExistedOptions] = useState<IMultipleChoiceOption[]>(
    []
  );
  const [answerOptions, setAnswerOptions] = useState<IMultipleChoiceOption[]>(
    question.options || []
  );

  const handleAddOption = () => {
    setAnswerOptions((prev) => [...prev, createEmptyOption()]);
  };

  const handleSearch = async (value: string) => {
    if (!value) return;

    const result = await getOptionByEnglishText(value);
    if (result) {
      setExistedOptions(result);
    }
  };

  const handleCorrectChange = (index: number, isCorrect: boolean) => {
    const updatedOptions = [...answerOptions];
    updatedOptions[index].isCorrect = isCorrect;
    setAnswerOptions(updatedOptions);
  };

  const handleDelete = (index: number) => {
    const updatedOptions = [...answerOptions];
    updatedOptions.splice(index, 1);
    setAnswerOptions(updatedOptions);
  };

  // Đồng bộ answerOptions vào question.options mỗi khi thay đổi
  useEffect(() => {
    setQuestion((prev) => ({
      ...prev,
      options: answerOptions,
    }));
  }, [answerOptions, setQuestion]);

  return (
    <div className="w-full h-full flex flex-col justify-evenly overflow-y-auto">
      <header className="h-1/6 bg-gray-300">
        <h3 className="text-3xl font-extrabold tracking-wide uppercase text-center">
          Answer Option Configuration
        </h3>
        <section>
          <ul className="flex flex-wrap gap-8 justify-center">
            {configureArray.map((field, index) => (
              <li key={index}>
                <Checkbox>
                  <span className="text-[18px]">{field}</span>
                </Checkbox>
              </li>
            ))}
          </ul>
        </section>
      </header>
      <div className="w-full h-5/6 flex flex-col justify-start gap-4">
        <Button
          type="dashed"
          className="w-full flex justify-center"
          style={{ margin: "10px auto", padding: "20px" }}
          onClick={handleAddOption}
        >
          + ADD OPTION
        </Button>
        {/* Option List */}
        <div>
          {answerOptions.map((option, index) => (
            <div>
              <div
                key={index}
                className="border p-3 rounded shadow flex flex-col gap-4"
                style={{ padding: "20px", marginBottom: "15px" }}
              >
                <h3 className="font-bold text-center text-[20px]">
                  Option {index + 1}
                </h3>
                <div>
                  <span className="font-bold">
                    <span className="text-red-500">* </span>Is Correct
                  </span>
                  <ul className="flex justify-center">
                    <li>
                      <Radio.Group
                        onChange={(e) =>
                          handleCorrectChange(index, e.target.value)
                        }
                        value={option.isCorrect}
                        className="flex justify-center gap-8 mt-2"
                      >
                        <Radio value={true}>
                          <span className="text-[16px]">True</span>
                        </Radio>
                        <Radio value={false}>
                          {" "}
                          <span className="text-[16px]">False</span>
                        </Radio>
                      </Radio.Group>
                    </li>
                  </ul>
                </div>
                <button
                  className="bg-[#1CB0F6] hover:bg-[#119fe0]  text-[white] font-bold w-fit flex rounded-xl cursor-pointer transition-all ease-in-out"
                  style={{ margin: "0 auto", padding: "10px 20px" }}
                  onClick={() => {
                    setShowCreateModal(true);
                    setModalIndex(index);
                  }}
                >
                  <span>Add new answer option</span>
                </button>
                <div className="flex flex-col gap-2">
                  <span className="font-bold">
                    <span className="text-red-500">* </span>Search Option
                  </span>
                  <AutoComplete
                    style={{ width: "100%" }}
                    options={existedOptions.map((item) => ({
                      value:
                        item.englishText +
                        (item.vietnameseText
                          ? " - " + item.vietnameseText
                          : ""),
                      label:
                        item.englishText +
                        (item.vietnameseText
                          ? " - " + item.vietnameseText
                          : ""),
                      optionData: item,
                    }))}
                    placeholder="Search English Text"
                    onSearch={handleSearch}
                    onSelect={(value, option) => {
                      const selected =
                        option.optionData as IMultipleChoiceOption;
                      const updated = [...answerOptions];
                      updated[index] = selected;
                      updated[index].isCorrect = answerOptions[index].isCorrect;
                      setAnswerOptions(updated);
                    }}
                  />
                </div>
                <button
                  className="flex cursor-pointer"
                  style={{ margin: "0px auto" }}
                  onClick={() => handleDelete(index)}
                >
                  <span className="text-red-500">Delete option</span>
                </button>
              </div>
              <hr
                className="h-px w-[70%] flex border-0 bg-[#cccccc]"
                style={{ margin: "20px auto" }}
              />
            </div>
          ))}
        </div>
      </div>
      {showCreateModal && (
        <CreateOptionForm
          setShowCreateModal={setShowCreateModal}
          modalIndex={modalIndex}
        />
      )}
    </div>
  );
};

export default AnswerOptionPrompt;
