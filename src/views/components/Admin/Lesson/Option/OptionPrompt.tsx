import { Checkbox } from "antd";
import { useEffect, useState } from "react";
import { IAddConfigure } from "../../../../../interfaces/Configure/Configure";
import PopupOptionForm from "../PopupOptionForm";
import { IAddQuestion } from "../../../../../interfaces/Questions/IBaseQuestion";
import { QuestionType } from "../../../../../enums/questionType";
import MultipleChoiceOptionPrompt from "./MultipleChoiceOptionPrompt";
import MatchingOptionPrompt from "./MatchingOptionPrompt";
import BuildSentenceOptionPrompt from "./BuildSentenceOptionPrompt";
import { CRUDType } from "../../../../../enums/CRUDType";
import PopupDelete from "../../../../pages/AdminPage/management/PopupContent/PopupDelete";
import PopupDialog from "../../Components/PopupDialog";
import {
  IAddNewOption,
  IAddOption,
} from "../../../../../interfaces/Options/IBaseOption";
import { deleteOption } from "../../../../../services/Option/DeleteOptionService";
import { addOption } from "../../../../../services/Option/AddOptionService";
import { editOption } from "../../../../../services/Option/EditOptionService";
interface OptionPromptProps {
  configureArray: string[];
  question: IAddQuestion;
  setQuestion: React.Dispatch<React.SetStateAction<IAddQuestion>>;
  questionType: QuestionType;
}

