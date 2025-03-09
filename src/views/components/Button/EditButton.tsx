interface EditButtonProps {
  onClick?: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <button
      className="border-2 border-[#172227] rounded-2xl w-[46px] h-[44px] flex justify-center items-center cursor-pointer hover:bg-[#1d2b31] active:translate-y-0.5"
      style={{ boxShadow: "0 3px 0 0 #172227" }}
      onMouseDown={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 0 0 #172227";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.boxShadow = "0 3px 0 0 #172227";
      }}
      onClick={onClick}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.8637 2.28623L12.1531 1.00038C13.4906 -0.33346 15.659 -0.333457 16.9965 1.00038C18.3339 2.33421 18.3339 4.49679 16.9965 5.83062L15.7071 7.11648L10.8637 2.28623ZM9.34202 3.80383L0.902018 12.2209C0.0785876 13.0421 -0.354215 16.9413 0.363097 17.6567C1.08041 18.3722 4.90788 17.8864 5.7454 17.0512L14.1854 8.63408L9.34202 3.80383Z"
          fill="currentColor"
        ></path>
      </svg>
    </button>
  );
};

export default EditButton;
