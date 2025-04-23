import { Button, Checkbox, Input } from "antd";
import React, { useEffect, useState } from "react";
import FileUpload from "../Components/Upload";
import { addOption } from "../../../../services/Option/AddOptionService";
import { IAddNewOption } from "../../../../interfaces/Options/IBaseOption";

interface CreateOptionFormProps {
  setShowCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalIndex: number;
}

const CreateOptionForm: React.FC<CreateOptionFormProps> = ({
  setShowCreateModal,
  modalIndex,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [tempOption, setTempOption] = useState<IAddNewOption>({
    vietnameseText: null,
    englishText: null,
    image: null,
    audio: null,
    needAudio: false,
  });
  const [useAI, setUseAI] = useState(false);
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

  const handleCreate = async () => {
    const response = await addOption(tempOption);
    if ("error" in response) {
      setErrorMessage(response.error);
    } else {
      setShowCreateModal(false);
    }
  };

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
              onUploadSuccess={(url) =>
                setTempOption((prev) => ({ ...prev, audio: url }))
              }
              onRemoveFile={() =>
                setTempOption((prev) => ({ ...prev, audio: null }))
              }
            />
          )}
        </div>
        {errorMessage && (
          <div className="text-red-500 text-center font-semibold">
            {errorMessage}
          </div>
        )}
        <div className="flex justify-between mt-4">
          <Button onClick={() => setShowCreateModal(false)}>Cancel</Button>
          <Button type="primary" onClick={() => handleCreate()}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateOptionForm;
