interface IOrderPrompt {
  order: number;
  content: string;
  processLine?: boolean;
  stepCss?: React.CSSProperties;
  contentCss?: React.CSSProperties;
}

const OrderPrompt: React.FC<IOrderPrompt> = ({
  order,
  content,
  processLine = false,
  stepCss,
  contentCss,
}) => {
  return (
    <div className="w-full " style={{ padding: "0 5px" }}>
      <div className="flex flex-roww-full">
        <div className="w-1/6">
          <div
            className="rounded-full text-[#B0B0B0] bg-[#E5E5E5] h-[25px] w-[25px] flex justify-center items-center font-bold"
            style={stepCss}
          >
            {order}
          </div>
        </div>
        <div className="w-5/6 font-bold text-[#B0B0B0]" style={contentCss}>
          {content}
        </div>
      </div>
      {processLine && (
        <div
          className="w-[2px] h-[80px] bg-[#E5E5E5] translate-x-[12.5px] "
          style={{ margin: "5px 0" }}
        ></div>
      )}
    </div>
  );
};
export default OrderPrompt;
