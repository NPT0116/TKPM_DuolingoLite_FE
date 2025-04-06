import { AutoComplete, Checkbox, Radio } from "antd";
import { useEffect, useState } from "react";
import { IAddConfigure } from "../../../../interfaces/Configure/Configure";
import { Button } from "antd";
import CreateOptionForm from "./CreateOptionForm";
import { IMultipleChoiceOption } from "../../../../interfaces/Options/IMultipleChoiceOption";
import { getOptionByEnglishText } from "../../../../services/Option/GetOptionService";
import { IResource } from "../../../../interfaces/IResource";
import { IAddOption } from "../../../../interfaces/Options/IBaseOption";
import { IAddQuestion } from "../../../../interfaces/Questions/IBaseQuestion";

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
  configureArray: string[];
  question: IAddQuestion;
  setQuestion: React.Dispatch<React.SetStateAction<IAddQuestion>>;
}

const MultipleChoiceOptionPrompt: React.FC<MultipleChoiceOptionPromptProps> = ({
  configureArray,
  question,
  setQuestion,
}) => {
  const [audioForced, setAudioForced] = useState(false);
  const [vietnameseTextForced, setVietnameseTextForced] = useState(false);
  const [englishTextForced, setEnglishTextForced] = useState(false);
  const [visibleFields, setVisibleFields] = useState<Record<string, boolean>>({
    instruction: false,
    vietnameseText: false,
    englishText: false,
    audio: false,
    image: false,
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

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

  const toCamelCase = (str: string): keyof IAddConfigure => {
    return (str.charAt(0).toLowerCase() +
      str.slice(1).replace(/\s+/g, "")) as keyof IAddConfigure;
  };

  const handleCheckBox = (field: string) => () => {
    const key = toCamelCase(field);
    const newValue = !visibleFields[key];
    if (key === "englishText") {
      setVisibleFields((prev) => ({
        ...prev,
        englishText: newValue,
        audio: newValue,
      }));
      if (newValue) {
        setVisibleFields((prev) => ({
          ...prev,
          vietnameseText: false,
        }));
      }
      setVietnameseTextForced(newValue);
      setAudioForced(newValue);
    } else if (key === "vietnameseText") {
      setVisibleFields((prev) => ({
        ...prev,
        vietnameseText: newValue,
      }));
      if (newValue) {
        setVisibleFields((prev) => ({
          ...prev,
          englishText: false,
        }));
      }
      setEnglishTextForced(newValue);
    } else if (!audioForced || key !== "audio") {
      setVisibleFields((prev) => ({
        ...prev,
        [key]: newValue,
      }));
    }
    setQuestion((prev) => ({
      ...prev,
      optionConfiguration: {
        ...prev.optionConfiguration,
        [key]: newValue,
        ...(key === "englishText" ? { audio: newValue } : {}),
      },
    }));
  };

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
        if (key === "englishText" && englishTextForced) {
          return true;
        } else if (key === "vietNameseText" && vietnameseTextForced) {
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

  useEffect(() => {
    const { id, ...restConfig } = question.optionConfiguration;
    setVisibleFields(restConfig);
  }, [question.optionConfiguration]);
  return (
    <div className="w-full h-full flex flex-col justify-evenly overflow-y-auto">
      <header className="h-1/6 bg-gray-300">
        <h3 className="text-3xl font-extrabold tracking-wide uppercase text-center">
          Option Configuration
        </h3>
        <section>
          <ul className="flex flex-wrap gap-8 justify-center">
            {configureArray.map((field, index) => (
              <li key={index}>
                {field !== "Instruction" && (
                  <Checkbox
                    onChange={handleCheckBox(field)}
                    checked={visibleFields[toCamelCase(field)]}
                    disabled={
                      toCamelCase(field) === "englishText"
                        ? englishTextForced
                        : toCamelCase(field) === "vietnameseText"
                        ? vietnameseTextForced
                        : toCamelCase(field) === "audio"
                        ? audioForced
                        : false
                    }
                  >
                    <span className="text-[18px]">{field}</span>
                  </Checkbox>
                )}
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
      {showCreateModal && (
        <CreateOptionForm
          setShowCreateModal={setShowCreateModal}
          modalIndex={modalIndex}
        />
      )}
    </div>
  );
};

export default MultipleChoiceOptionPrompt;
