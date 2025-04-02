import { Button, Input } from "antd";
import { IMultipleChoiceOption } from "../../../../interfaces/Options/IMultipleChoiceOption";
import React, { useState } from "react";
import FileUpload from "../Components/Upload";
import { addOption } from "../../../../services/Option/AddOptionService";

interface CreateOptionFormProps {
  setShowCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalIndex: number;
}

const CreateOptionForm: React.FC<CreateOptionFormProps> = ({
  setShowCreateModal,
  modalIndex,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [tempOption, setTempOption] = useState<IMultipleChoiceOption>({
    isCorrect: false,
    vietnameseText: null,
    englishText: "",
    image: null,
    audio: null,
  });

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
          <FileUpload type="image" />
        </div>
        <div className="flex flex-col gap-2">
          <span>Audio</span>
          <FileUpload type="audio" />
        </div>
        {errorMessage && (
          <div className="text-red-500 text-center font-semibold">
            {errorMessage}
          </div>
        )}
        <div className="flex justify-between mt-4">
          <Button onClick={() => setShowCreateModal(false)}>Cancel</Button>
          <Button
            type="primary"
            onClick={async () => {
              try {
                const response = await addOption(tempOption);
                if (response) {
                  setShowCreateModal(false);
                } else {
                  setErrorMessage(
                    "Failed to create option. Please check the fields."
                  );
                }
              } catch (err: any) {
                const serverError = err?.response?.data?.errors;
                if (serverError) {
                  const firstKey = Object.keys(serverError)[0];
                  setErrorMessage(serverError[firstKey][0]);
                } else {
                  setErrorMessage("An unexpected error occurred.");
                }
              }
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateOptionForm;
