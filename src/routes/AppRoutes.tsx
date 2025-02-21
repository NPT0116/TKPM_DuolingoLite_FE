import { Route, Routes } from "react-router-dom";
import { PATH } from "../configs/path";
import RegisterPage from "../views/pages/AuthPage/RegisterPage/RegisterPage";
import NotFoundPage from "../views/pages/NotFoundPage/NotFoundPage";
import NavigationLayout from "../views/layouts/NavigationLayout";
import GuestPage from "../views/pages/GuestPage/GuestPage";
import WelcomePage from "../views/pages/WelcomePages/WelcomePage";
import LeaderBoardPage from "../views/pages/LeaderBoardPage/LeaderBoardPage";
import LearnPage from "../views/pages/LearnPage/LearnPage";
import LoginPage from "../views/pages/AuthPage/LoginPage/LoginPage";
import ProfilePage from "../views/pages/ProfilePage/ProfilePage";

const AppRoutes: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path={PATH.LOGIN.index} element={<LoginPage />} />
        <Route path={PATH.REGISTER.index} element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/welcome" element={<WelcomePage />} />

        {/* For component that have layout */}
        <Route element={<NavigationLayout />}>
          <Route path={PATH.USER.index} element={<GuestPage />} />
          <Route
            path={PATH.USER.outlets.leaderBoard}
            element={<LeaderBoardPage />}
          />
          <Route path={PATH.USER.outlets.profile} element={<ProfilePage />} />
          <Route path={PATH.USER.outlets.learn} element={<LearnPage />} />
        </Route>
      </Routes>
    </div>
  );
};
export default AppRoutes;
