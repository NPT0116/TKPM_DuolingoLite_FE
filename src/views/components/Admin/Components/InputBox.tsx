interface IInputBox {
  title: string;
  id: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
const InputBox: React.FC<IInputBox> = ({
  title,
  id,
  type,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor={id} className="font-bold text-sm">
        {title}
      </label>
      <input
        id={id}
        value={value}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full  border-2 border-[#E5E5E5] rounded-xl text-sm"
        style={{ padding: "15px" }}
      />
    </div>
  );
};
export default InputBox;
