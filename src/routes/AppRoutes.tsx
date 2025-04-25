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
import CourseManagementPage from "../views/pages/ChooseCoursePage/CourseManagementPage";
import { withRoleProtection } from "../hooks/withRoleProtection";
import { UserRole } from "../enums/userRole";
import RoleProtectedRoute from "./RoleProtectedRoute";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const AdminLayoutProtected = withRoleProtection(AdminLayout, [UserRole.ADMIN]);

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/login" />;
};

const getRoleFromStorage = (): string | null => {
  const role = localStorage.getItem("role");
  return role || null;
};

const AppRoutes: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/"
          element={(() => {
            const role = getRoleFromStorage();
            if (role === UserRole.ADMIN)
              return <Navigate to="/admin" replace />;
            return <Navigate to="/home" replace />;
          })()}
        />
        <Route path="/welcome" element={<WelcomePage />} />
        {/* Authentication */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Choose Course for user after login*/}
        {/* For component that have layout, only access when have authToken */}
        {/* <Route path="/courses" element={<ChooseCoursePage />} /> */}
        <Route element={<NavigationLayout />}>
          <Route
            path="/courses"
            element={
              <RoleProtectedRoute allowedRoles={[UserRole.USER]}>
                <CourseManagementPage />
              </RoleProtectedRoute>
            }
          />
          <Route
            path={PATH.USER.index}
            element={
              <RoleProtectedRoute allowedRoles={[UserRole.USER]}>
                <CourseManagementPage />
              </RoleProtectedRoute>
            }
          />
          <Route
            path={PATH.USER.outlets.home}
            element={
              <RoleProtectedRoute allowedRoles={[UserRole.USER]}>
                <HomePage />
              </RoleProtectedRoute>
            }
          />
          <Route
            path={PATH.USER.outlets.profile}
            element={
              <RoleProtectedRoute allowedRoles={[UserRole.USER]}>
                <ProfilePage />
              </RoleProtectedRoute>
            }
          />
          <Route
            path={PATH.USER.outlets.leaderboard}
            element={
              <RoleProtectedRoute allowedRoles={[UserRole.USER]}>
                <LeaderboardPage />
              </RoleProtectedRoute>
            }
          ></Route>
          <Route
            path="/home"
            element={
              <RoleProtectedRoute allowedRoles={[UserRole.USER]}>
                <HomePage />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <RoleProtectedRoute allowedRoles={[UserRole.USER]}>
                <ProfilePage />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/review"
            element={
              <RoleProtectedRoute allowedRoles={[UserRole.USER]}>
                <ReviewPage />
              </RoleProtectedRoute>
            }
          />
        </Route>
        <Route
          path="/lesson"
          element={
            <RoleProtectedRoute allowedRoles={[UserRole.USER]}>
              <LessonLayout />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/review-lesson"
          element={
            <RoleProtectedRoute allowedRoles={[UserRole.USER]}>
              <ReviewLayout />
            </RoleProtectedRoute>
          }
        />
        {/* Payment Page */}
        <Route
          path="/buy-premium"
          element={
            <RoleProtectedRoute allowedRoles={[UserRole.USER]}>
              <BuyPremiumPage />
            </RoleProtectedRoute>
          }
        />
        <Route path={PATH.ADMIN.index} element={<AdminLayoutProtected />}>
          <Route path={PATH.ADMIN.lesson.base}>
            <Route
              path={PATH.ADMIN.lesson.multipleChoice}
              element={
                <RoleProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                  <AdminAddQuestionPage
                    questionType={QuestionType.MultipleChoice}
                  />
                </RoleProtectedRoute>
              }
            />
            <Route
              path={PATH.ADMIN.lesson.matching}
              element={
                <RoleProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                  <AdminAddQuestionPage questionType={QuestionType.Matching} />
                </RoleProtectedRoute>
              }
            />
            <Route
              path={PATH.ADMIN.lesson.buildSentence}
              element={
                <RoleProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                  <AdminAddQuestionPage
                    questionType={QuestionType.BuildSentence}
                  />
                </RoleProtectedRoute>
              }
            />
            <Route
              path={PATH.ADMIN.lesson.pronunciation}
              element={
                <RoleProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                  <AdminAddQuestionPage
                    questionType={QuestionType.Pronunciation}
                  />
                </RoleProtectedRoute>
              }
            />
          </Route>
          <Route
            path={PATH.ADMIN.lesson.management}
            element={
              <RoleProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                <AdminCourseManagementPage />
              </RoleProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};
export default AppRoutes;
