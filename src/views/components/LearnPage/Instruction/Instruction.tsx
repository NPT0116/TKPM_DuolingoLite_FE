interface InstructionProps {
  instruction: string;
}

const Instruction: React.FC<InstructionProps> = ({ instruction }) => {
  return (
    <span
      className="text-[32px] font-bold text-white"
      style={{
        marginBottom: "20px",
      }}
    >
      {instruction}
    </span>
  );
};

export default Instruction;
