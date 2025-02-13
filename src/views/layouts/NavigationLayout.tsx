import { Outlet } from "react-router-dom";

const NavigationLayout: React.FC = () => {
  return (
    <div>
      Navigation Layout
      <div>
        <Outlet />
      </div>
    </div>
  );
};
export default NavigationLayout;
