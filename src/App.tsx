import { Route, Routes } from "react-router-dom";
import LoginPage from "./views/pages/LoginPage";
import RegisterPage from "./views/pages/RegisterPage";
import GuestPage from "./views/pages/GuestPage";
import { PATH } from "./routes/routes";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path={PATH.GUEST.index} element={<GuestPage />} />
      <Route path={PATH.LOGIN.index} element={<LoginPage />} />
      <Route path={PATH.REGISTER.index} element={<RegisterPage />} />
    </Routes>
  );
};
export default App;
