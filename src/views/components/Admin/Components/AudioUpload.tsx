import React, { useState, useEffect, useRef } from "react";
import { IResource } from "../../../../interfaces/IResource";
interface AudioUploadProps {
  onFileSelect: (audio: IResource) => void;
  audioUrl?: string | null;
}

const AudioUpload: React.FC<AudioUploadProps> = ({
  onFileSelect,
  audioUrl,
}) => {
  const [localAudioUrl, setLocalAudioUrl] = useState<string | null>(
    audioUrl || null
  );
  const [fileName, setFileName] = useState<string | null>(null);
  const [remainName, setRamainName] = useState<string | null>(null);
  const audioRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("Audio Updated !");
    setLocalAudioUrl(audioUrl || null);
    setFileName(remainName);
    if (!audioUrl && audioRef.current) {
      setFileName("Chọn file");
      audioRef.current.value = "";
    }
  }, [audioUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLocalAudioUrl(url);
      setFileName(file.name);
      setRamainName(file.name);
      const audioResource: IResource = {
        fileName: file.name,
        url,
        mimeType: 1,
        size: file.size,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        id: "",
      };
      onFileSelect(audioResource);
    }
  };

  return (
    <label htmlFor="audioUpload" className="flex flex-col">
      <div className="font-bold text-sm">3. Chọn file âm thanh</div>
      <input
        hidden
        ref={audioRef}
        id="audioUpload"
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="border-2 border-[#E5E5E5] rounded-xl"
        style={{ padding: "15px" }}
      />
      <div
        className="w-full  border-2 border-[#E5E5E5] rounded-xl text-[10px]"
        style={{ padding: "15px" }}
      >
        {fileName}
      </div>
    </label>
  );
};

export default AudioUpload;
