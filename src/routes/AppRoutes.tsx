import { Route, Routes } from "react-router-dom";
import { PATH } from "../configs/path";
import RegisterPage from "../views/pages/AuthPage/RegisterPage/RegisterPage";
import NotFoundPage from "../views/pages/NotFoundPage/NotFoundPage";
import NavigationLayout from "../views/layouts/NavigationLayout";
import GuestPage from "../views/pages/GuestPage/GuestPage";
import WelcomePage from "../views/pages/WelcomePages/WelcomePage";
import HomePage from "../views/pages/HomePage/HomePage";
import LoginPage from "../views/pages/AuthPage/LoginPage/LoginPage";
import ProfilePage from "../views/pages/ProfilePage/ProfilePage";
import LessonLayout from "../views/layouts/LessonLayout";
import LeaderboardPage from "../views/pages/LeaderboardPage/LeaderboardPage";

const AppRoutes: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path={PATH.LOGIN.index} element={<LoginPage />} />
        <Route path={PATH.REGISTER.index} element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        {/* Route for lesson */}
        <Route path="/lesson" element={<LessonLayout />}></Route>

        {/* For component that have layout */}
        <Route element={<NavigationLayout />}>
          <Route path={PATH.USER.index} element={<GuestPage />} />
          <Route path={PATH.USER.outlets.home} element={<HomePage />} />
          <Route path={PATH.USER.outlets.profile} element={<ProfilePage />} />
          <Route
            path={PATH.USER.outlets.leaderboard}
            element={<LeaderboardPage />}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
};
export default AppRoutes;
