import AppRoutes from "./routes/AppRoutes";
import { CourseProvider } from "./context/CourseContext";

const App: React.FC = () => {
  return (
    <CourseProvider>
      <AppRoutes />;
    </CourseProvider>
  );
};
export default App;
