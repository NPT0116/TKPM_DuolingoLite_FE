import PopupDialog from "../../../../components/Admin/Components/PopupDialog";
import PopupHeader from "../../../../components/Admin/Components/PopupHeader";
import StepButton from "../../../../components/Admin/Components/StepButton";

interface IPopupChoseQuestionType {
  setVisible: () => void;
  navigatePage: (type: string) => void;
}
const PopupChoseQuestionType: React.FC<IPopupChoseQuestionType> = ({
  setVisible,
  navigatePage,
}) => {
  return (
    <PopupDialog containerWidth="40%" containerHeight="50%">
      <div className="w-full h-full">
        <div className="w-full h-1/5">
          <PopupHeader
            headerTitle="Choose Question Type"
            turnOff={() => {
              if (setVisible) {
                setVisible();
              }
            }}
          />
        </div>
        <div className="w-full h-4/5 " style={{ padding: "0 50px" }}>
          <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-4 justify-center items-center ">
            <div className="flex w-full h-full  items-end justify-center">
              <StepButton
                content="Multiple Choice"
                width="100%"
                onClick={() => {
                  navigatePage("multiple-choice");
                }}
              />
            </div>
            <div className="flex w-full h-full  items-end justify-center">
              <StepButton
                content="Build Sentence"
                width="100%"
                onClick={() => {
                  navigatePage("build-sentence");
                }}
              />
            </div>
            <div className="flex w-full h-full  items-start justify-center">
              <StepButton
                content="Matching"
                width="100%"
                onClick={() => {
                  navigatePage("matching");
                }}
              />
            </div>
            <div className="flex w-full h-full  items-start justify-center">
              <StepButton
                content="Pronunciation"
                width="100%"
                onClick={() => {
                  navigatePage("pronunciation");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </PopupDialog>
  );
};
export default PopupChoseQuestionType;
