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
import BuyPremiumPage from "../views/pages/BuyPremiumPage/BuyPremiumPage";
import ReviewLayout from "../views/layouts/ReviewLayout";
import ReviewPage from "../views/pages/ReviewPage/ReviewPage";
// Admin
import AdminLayout from "../views/layouts/AdminLayout";
import AdminCourseManagementPage from "../views/pages/AdminPage/management/AdminCourseManagementPage";
import AdminAddQuestionPage from "../views/pages/AdminPage/AdminAddQuestionPage";
import { QuestionType } from "../enums/questionType";

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
        {/* For component that have layout, only access when have authToken */}
        {/* <Route path="/courses" element={<ChooseCoursePage />} /> */}
        <Route element={<NavigationLayout />}>
          <Route path="/courses" element={<CourseManagementPage />} />
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
          <Route
            path="/review"
            element={
              <ProtectedRoute>
                <ReviewPage />
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
        <Route
          path="/review-lesson"
          element={
            <ProtectedRoute>
              <ReviewLayout />
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
        <Route path={PATH.ADMIN.index} element={<AdminLayout />}>
          <Route path={PATH.ADMIN.lesson.base}>
            <Route
              path={PATH.ADMIN.lesson.multipleChoice}
              element={
                <AdminAddQuestionPage
                  questionType={QuestionType.MultipleChoice}
                />
              }
            />
            <Route
              path={PATH.ADMIN.lesson.matching}
              element={
                <AdminAddQuestionPage questionType={QuestionType.Matching} />
              }
            />
            <Route
              path={PATH.ADMIN.lesson.buildSentence}
              element={
                <AdminAddQuestionPage
                  questionType={QuestionType.BuildSentence}
                />
              }
            />
            <Route
              path={PATH.ADMIN.lesson.pronunciation}
              element={
                <AdminAddQuestionPage
                  questionType={QuestionType.Pronunciation}
                />
              }
            />
          </Route>
          <Route
            path={PATH.ADMIN.lesson.management}
            element={<AdminCourseManagementPage />}
          />
        </Route>
      </Routes>
    </div>
  );
};
export default AppRoutes;
