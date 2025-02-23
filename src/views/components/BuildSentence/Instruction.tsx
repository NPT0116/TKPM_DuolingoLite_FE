interface InstructionProps {
  instruction: string;
}

const Instruction: React.FC<InstructionProps> = ({ instruction }) => {
  return <span className="text-[32px] font-bold">{instruction}</span>;
};

export default Instruction;
