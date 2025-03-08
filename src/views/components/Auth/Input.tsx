import React from "react";

interface InputProps {
  type: string;
  placeholder: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  width: number;
  value: string;
  // onChange: React.Dispatch<React.SetStateAction<string>>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField: React.FC<InputProps> = ({
  type,
  placeholder,
  inputMode,
  width,
  value,
  onChange,
}) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === "number") {
      const { key } = event;
      // Allow numeric digits and common control keys
      if (
        !/^[0-9]$/.test(key) &&
        key !== "Backspace" &&
        key !== "ArrowLeft" &&
        key !== "ArrowRight" &&
        key !== "Delete"
      ) {
        event.preventDefault();
      }
    }
  };
  const inputStyle = {
    width: `${width}%`,
    padding: "10px",
  };

  return (
    <input
      value={value}
      onChange={onChange}
      style={inputStyle}
      type={type}
      placeholder={placeholder}
      inputMode={inputMode}
      className="mt-2 rounded-md border-2 border-[#37464F] bg-[#202F36]  text-white outline-none placeholder:font-semibold placeholder:text-[#DCE6EC] w-full focus:border-[#49C0F8]"
      onKeyPress={handleKeyPress}
    />
  );
};
