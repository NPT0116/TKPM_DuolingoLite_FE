interface InputProps {
  type: string;
  placeholder: string;
}

export const InputField: React.FC<InputProps> = ({ type, placeholder }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="mt-2 rounded-2xl border-2 border-[#37464F] bg-[#202F36] text-[20px] text-white outline-none placeholder:font-semibold placeholder:text-[#DCE6EC] w-full focus:border-[#49C0F8]"
      style={{ padding: "10px" }}
    />
  );
};
