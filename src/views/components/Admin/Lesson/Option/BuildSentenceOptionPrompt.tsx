import { AutoComplete } from "antd";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { getOptionByEnglishText } from "../../../../../services/Option/GetOptionService";
import { IResource } from "../../../../../interfaces/IResource";
import { IAddOption } from "../../../../../interfaces/Options/IBaseOption";
import { IAddQuestion } from "../../../../../interfaces/Questions/IBaseQuestion";
import { IBuildSentenceOption } from "../../../../../interfaces/Options/IBuildSentenceOption";

const createEmptyOption = (): IBuildSentenceOption => ({
  order: -1,
  optionId: "",
  audio: null,
  vietnameseText: "",
  englishText: "",
  image: null,
});

const createAddEmptyOption = (): IAddOption => ({
  order: 0,
  optionId: "",
  isCorrect: false,
  sourceType: null,
  targetType: null,
  position: null,
});

interface BuildSentenceOptionPromptProps {
  setQuestion: React.Dispatch<React.SetStateAction<IAddQuestion>>;
  setShowCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalIndex: React.Dispatch<React.SetStateAction<number>>;
  vietnameseTextForced: boolean;
  englishTextForced: boolean;
  visibleFields: Record<string, boolean>;
}

const BuildSentenceOptionPrompt: React.FC<BuildSentenceOptionPromptProps> = ({
  setQuestion,
  setShowCreateModal,
  setModalIndex,
  vietnameseTextForced,
  englishTextForced,
  visibleFields,
}) => {
  const [addAnswerOptions, setAddAnswerOptions] = useState<IAddOption[]>([]);

  // Các Answer Option để hiện thị, check image, audio, vietnameseText, englishText
  const [existedOptions, setExistedOptions] = useState<IBuildSentenceOption[]>(
    []
  );
  const [filteredExistedOptions, setFilteredExistedOptions] = useState<
    IBuildSentenceOption[]
  >([]);
  const [answerOptions, setAnswerOptions] = useState<IBuildSentenceOption[]>(
    []
  );

  useEffect(() => {
    const filtered = filterSearchOption(existedOptions);
    setFilteredExistedOptions(filtered);
  }, [visibleFields]);

  const handleAddOption = () => {
    setAddAnswerOptions((prev) => [...prev, createAddEmptyOption()]);
    setAnswerOptions((prev) => [...prev, createEmptyOption()]);
  };

  const handleSearch = async (value: string) => {
    if (!value) return;

    const result =
      ((await getOptionByEnglishText(value)) as IBuildSentenceOption[]) ?? [];
    setExistedOptions(result);
    const filtered = filterSearchOption(result);

    setFilteredExistedOptions(filtered);
  };

  const filterSearchOption = (options: IBuildSentenceOption[]) => {
    // Gộp logic loại bớt trường thừa trước khi filter
    const filteredVisibleFields = { ...visibleFields };

    if (visibleFields.englishText) {
      delete filteredVisibleFields.vietnameseText;
    } else if (visibleFields.vietnameseText) {
      delete filteredVisibleFields.englishText;
    }

    const filtered = options.filter((option) => {
      return Object.entries(filteredVisibleFields).every(([key, isVisible]) => {
        if (key === "instruction") return true;

        const value = option[key as keyof IBuildSentenceOption];

        if (key === "audio" || key === "image") {
          return isVisible
            ? value !== null && (value as IResource).url !== ""
            : value === null;
        } else {
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
                    const selected = data as IBuildSentenceOption;
                    const addSelected = {
                      order: -1,
                      optionId: data.id,
                      isCorrect: false,
                      position: null,
                    } as IAddOption;
                    const addUpdated = [...addAnswerOptions];
                    addUpdated[index] = addSelected;
                    addUpdated[index].isCorrect =
                      addAnswerOptions[index].isCorrect;
                    setAddAnswerOptions(addUpdated);

                    const updated = [...answerOptions];
                    updated[index] = selected;
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

export default BuildSentenceOptionPrompt;
