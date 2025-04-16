import { Button, Checkbox, Input } from "antd";
import React, { useEffect, useState } from "react";
import FileUpload from "../Components/Upload";
import { addOption } from "../../../../services/Option/AddOptionService";
import { IAddNewOption } from "../../../../interfaces/Options/IBaseOption";
import { CRUDType } from "../../../../enums/CRUDType";

interface PopupOptionFormProps {
  mode: CRUDType;
  onCancel: () => void;
  onCreate: (tempOption: IAddNewOption) => void;
  errorMessage: string;
  isSuccess: boolean;
  modalIndex: number;
  option?: IAddNewOption | null;
}

const PopupOptionForm: React.FC<PopupOptionFormProps> = ({
  mode,
  onCancel,
  onCreate,
  errorMessage,
  isSuccess,
  modalIndex,
  option,
}) => {
  const [tempOption, setTempOption] = useState<IAddNewOption>({
    optionId: "",
    vietnameseText: "",
    englishText: "",
    image: null,
    audio: null,
    needAudio: false,
    needImage: false,
  });
  const [useAI, setUseAI] = useState(false);

  useEffect(() => {
    if (option) {
      setTempOption(option);
      setUseAI(option.needAudio && !option.audio);
    }
  }, [option]);

  useEffect(() => {
    if (useAI) {
      setTempOption((prev) => ({ ...prev, audio: null }));
    }
    const shouldNeedAudio = useAI || tempOption.audio !== null;
    setTempOption((prev) => ({ ...prev, needAudio: shouldNeedAudio }));
  }, [useAI, tempOption.audio]);

  useEffect(() => {
    console.log(tempOption);
  }, [tempOption]);

  const successMessage =
    mode === CRUDType.CREATE
      ? "Create option successfully"
      : "Update option successfully";

  const buttonText = mode === CRUDType.CREATE ? "CREATE" : "UPDATE";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div
        className="bg-white  rounded-xl  flex flex-col justify-center gap-5 shadow-lg w-[40%]"
        style={{ padding: "20px" }}
      >
        <h2 className="text-xl font-bold text-center">Create New Option</h2>

        <div className="flex flex-col gap-2">
          <span>Vietnamese Text</span>
          <Input
            placeholder="Vietnamese Text"
            value={tempOption.vietnameseText}
            onChange={(e) =>
              setTempOption((prev) => ({
                ...prev,
                vietnameseText: e.target.value,
              }))
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <span>English Text</span>
          <Input
            placeholder="English Text"
            value={tempOption.englishText}
            onChange={(e) =>
              setTempOption((prev) => ({
                ...prev,
                englishText: e.target.value,
              }))
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <span>Image</span>
          <FileUpload
            type="image"
            defaultValue={tempOption.image}
            onUploadSuccess={(url) =>
              setTempOption((prev) => ({ ...prev, image: url }))
            }
            onRemoveFile={() =>
              setTempOption((prev) => ({ ...prev, image: null }))
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <span>Audio</span>
            <Checkbox onChange={() => setUseAI(!useAI)}>Use AI</Checkbox>
          </div>
          {!useAI && (
            <FileUpload
              type="audio"
              defaultValue={tempOption.audio}
              onUploadSuccess={(url) =>
                setTempOption((prev) => ({ ...prev, audio: url }))
              }
              onRemoveFile={() =>
                setTempOption((prev) => ({ ...prev, audio: null }))
              }
            />
          )}
        </div>
        {isSuccess ? (
          <div className="text-green-500 text-center font-semibold">
            {successMessage}
          </div>
        ) : (
          errorMessage && (
            <div className="text-red-500 text-center font-semibold">
              {errorMessage}
            </div>
          )
        )}
        <div className="flex justify-between mt-4">
          <Button onClick={() => onCancel()}>Cancel</Button>
          <Button type="primary" onClick={() => onCreate(tempOption)}>
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PopupOptionForm;