const OptionPrompt: React.FC<OptionPromptProps> = ({
  configureArray,
  question,
  setQuestion,
  questionType,
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
  const [autoCompleteValues, setAutoCompleteValues] = useState<string[]>([]);
  //Create Option
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [errorCreateOption, setErrorCreateOption] = useState("");
  const [isCreateOptionSuccess, setIsCreateOptionSuccess] = useState(false);

  //Edit Option
  const [showEditModal, setShowEditModal] = useState(false);
  const [errorEditOption, setErrorEditOption] = useState("");
  const [isEditOptionSuccess, setIsEditOptionSuccess] = useState(false);
  // Delete Option
  const [selectAddNewOption, setSelectAddNewOption] =
    useState<IAddNewOption | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errorDeleteOption, setErrorDeleteOption] = useState("");
  const [isDeleteOptionSuccess, setIsDeleteOptionSuccess] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [isOnlyAudio, setIsOnlyAudio] = useState(false);
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
      setAudioForced(newValue);
      if (
        questionType === QuestionType.MultipleChoice ||
        questionType === QuestionType.BuildSentence
      ) {
        setVietnameseTextForced(newValue);
      }
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
      if (
        questionType === QuestionType.MultipleChoice ||
        questionType === QuestionType.BuildSentence
      ) {
        setEnglishTextForced(newValue);
      }
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
    setAutoCompleteValues(new Array(question.options.length).fill(""));
  };

  useEffect(() => {
    const { id, ...restConfig } = question.optionConfiguration;
    setVisibleFields(restConfig);

    //Check onlyAudio
    const configWithoutId = { ...restConfig };
    const { audio, ...others } = configWithoutId;

    const areOthersFalse = Object.values(others).every((value) => !value);
    setIsOnlyAudio(audio === true && areOthersFalse);
  }, [question.optionConfiguration]);

  const renderOptionPrompt = () => {
    switch (questionType) {
      case QuestionType.MultipleChoice:
        return (
          <MultipleChoiceOptionPrompt
            setQuestion={setQuestion}
            setShowCreateModal={setShowCreateModal}
            setShowEditModal={setShowEditModal}
            setShowDeleteModal={setShowDeleteModal}
            setSelectAddNewOption={setSelectAddNewOption}
            setAutoCompleteValues={setAutoCompleteValues}
            autoCompleteValues={autoCompleteValues}
            setModalIndex={setModalIndex}
            vietnameseTextForced={vietnameseTextForced}
            englishTextForced={englishTextForced}
            visibleFields={visibleFields}
            isOnlyAudio={isOnlyAudio}
          />
        );
      case QuestionType.Matching:
        return (
          <MatchingOptionPrompt
            setQuestion={setQuestion}
            setShowCreateModal={setShowCreateModal}
            setShowEditModal={setShowEditModal}
            setShowDeleteModal={setShowDeleteModal}
            setSelectAddNewOption={setSelectAddNewOption}
            setAutoCompleteValues={setAutoCompleteValues}
            autoCompleteValues={autoCompleteValues}
            setModalIndex={setModalIndex}
            vietnameseTextForced={vietnameseTextForced}
            englishTextForced={englishTextForced}
            visibleFields={visibleFields}
            isOnlyAudio={isOnlyAudio}
          />
        );
      case QuestionType.BuildSentence:
        return (
          <BuildSentenceOptionPrompt
            setQuestion={setQuestion}
            setShowCreateModal={setShowCreateModal}
            setShowEditModal={setShowEditModal}
            setShowDeleteModal={setShowDeleteModal}
            setSelectAddNewOption={setSelectAddNewOption}
            setAutoCompleteValues={setAutoCompleteValues}
            autoCompleteValues={autoCompleteValues}
            setModalIndex={setModalIndex}
            vietnameseTextForced={vietnameseTextForced}
            englishTextForced={englishTextForced}
            visibleFields={visibleFields}
            isOnlyAudio={isOnlyAudio}
          />
        );

      default:
        return null;
    }
  };

  const handleCreateOption = async (option: IAddNewOption) => {
    const result = await addOption(option);
    if ("error" in result) {
      setErrorCreateOption(result.error);
    } else {
      setIsCreateOptionSuccess(true);

      setTimeout(() => {
        setShowCreateModal(false);
      }, 1000);
    }
  };

  const handleEditOption = async (option: IAddNewOption) => {
    const result = await editOption(option);
    if ("error" in result) {
      setErrorEditOption(result.error);
    } else {
      setIsEditOptionSuccess(true);
      setAutoCompleteValues(new Array(question.options.length).fill(""));
      setTimeout(() => {
        setShowEditModal(false);
      }, 1000);
    }
  };

  useEffect(() => {
    setIsCreateOptionSuccess(false);
    setErrorCreateOption("");
  }, [showCreateModal]);

  const handleDeleteOption = async () => {
    const result = await deleteOption(selectAddNewOption!.optionId!);
    if ("error" in result) {
      setErrorDeleteOption(result.error);
    } else {
      setIsDeleteOptionSuccess(true);
      setAutoCompleteValues(new Array(question.options.length).fill(""));

      setTimeout(() => {
        setShowDeleteModal(false);
      }, 1000);
    }
  };

  useEffect(() => {
    setErrorDeleteOption("");
    setIsDeleteOptionSuccess(false);
  }, [selectAddNewOption]);

  useEffect(() => {
    setErrorCreateOption("");
    setIsEditOptionSuccess(false);
  }, [selectAddNewOption]);

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
      {renderOptionPrompt()}

      {showCreateModal && (
        <PopupOptionForm
          mode={CRUDType.CREATE}
          onCancel={() => setShowCreateModal(false)}
          onCreate={(option) => handleCreateOption(option)}
          isSuccess={isCreateOptionSuccess}
          errorMessage={errorCreateOption}
          modalIndex={modalIndex}
        />
      )}
      {showEditModal && (
        <PopupOptionForm
          mode={CRUDType.UPDATE}
          onCancel={() => setShowEditModal(false)}
          onCreate={(option) => handleEditOption(option)}
          isSuccess={isEditOptionSuccess}
          errorMessage={errorEditOption}
          modalIndex={modalIndex}
          option={selectAddNewOption}
        />
      )}
      {showDeleteModal && (
        <PopupDialog containerWidth="fit" containerHeight="fit">
          <PopupDelete
            title="DELETE THIS OPTION ?"
            onCancel={() => {
              setShowDeleteModal(false);
            }}
            onDelete={() => {
              handleDeleteOption();
            }}
            errorMessage={errorDeleteOption}
            isDeleteSuccess={isDeleteOptionSuccess}
          />
        </PopupDialog>
      )}
    </div>
  );
};

export default OptionPrompt;
