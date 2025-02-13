import { Route, Routes } from "react-router-dom";
import { PATH } from "../configs/path";
import LoginPage from "../views/pages/LoginPage";
import RegisterPage from "../views/pages/RegisterPage";
import NotFoundPage from "../views/pages/NotFoundPage";
import NavigationLayout from "../views/layouts/NavigationLayout";
import GuestPage from "../views/pages/GuestPage";

const AppRoutes: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path={PATH.LOGIN.index} element={<LoginPage />} />
        <Route path={PATH.REGISTER.index} element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* For component that have layout */}
        <Route element={<NavigationLayout />}>
          <Route path={PATH.GUEST.index} element={<GuestPage />} />
        </Route>
      </Routes>
    </div>
  );
};
export default AppRoutes;
