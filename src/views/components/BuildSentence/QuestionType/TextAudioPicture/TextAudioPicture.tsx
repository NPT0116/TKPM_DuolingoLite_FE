export const TextAudioPicture: React.FC = () => {
  return (
    <div className="flex items-center border-b-2 border-[#37464F]">
      {/* Image Placeholder */}
      <div className="w-[175px] h-[175px] text-[20px] font-[500]"></div>

      {/* Text */}
      <div className="flex transform translate-x-[-20px]">
        <div
          className="transform translate-x-[2px]"
          style={{ marginTop: "25px" }}
        >
          <svg height="20" viewBox="0 0 18 20" width="18" fill="#131F24">
            <path
              d="M2.00358 19.0909H18V0.909058L0.624575 15.9561C-0.682507 17.088 0.198558 19.0909 2.00358 19.0909Z"
              stroke="#37464F"
              strokeWidth="0"
            ></path>
            <path
              clipRule="evenodd"
              d="M18 2.48935V0L0.83037 15.6255C-0.943477 17.2398 0.312833 20 2.82143 20H18V18.2916H16.1228H2.82143C1.98523 18.2916 1.56646 17.3716 2.15774 16.8335L16.1228 4.12436L18 2.48935Z"
              fillRule="evenodd"
              stroke="#37464F"
              strokeWidth="1"
            ></path>
          </svg>
        </div>

        {/* Text Question */}
        <div
          className="flex gap-[4.84px] border-2 border-[#37464F] h-fit rounded-xl text-[20px]"
          style={{ padding: "10px 14px" }}
        >
          {["coffee", "and", "water"].map((word, index) => (
            <span
              key={index}
              className="border-b-2 border-dashed border-[#52656D]"
              style={{ paddingBottom: "4px" }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
