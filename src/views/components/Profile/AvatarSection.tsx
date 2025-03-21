import { useRef, useState } from "react";
import EditButton from "../Button/EditButton";
import { uploadProfileImage } from "../../../services/User/UploadProfileImageService";

interface AvatarSectionProps {
  profileImageUrl: string | null;
}

const AvatarSection: React.FC<AvatarSectionProps> = ({ profileImageUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file) {
        try {
          await uploadProfileImage(file);
          window.location.href = "/profile";
        } catch (err) {
          console.error("Upload thất bại:", err);
        }
      }
    }
  };
  return (
    <div className="w-full h-[224px] bg-[#202F36] relative rounded-2xl overflow-y-hidden">
      <div className="absolute top-[14px] right-[14px]">
        <EditButton onClick={handleEditClick} />
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
      {profileImageUrl !== null ? (
        <div className="w-full h-full flex justify-center items-center">
          <img
            src={profileImageUrl}
            alt="Profile Picture"
            className="h-full w-auto max-w-[1111px] max-h-[224px] object-cover"
          />
        </div>
      ) : (
        <div className="absolute bottom-[-80px] left-[35%] ">
          <img
            src="https://d35aaqx5ub95lt.cloudfront.net/images/05147135350f5234cbf147813eee4db8.svg"
            alt="Profile Picture"
          />
        </div>
      )}
    </div>
  );
};

export default AvatarSection;
