interface IStepButton {
  content?: string;
  textColor?: string;
  borderColor?: string;
  bgColor?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  width?: string;
}
const StepButton: React.FC<IStepButton> = ({
  content,
  textColor,
  borderColor,
  bgColor,
  onClick,
  width,
}) => {
  const buttonCss = {
    padding: "10px 0",
    background: bgColor,
    color: textColor,
    borderColor: borderColor,
    width: width,
  };
  return (
    <button
      className="rounded-xl w-[150px] border-2 border-b-5 border-[#CECECE] text-[#1C9EDE] font-bold transition-all duration-200 active:translate-y-[2px] active:border-b-2"
      style={buttonCss}
      onClick={onClick}
    >
      {content}
    </button>
  );
};
export default StepButton;
