/** @jsxImportSource @emotion/react */
import { Outlet } from "react-router-dom";
import NavigationButton from "../components/Button/NavigationButton";
import { useNavigate } from "react-router-dom";
import RightSideBar from "../components/SideBar/RightSideBar";

const NavigationLayout: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <div
      className="flex flex-row text-white bg-primary relative overflow-auto w-full"
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#131F23",
      }}
    >
      {/* Left side bar */}
      <div
        className="h-full w-1/5 sticky top-0"
        style={{
          borderRight: "2px solid #37464F",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        <div className="w-full relative">
          <img
            src="https://d35aaqx5ub95lt.cloudfront.net/vendor/70a4be81077a8037698067f583816ff9.svg"
            style={{
              padding: "32px 0 30px 16px",
            }}
            alt="Logo of Duolingo"
            className="w-[200px] xl:w-[65%]"
          />
        </div>

        <div className="w-full relative flex flex-col gap-2">
          <NavigationButton
            isAvatar={false}
            iconLink="https://d35aaqx5ub95lt.cloudfront.net/vendor/784035717e2ff1d448c0f6cc4efc89fb.svg"
            content="HỌC"
            path="/home"
          />
          <NavigationButton
            isAvatar={false}
            iconLink="https://d35aaqx5ub95lt.cloudfront.net/vendor/5187f6694476a769d4a4e28149867e3e.svg"
            content="LUYỆN TẬP"
            path="/learn"
          />
          <NavigationButton
            isAvatar={false}
            iconLink="https://d35aaqx5ub95lt.cloudfront.net/vendor/ca9178510134b4b0893dbac30b6670aa.svg"
            content="BẢNG XẾP HẠNG"
            path="/leaderboard"
          />
          <NavigationButton
            isAvatar={true}
            iconLink="https://simg-ssl.duolingo.com/ssr-avatars/1288943247/SSR-Dnq9imvO9g/medium"
            content="HỒ SƠ"
            path="/profile"
          />
          <div className="rounded-xl">
            <div
              onClick={handleLogout}
              className="flex font-bold justify-center xl:justify-start  rounded-xl hover:bg-[#37464F] focus:outline-3 focus:outline-[#50D3FF] focus:bg-[#37464F]"
              style={{
                padding: "8px 4px 8px 4px",
              }}
            >
              <span className="flex flex-row justify-center">
                <div>
                  <img
                    src="https://images.freeimages.com/clg/images/26/261833/white-clarity-shutdown-icon_f?h=350"
                    alt="Logo navigation button"
                    width="32px"
                    style={{
                      margin: "0px 20px 0px 10px",
                    }}
                  />
                </div>
                <span className="hidden xl:flex justify-center items-center">
                  ĐĂNG XUẤT
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="w-full min-w-[812px] flex justify-center gap-[40px] h-full relative overflow-y-auto flex-nowrap"
        style={{
          padding: "0px 24px 24px 24px",
        }}
      >
        <Outlet />

        <RightSideBar />
      </div>
    </div>
  );
};
export default NavigationLayout;
