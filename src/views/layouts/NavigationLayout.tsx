import { Link, Outlet } from "react-router-dom";
import NavigationButton from "../components/Button/NavigationButton";

const NavigationLayout: React.FC = () => {
  return (
    <div
      className="flex flex-row text-white bg-primary"
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#131F23",
      }}
    >
      <div
        className="h-full w-1/5"
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
              width: "65%",
              padding: "32px 0 30px 16px",
            }}
            alt="Logo of Duolingo"
          />
        </div>

        <div className="w-full h-full relative flex flex-col gap-2">
          <NavigationButton
            isAvatar={false}
            iconLink="https://d35aaqx5ub95lt.cloudfront.net/vendor/784035717e2ff1d448c0f6cc4efc89fb.svg"
            content="HỌC"
            path="/learn"
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

          <NavigationButton
            isAvatar={false}
            iconLink="https://simg-ssl.duolingo.com/ssr-avatars/1288943247/SSR-Dnq9imvO9g/medium"
            content="Matching"
            path="/lesson/matching"
          />
          <NavigationButton
            isAvatar={false}
            iconLink="https://simg-ssl.duolingo.com/ssr-avatars/1288943247/SSR-Dnq9imvO9g/medium"
            content="Pronunciation"
            path="/lesson/pronunciation"
          />
          <NavigationButton
            isAvatar={false}
            iconLink="https://simg-ssl.duolingo.com/ssr-avatars/1288943247/SSR-Dnq9imvO9g/medium"
            content="Multiple Choice"
            path="/lesson/multiple-choice"
          />
          <NavigationButton
            isAvatar={false}
            iconLink="https://simg-ssl.duolingo.com/ssr-avatars/1288943247/SSR-Dnq9imvO9g/medium"
            content="Build Sentence"
            path="/lesson/build-sentence"
          />
        </div>
      </div>

      <div className="h-full w-4/5">
        <Outlet />
      </div>
    </div>
  );
};
export default NavigationLayout;
