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
import MatchingLessonPage from "../views/pages/LearnPage/MatchingWord/MatchingLessonPage";
import PronunciationPage from "../views/pages/LearnPage/Pronunciation/PronunciationPage";
import BuildSentencePage from "../views/pages/LearnPage/BuildSentencePage/BuildSentencePage";
import LessonLayout from "../views/layouts/LessonLayout";

const AppRoutes: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path={PATH.LOGIN.index} element={<LoginPage />} />
        <Route path={PATH.REGISTER.index} element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        {/* Route for lesson */}
        <Route path="/lesson" element={<LessonLayout />}>
          <Route path="matching" element={<MatchingLessonPage />} />
          <Route path="pronunciation" element={<PronunciationPage />} />
          <Route path="build-sentence" element={<BuildSentencePage />} />
        </Route>

        {/* For component that have layout */}
        <Route element={<NavigationLayout />}>
          <Route path={PATH.USER.index} element={<GuestPage />} />
          <Route path={PATH.USER.outlets.home} element={<HomePage />} />
          <Route path={PATH.USER.outlets.profile} element={<ProfilePage />} />
        </Route>
      </Routes>
    </div>
  );
};
export default AppRoutes;
