import React from "react";

interface InputProps {
  type: string;
  placeholder: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}

export const InputField: React.FC<InputProps> = ({
  type,
  placeholder,
  inputMode,
}) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    // Allow only numeric keys and control keys like Backspace
    if (!/^[0-9]$/.test(key) && key !== "Backspace") {
      event.preventDefault();
    }
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      inputMode={inputMode}
      className="mt-2 rounded-2xl border-2 border-[#37464F] bg-[#202F36] text-[20px] text-white outline-none placeholder:font-semibold placeholder:text-[#DCE6EC] w-full focus:border-[#49C0F8]"
      style={{ padding: "10px" }}
      onKeyPress={handleKeyPress}
    />
  );
};
