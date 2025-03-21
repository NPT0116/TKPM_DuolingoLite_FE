import { Route, Routes } from "react-router-dom";
import { PATH } from "../configs/path";
import { Navigate } from "react-router-dom";
import RegisterPage from "../views/pages/AuthPage/RegisterPage/RegisterPage";
import NotFoundPage from "../views/pages/NotFoundPage/NotFoundPage";
import NavigationLayout from "../views/layouts/NavigationLayout";
import GuestPage from "../views/pages/GuestPage/GuestPage";
import WelcomePage from "../views/pages/WelcomePages/WelcomePage";
import HomePage from "../views/pages/HomePage/HomePage";
import LoginPage from "../views/pages/AuthPage/LoginPage/LoginPage";
import ProfilePage from "../views/pages/ProfilePage/ProfilePage";
import LeaderboardPage from "../views/pages/LeaderboardPage/LeaderboardPage";
import { JSX } from "react";
import LessonLayout from "../views/layouts/LessonLayout";
import ChooseCoursePage from "../views/pages/ChooseCoursePage/ChooseCoursePage";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/welcome" element={<WelcomePage />} />
        {/* Authentication */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Choose Course for user after login*/}
        <Route path="/courses" element={<ChooseCoursePage />} />
        {/* For component that have layout, only access when have authToken */}
        <Route element={<NavigationLayout />}>
          <Route path={PATH.USER.index} element={<GuestPage />} />
          <Route path={PATH.USER.outlets.home} element={<HomePage />} />
          <Route path={PATH.USER.outlets.profile} element={<ProfilePage />} />
          <Route
            path={PATH.USER.outlets.leaderboard}
            element={<LeaderboardPage />}
          ></Route>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="/lesson"
          element={
            <ProtectedRoute>
              <LessonLayout />
            </ProtectedRoute>
          }
        />
        {/* Payment Page */}
        <Route
          path="/buy-premium"
          element={
            <ProtectedRoute>
              <BuyPremiumPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};
export default AppRoutes;
