import React from "react";

interface InputProps {
  type: string;
  placeholder: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  width: number;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const InputField: React.FC<InputProps> = ({
  type,
  placeholder,
  inputMode,
  width,
  value,
  onChange,
  error,
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
    border: error ? "1px solid red" : "",
  };

  return (
    <div className="w-full">
      <input
        value={value}
        onChange={onChange}
        style={inputStyle}
        type={type}
        placeholder={placeholder}
        inputMode={inputMode}
        className="rounded-md border-2 border-[#37464F] bg-[#202F36]  text-white outline-none placeholder:font-semibold placeholder:text-[#DCE6EC] w-full focus:border-[#49C0F8]"
        onKeyPress={handleKeyPress}
      />
      <span className=" w-full h-[50px] text-red-500 font-stretch-50%">
        {error}
      </span>
    </div>
  );
};
