import { Resource } from "../../../../../interfaces/Resource";

interface OnlyAudioProps {
  audio: Resource;
}

export const OnlyAudio: React.FC<OnlyAudioProps> = ({ audio }) => {
  return (
    <div className="flex  justify-center items-end gap-[16px]">
      <button
        className="w-[140px] h-[136px] bg-[#49C0F8] flex items-center justify-center relative rounded-[25%] cursor-pointer active:translate-y-1"
        style={{
          boxShadow: "0 4px 0 0 #1899D6",
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.boxShadow = "0 0 0 0 #1899D6";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 0 0 #1899D6";
        }}
      >
        {/* Icon 1 (Loa chính) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#131F24"
          stroke="#131F24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-volume-2 w-[60px] h-auto absolute left-1/2 transform -translate-x-[25px]"
        >
          <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
        </svg>

        {/* Icon 2 (Sóng âm thanh) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#131F24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-volume-2 w-[60px] h-auto absolute left-1/2 transform translate-x-[-27px]"
        >
          <path d="M16 9a5 5 0 0 1 0 6" />
          <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
        </svg>
      </button>
    </div>
  );
};
