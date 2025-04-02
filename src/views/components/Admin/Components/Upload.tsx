import React, { useState } from "react";
import { Input, Upload, message } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { API_BASE_URL } from "../../../../configs/apiConfig";
import { IResource } from "../../../../interfaces/IResource";

interface FileUploadProps {
  type: "image" | "audio";
  setImageUpload?: React.Dispatch<React.SetStateAction<IResource | null>>;
  setAudioUpload?: React.Dispatch<React.SetStateAction<IResource | null>>;
  onUploadSuccess?: (url: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  type,
  onUploadSuccess,
  setImageUpload,
  setAudioUpload,
}) => {
  const [imgUrl, setImgUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_BASE_URL}Media/upload`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.isSuccess && result.value?.url) {
        const url = result.value.url;

        const newFile: UploadFile = {
          uid: "",
          name: file.name,
          status: "done",
          url: url,
        };
        if (type === "image") {
          setImgUrl(url);
        } else setAudioUrl(url);

        setFileList([newFile]);

        if (type === "image" && setImageUpload) {
          console.log("aaaa");
          console.log(result.value);
          setImageUpload(result.value);
        } else if (setAudioUpload) {
          setAudioUpload(result.value);
        }

        message.success("Upload successfully!");
      } else {
        message.error("Upload failed.");
      }
    } catch (err) {
      console.error(err);
      message.error("Upload failed.");
    }
  };

  const props: UploadProps = {
    beforeUpload: (file) => {
      const newFile: UploadFile = {
        uid: file.uid,
        name: file.name,
        status: "uploading",
        originFileObj: file,
      };
      setFileList([newFile]);
      handleUpload(file);
      return false;
    },
    onRemove: () => {
      setFileList([]);
      setImgUrl("");
      setAudioUrl("");
      if (setAudioUpload) setAudioUpload(null);
      if (setImageUpload) setImageUpload(null);
    },
    fileList,
    maxCount: 1,
    accept: type === "image" ? "image/*" : "audio/*",
    listType: type === "image" ? "picture" : "text",
    showUploadList: true,
  };

  return (
    <div className="flex flex-col gap-2">
      <Input
        disabled={true}
        placeholder={type !== "image" ? "Audio Url" : "Image Url"}
        value={type !== "image" ? audioUrl : imgUrl}
      />
      <Upload {...props}>
        {fileList.length === 0 && (
          <div
            style={{
              border: "1px dashed #d9d9d9",
              padding: "8px 12px",
              borderRadius: 4,
              cursor: "pointer",
              display: "inline-block",
            }}
          >
            <span style={{ color: "#1890ff" }}>
              {type === "image" ? "Upload Image" : "Upload Audio"}
            </span>
          </div>
        )}
      </Upload>
    </div>
  );
};

export default FileUpload;
