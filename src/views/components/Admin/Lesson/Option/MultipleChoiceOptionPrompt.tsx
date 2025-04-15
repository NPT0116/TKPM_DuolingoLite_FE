import { AutoComplete, Radio } from "antd";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { IMultipleChoiceOption } from "../../../../../interfaces/Options/IMultipleChoiceOption";
import { getOptionByEnglishText } from "../../../../../services/Option/GetOptionService";
import { IResource } from "../../../../../interfaces/IResource";
import { IAddOption } from "../../../../../interfaces/Options/IBaseOption";
import { IAddQuestion } from "../../../../../interfaces/Questions/IBaseQuestion";

const createEmptyOption = (): IMultipleChoiceOption => ({
  optionId: "",
  isCorrect: false,
  vietnameseText: null,
  englishText: null,
  image: null,
  audio: null,
});

const createAddEmptyOption = (): IAddOption => ({
  order: 0,
  optionId: "",
  isCorrect: false,
  sourceType: null,
  targetType: null,
  position: null,
});

interface MultipleChoiceOptionPromptProps {
  setQuestion: React.Dispatch<React.SetStateAction<IAddQuestion>>;
  setShowCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalIndex: React.Dispatch<React.SetStateAction<number>>;
  vietnameseTextForced: boolean;
  englishTextForced: boolean;
  visibleFields: Record<string, boolean>;
  isOnlyAudio: boolean;
}

const MultipleChoiceOptionPrompt: React.FC<MultipleChoiceOptionPromptProps> = ({
  setQuestion,
  setShowCreateModal,
  setModalIndex,
  vietnameseTextForced,
  englishTextForced,
  visibleFields,
  isOnlyAudio,
}) => {
  const [addAnswerOptions, setAddAnswerOptions] = useState<IAddOption[]>([]);

  // Các Answer Option để hiện thị, check image, audio, vietnameseText, englishText
  const [existedOptions, setExistedOptions] = useState<IMultipleChoiceOption[]>(
    []
  );
  const [filteredExistedOptions, setFilteredExistedOptions] = useState<
    IMultipleChoiceOption[]
  >([]);
  const [answerOptions, setAnswerOptions] = useState<IMultipleChoiceOption[]>(
    []
  );

  // useEffect(() => {
  //   if (question.questionConfiguration.englishText) {
  //     setEnglishTextForced(true);
  //   } else setEnglishTextForced(false);
  //   if (question.questionConfiguration.vietnameseText) {
  //     setVietnameseTextForced(true);
  //   } else setVietnameseTextForced(false);
  // }, [question.questionConfiguration]);

  useEffect(() => {
    const filtered = filterSearchOption(existedOptions);
    setFilteredExistedOptions(filtered);
  }, [visibleFields]);

  const handleCorrectChange = (index: number, isCorrect: boolean) => {
    const addUpdatedOptions = [...addAnswerOptions];
    addUpdatedOptions[index].isCorrect = isCorrect;
    setAddAnswerOptions(addUpdatedOptions);

    const updatedOptions = [...answerOptions];
    updatedOptions[index].isCorrect = isCorrect;
    setAnswerOptions(updatedOptions);
  };

  const handleAddOption = () => {
    setAddAnswerOptions((prev) => [...prev, createAddEmptyOption()]);
    setAnswerOptions((prev) => [...prev, createEmptyOption()]);
  };

  const handleSearch = async (value: string) => {
    if (!value) return;

    const result: IMultipleChoiceOption[] =
      (await getOptionByEnglishText(value)) ?? [];
    setExistedOptions(result);
    const filtered = filterSearchOption(result);

    setFilteredExistedOptions(filtered);
  };

  const filterSearchOption = (options: IMultipleChoiceOption[]) => {
    const filtered = options.filter((option) => {
      return Object.entries(visibleFields).every(([key, isVisible]) => {
        if (key === "instruction") return true;
        const value = option[key as keyof IMultipleChoiceOption];
        if (isOnlyAudio || (key === "englishText" && englishTextForced)) {
          return true;
        } else if (key === "vietnameseText" && vietnameseTextForced) {
          return true;
        }
        if (key === "audio" || key === "image") {
          return isVisible
            ? value !== null && (value as IResource).url !== ""
            : value === null;
        } else {
          // Trường hợp là string | null
          return isVisible ? value !== null && value !== "" : value === null;
        }
      });
    });
    return filtered;
  };

  const handleDelete = (index: number) => {
    const updatedOptions = [...answerOptions];
    updatedOptions.splice(index, 1);
    setAnswerOptions(updatedOptions);

    const updateAddOptions = [...addAnswerOptions];
    updateAddOptions.splice(index, 1);
    setAddAnswerOptions(updateAddOptions);
  };

  // Đồng bộ answerOptions vào question.options mỗi khi thay đổi
  useEffect(() => {
    setQuestion((prev) => ({
      ...prev,
      options: addAnswerOptions,
    }));
  }, [addAnswerOptions, setQuestion]);

  return (
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
      <div className="grid grid-cols-2 gap-x-4">
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
                  options={filteredExistedOptions.map((item) => ({
                    value:
                      item.englishText +
                      (item.vietnameseText ? " - " + item.vietnameseText : ""),
                    label:
                      item.englishText +
                      (item.vietnameseText ? " - " + item.vietnameseText : ""),
                    optionData: item,
                  }))}
                  placeholder="Search English Text"
                  onSearch={handleSearch}
                  onSelect={(value, option) => {
                    const data = option.optionData;
                    const selected = data as IMultipleChoiceOption;
                    const addSelected = {
                      order: index + 1,
                      optionId: data.id,
                      isCorrect: data.isCorrect,
                      position: null,
                      sourceType: null,
                      targetType: null,
                    } as IAddOption;
                    const addUpdated = [...addAnswerOptions];
                    addUpdated[index] = addSelected;
                    addUpdated[index].isCorrect =
                      addAnswerOptions[index].isCorrect;
                    setAddAnswerOptions(addUpdated);

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
  );
};

export default MultipleChoiceOptionPrompt;
