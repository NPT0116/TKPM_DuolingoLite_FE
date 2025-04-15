interface EditButtonProps {
  onClick: () => void;
}
const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <div
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      style={{ padding: "10px" }}
      className="w-full h-full rounded-xl flex justify-center items-center text-center bg-[#F7F7F7] text-[#AFAFAF] text-bold border-1 border-dashed hover:scale-102 
          hover:bg-blue-400 hover:text-white hover:border-white transition-all duration-200 cursor-pointer
          font-bold text-xl"
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
    </div>
  );
};
export default EditButton;
