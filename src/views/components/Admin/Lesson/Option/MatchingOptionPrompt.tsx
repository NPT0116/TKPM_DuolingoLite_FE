import { AutoComplete, Select } from "antd";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { getOptionByEnglishText } from "../../../../../services/Option/GetOptionService";
import { IResource } from "../../../../../interfaces/IResource";
import {
  IAddNewOption,
  IAddOption,
} from "../../../../../interfaces/Options/IBaseOption";
import { IAddQuestion } from "../../../../../interfaces/Questions/IBaseQuestion";
import { IMatchingOption } from "../../../../../interfaces/Options/IMatchingOption";
import {
  MatchingQuestionOptionType,
  optionDictionary,
} from "../../../../../enums/matchingQuestionType";

const createEmptyOption = (): IMatchingOption => ({
  optionId: "",
  audio: null,
  vietnameseText: "",
  sourceType: optionDictionary[MatchingQuestionOptionType.VietnameseText],
  targetType: optionDictionary[MatchingQuestionOptionType.EnglishText],
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

interface MatchingOptionPromptProps {
  setQuestion: React.Dispatch<React.SetStateAction<IAddQuestion>>;
  setShowCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAutoCompleteValues: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectAddNewOption: React.Dispatch<
    React.SetStateAction<IAddNewOption | null>
  >;
  setModalIndex: React.Dispatch<React.SetStateAction<number>>;
  autoCompleteValues: string[];
  vietnameseTextForced: boolean;
  englishTextForced: boolean;
  visibleFields: Record<string, boolean>;
  isOnlyAudio: boolean;
}

const MatchingOptionPrompt: React.FC<MatchingOptionPromptProps> = ({
  setQuestion,
  setShowCreateModal,
  setShowEditModal,
  setShowDeleteModal,
  setAutoCompleteValues,
  setSelectAddNewOption,
  setModalIndex,
  autoCompleteValues,
  vietnameseTextForced,
  englishTextForced,
  visibleFields,
  isOnlyAudio,
}) => {
  const [sourceType, setSourceType] = useState<MatchingQuestionOptionType>(
    MatchingQuestionOptionType.VietnameseText
  );
  const [targetType, setTargetType] = useState<MatchingQuestionOptionType>(
    MatchingQuestionOptionType.EnglishText
  );
  const [addAnswerOptions, setAddAnswerOptions] = useState<IAddOption[]>([]);

  // Các Answer Option để hiện thị, check image, audio, vietnameseText, englishText
  const [existedOptions, setExistedOptions] = useState<IMatchingOption[]>([]);
  const [filteredExistedOptions, setFilteredExistedOptions] = useState<
    IMatchingOption[]
  >([]);
  const [answerOptions, setAnswerOptions] = useState<IMatchingOption[]>([]);

  useEffect(() => {
    setQuestion((prev) => ({
      ...prev,
      options: prev.options.map((option) => ({
        ...option,
        sourceType,
        targetType,
      })),
    }));
  }, [sourceType, targetType]);

  useEffect(() => {
    const filtered = filterSearchOption(existedOptions);
    setFilteredExistedOptions(filtered);
  }, [visibleFields]);

  const handleAddOption = () => {
    const newOption: IAddOption = {
      ...createAddEmptyOption(),
      sourceType,
      targetType,
    };

    setAddAnswerOptions((prev) => [...prev, newOption]);
    setAnswerOptions((prev) => [...prev, createEmptyOption()]);
  };

  const handleSearch = async (value: string) => {
    if (!value) return;

    const result =
      ((await getOptionByEnglishText(value)) as IMatchingOption[]) ?? [];
    setExistedOptions(result);
    const filtered = filterSearchOption(result);

    setFilteredExistedOptions(filtered);
  };

  const filterSearchOption = (options: IMatchingOption[]) => {
    const filtered = options.filter((option) => {
      return Object.entries(visibleFields).every(([key, isVisible]) => {
        if (key === "instruction") return true;
        const value = option[key as keyof IMatchingOption];
        if (isOnlyAudio || (key === "englishText" && englishTextForced)) {
          return true;
        } else if (key === "vietnameseText" && vietnameseTextForced) {
          return true;
        }
        if (key === "audio" || key === "image") {
          const resource = value as IResource | null;
          return isVisible
            ? resource !== null && !!resource.url
            : resource === null;
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

  const optionTypes = Object.values(MatchingQuestionOptionType)
    .filter((v) => !isNaN(Number(v))) // chỉ lấy giá trị số
    .map((value) => ({
      value: value as MatchingQuestionOptionType,
      label: optionDictionary[value as MatchingQuestionOptionType],
    }));
  return (
    <div className="w-full h-5/6 flex flex-col justify-start gap-4">
      <div className="flex flex-col gap-2">
        <span className="font-bold">
          <span className="text-red-500">* </span>Source Type
        </span>
        <Select
          style={{ width: "100%" }}
          value={sourceType} // kiểu số: 0, 1, 2, 3
          onChange={(value) => setSourceType(value)}
          options={optionTypes}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-bold">
          <span className="text-red-500">* </span>Target Type
        </span>
        <Select
          style={{ width: "100%" }}
          value={targetType}
          onChange={(value) => setTargetType(value)}
          options={optionTypes}
        />
      </div>
      <Button
        type="dashed"
        className="w-full flex justify-center"
        style={{ margin: "10px auto", padding: "20px" }}
        onClick={handleAddOption}
      >
        + ADD OPTION
      </Button>
      {/* Option List */}
      <div className="grid grid-cols-1 2xl:grid-cols-2  gap-x-4">
        {answerOptions.map((option, index) => (
          <div>
            <div
              key={index}
              className="border p-3 rounded shadow flex flex-col gap-4"
              style={{ padding: "25px", marginBottom: "15px" }}
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
                <div className="w-full flex gap-2 ">
                  <AutoComplete
                    style={{ width: "100%" }}
                    value={autoCompleteValues[index]}
                    onChange={(value) => {
                      const updatedValues = [...autoCompleteValues];
                      updatedValues[index] = value;
                      setAutoCompleteValues(updatedValues);
                    }}
                    options={filteredExistedOptions.map((item) => ({
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
                      const data = option.optionData;
                      const selected = data as IMatchingOption;
                      selected.optionId = data.id;
                      const addSelected = {
                        order: index + 1,
                        optionId: data.id,
                        isCorrect: true,
                        position: null,
                        sourceType: sourceType,
                        targetType: targetType,
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
                  {addAnswerOptions[index] && (
                    <div className="w-[10%] flex gap-2">
                      <button
                        className="bg-[#51A2FF] hover:bg-[#92c5ff] cursor-pointer transition-colors ease-in-out h-full aspect-square rounded-xl flex justify-center items-center"
                        title="Edit this option"
                        onClick={() => {
                          const selectedOption = answerOptions[index];
                          const mapped: IAddNewOption = {
                            optionId: selectedOption.optionId,
                            vietnameseText: selectedOption.vietnameseText ?? "",
                            englishText: selectedOption.englishText ?? "",
                            image: selectedOption.image?.url ?? null,
                            audio: selectedOption.audio?.url ?? null,
                            needAudio: selectedOption.audio?.url ? true : false,
                            needImage: false,
                          };

                          setSelectAddNewOption(mapped);
                          setShowEditModal(true);
                        }}
                      >
                        {" "}
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.8637 2.28623L12.1531 1.00038C13.4906 -0.33346 15.659 -0.333457 16.9965 1.00038C18.3339 2.33421 18.3339 4.49679 16.9965 5.83062L15.7071 7.11648L10.8637 2.28623ZM9.34202 3.80383L0.902018 12.2209C0.0785876 13.0421 -0.354215 16.9413 0.363097 17.6567C1.08041 18.3722 4.90788 17.8864 5.7454 17.0512L14.1854 8.63408L9.34202 3.80383Z"
                            className="fill-white"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="bg-[#f80000] hover:bg-[#fd8484] cursor-pointer transition-colors ease-in-out h-full aspect-square rounded-xl flex justify-center items-center"
                        title="Delete this option"
                        onClick={() => {
                          const selectedOption = answerOptions[index];
                          const mapped: IAddNewOption = {
                            optionId: selectedOption.optionId,
                            vietnameseText: selectedOption.vietnameseText ?? "",
                            englishText: selectedOption.englishText ?? "",
                            image: selectedOption.image?.url ?? null,
                            audio: selectedOption.audio?.url ?? null,
                            needAudio: selectedOption.audio?.url ? true : false,
                            needImage: false,
                          };

                          setSelectAddNewOption(mapped);
                          setShowDeleteModal(true);
                        }}
                      >
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="3"
                          stroke="white"
                          className="w-[16px] aspect-square"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
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

export default MatchingOptionPrompt;
