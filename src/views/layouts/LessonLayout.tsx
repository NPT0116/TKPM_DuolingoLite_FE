import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import XPBar from "../components/XPBar/XPBar";
import ContinueButton from "../components/Button/ContinueButton";
const LessonLayout: React.FC = () => {
  const [xp, setXp] = useState({ accumulated: 0, total: 1 });
  const [state, setState] = useState(1);
  const [isButtonActivate, setIsButtonActive] = useState(true);
  // useEffect(() => {
  //   setIsButtonActive();
  // });
  return (
    <div>
      {/* XP Bar */}
      <div className="w-[100vw] h-[10vh] ">
        <XPBar accumulated={xp.accumulated} total={xp.total} />
      </div>
      {/* Main Layout */}
      <div className="w-[100vw] h-[75vh]">
        {/* <Outlet context={{ setXp, state, setIsButtonActive }} /> */}
      </div>
      state == 1 mount cai question 1 do
      {/* Navigation Bar */}
      <div
        className="w-[100vw] h-[15vh] border-[#37464F] border-t-2 bg-[#131F23]"
        style={{ padding: "10px 0px" }}
      >
        <ContinueButton
          state={state}
          setState={setState}
          isButtonActivate={isButtonActivate}
          mainColor="3B4EFF"
          borderColor="3F22EC"
          hoverColor="4156FF"
          paddingWidth={80}
          positionRight={250}
        />
      </div>
    </div>
  );
};
export default LessonLayout;
