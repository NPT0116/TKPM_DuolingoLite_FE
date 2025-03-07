import React from "react";

interface InputProps {
  type: string;
  placeholder: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  width: number;
}

export const InputField: React.FC<InputProps> = ({
  type,
  placeholder,
  inputMode,
  width,
}) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    // Allow only numeric keys and control keys like Backspace
    if (!/^[0-9]$/.test(key) && key !== "Backspace") {
      event.preventDefault();
    }
  };
  const inputStyle = {
    width: `${width}%`,
    padding: "10px",
  };

  return (
    <input
      style={inputStyle}
      type={type}
      placeholder={placeholder}
      inputMode={inputMode}
      className="mt-2 rounded-md border-2 border-[#37464F] bg-[#202F36]  text-white outline-none placeholder:font-semibold placeholder:text-[#DCE6EC] w-full focus:border-[#49C0F8]"
      onKeyPress={handleKeyPress}
    />
  );
};
