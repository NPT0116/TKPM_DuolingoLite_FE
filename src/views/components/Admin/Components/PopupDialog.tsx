interface IPopupDialog {
  containerWidth?: string;
  containerHeight?: string;
  children: React.ReactNode;
}

const PopupDialog: React.FC<IPopupDialog> = ({
  children,
  containerWidth,
  containerHeight,
}) => {
  const containerSize = {
    width: containerWidth,
    height: containerHeight,
  };
  return (
    <div className="absolute top-0 left-0 w-full h-full !z-10">
      {/* The blur background Behind */}
      <div className="w-[100%] h-[100%] bg-black opacity-70 "></div>
      {/* Main Content */}
      <div
        className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2  bg-white rounded-xl"
        style={containerSize}
      >
        {children}
      </div>
    </div>
  );
};
export default PopupDialog;
