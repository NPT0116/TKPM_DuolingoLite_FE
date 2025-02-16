/** @jsxImportSource @emotion/react */

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { css } from "@emotion/react";

// Import page
import HdyhauPage from "./HdyhauPage";
import ChoosePathPage from "./ChoosePathPage";
import ProficiencyPage from "./ProficiencyPage";
import ReasonPage from "./ReasonPage";
import CourseOverviewPage from "./CourseOverviewPage";
import DailyGoalPage from "./DailyGoalPage";

const WelcomePage: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [state, setState] = useState(2);
  const [stateContent, setStateContent] = useState("Chào bạn! Tớ là cứ Duo!");
  const navigate = useNavigate();
  const location = useLocation();

  // Extract Query Parameters
  const queryParams = new URLSearchParams(location.search);
  const welcomeStep = queryParams.get("welcomeStep");
  const stepMapping: { [key: number]: { [key: string]: string } } = {
    1: {
      query: "",
      message: "Chào bạn! Tớ là cứ Duo!",
    },
    2: {
      query: "",
      message: "Cùng bắt đầu buổi tiệc ngôn ngữ nào!",
    },
    3: {
      query: "hdyhau",
      message: "Bạn biết đến Duolingo từ đâu?",
    },
    4: {
      query: "learningReason",
      message: "Tại sao bạn học tiếng Anh",
    },
    5: {
      query: "proficiency",
      message: "Trình độ tiếng Anh của bạn ở mức nào?",
    },
    6: {
      query: "courseOverview",
      message: "Và đây là nhưng thành quả của bạn sẽ có thể đạt được!",
    },
    7: {
      query: "dailyGoal",
      message: "Mục tiêu hàng ngày của bạn là gì?",
    },
    8: {
      query: "choosePath",
      message: "Giờ mình cùng tìm điểm khởi đầu phù hợp nhé!",
    },
  };

  // Restore state
  useEffect(() => {
    if (welcomeStep) {
      const newState = Object.keys(stepMapping).find(
        (key) => stepMapping[Number(key)].query === welcomeStep
      );
      setState(Number(newState) + 1);
      setStateContent(stepMapping[Number(newState)].message);
    }
  }, []);

  // Function
  const handleMouseDown = () => {
    setIsActive(true);
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };
  const navigateQuery = (query: string) => {
    navigate(`/welcome?welcomeStep=${query}`);
  };
  const ChangeOwlMessage = (state: number) => {
    switch (state) {
      case 2:
        setStateContent(stepMapping[state].message);
        break;
      case 3:
        navigateQuery(stepMapping[state].query);
        setStateContent(stepMapping[state].message);
        break;
      case 4:
        navigateQuery(stepMapping[state].query);
        setStateContent(stepMapping[state].message);
        break;
      case 5:
        navigateQuery(stepMapping[state].query);
        setStateContent(stepMapping[state].message);
        break;
      case 6:
        navigateQuery(stepMapping[state].query);
        setStateContent(stepMapping[state].message);
        break;
      case 7:
        navigateQuery(stepMapping[state].query);
        setStateContent(stepMapping[state].message);
        break;
      case 8:
        navigateQuery(stepMapping[state].query);
        setStateContent(stepMapping[state].message);
        break;
      default:
        navigate("/welcome");
        setState((prev) => 1);
        setStateContent("Chào bạn! Tớ là cú Duo!");
        return;
    }
  };

  const increaseState = () => {
    console.log(state);
    ChangeOwlMessage(state);
    setState((prevState) => prevState + 1);
  };

  const decreaseState = () => {
    console.log(state);
    setState((prevState) => prevState - 1);
    if (state > 4) {
      ChangeOwlMessage(state == 9 ? state - 2 : state);
    } else {
      navigate("/welcome");
      setStateContent("Chào bạn! Tớ là cú Duo!");
      setState((prev) => 2);
    }
  };

  const arrowStyles = css`
    position: absolute;
    bottom: -29px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 0px solid transparent;
    border-right: 20px solid transparent;
    border-top: 20px solid #37464f;

    &::before {
      content: "";
      position: absolute;
      bottom: 6.5px;
      left: 2.5px;
      border-left: 0px solid transparent;
      border-right: 15px solid transparent;
      border-top: 15px solid #131f23;
    }
  `;

  return (
    <div className="bg-[#131F23]" style={{ width: "100vw", height: "100vh" }}>
      <div className={`w-full h-5/6`}>
        <div
          className={`w-full ${
            state > 3 ? "h-1/4" : "h-full "
          } gap-8 flex flex-col justify-center items-center`}
        >
          {state > 3 && (
            <div className="w-full h-full flex flex-row gap-4 justify-center items-center">
              <div className="text-white flex justify-center items-center translate-y-6">
                <button className="cursor-pointer" onClick={decreaseState}>
                  <img
                    src="https://d35aaqx5ub95lt.cloudfront.net/images/a440799373d131cb4a2bbfe8add8a10f.svg"
                    alt="Arrow back"
                  />
                </button>
              </div>
              <div className="w-8/12 h-[13px] bg-[#37464F] rounded-2xl translate-y-6">
                <div
                  className={`absolute top-0 left-0 transition-all duration-300 w-${
                    state - 3
                  }/6 h-full bg-[#93D333] rounded-2xl`}
                ></div>
              </div>
            </div>
          )}
          <div
            className={`w-8/12 h-full flex ${
              state > 3
                ? "flex-row-reverse justify-end"
                : "flex-col justify-center"
            } gap-8 items-center`}
          >
            <div className="relative">
              <span
                className="text-white rounded-xl transition-all duration-300"
                style={{ border: "2px solid #37464F", padding: "10px" }}
              >
                {stateContent}
              </span>
              <div css={arrowStyles}></div>
            </div>
            <img
              src="https://avatars.githubusercontent.com/u/908687?s=200&v=4"
              alt="Owl image"
              width={`${state > 3 ? "100" : ""}`}
            />
          </div>
        </div>
        {state > 3 && (
          <div className="w-full h-3/4 ">
            {state == 4 && <HdyhauPage />}
            {state == 5 && <ReasonPage />}
            {state == 6 && <ProficiencyPage />}
            {state == 7 && <CourseOverviewPage />}
            {state == 8 && <DailyGoalPage />}
            {state == 9 && <ChoosePathPage />}
          </div>
        )}
      </div>

      <div
        className="relative w-full h-1/6 flex items-center justify-end"
        style={{ borderTop: "2px solid #37464F", padding: "0px 40px" }}
      >
        <button
          className={`bg-[#93D333] font-bold rounded-xl flex justify-center items-center border-b-[2px] border-[#79B933] cursor-pointer  ${
            isActive ? "bg-[#A2E838] border-none translate-y-[2px]" : ""
          }`}
          style={{
            padding: "10px 30px",
            transition: "transform 0.3s",
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onClick={increaseState}
        >
          TIẾP TỤC
        </button>
      </div>
    </div>
  );
};
export default WelcomePage;
