import AppRoutes from "./routes/AppRoutes";
import { CourseProvider } from "./context/CourseContext";
import { AdminProvider } from "./context/AdminContext";

const App: React.FC = () => {
  return (
    <AdminProvider>
      <CourseProvider>
        <AppRoutes />;
      </CourseProvider>
    </AdminProvider>
  );
};
export default App;
