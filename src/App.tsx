// import Assignment from "./Components/Assignment";

import { Outlet, useLocation } from "react-router";
import Sidebar from "./Components/Sidebar";

const App = () => {
  const location = useLocation();
  const showSidebar = !location.pathname.startsWith("/asset-details");
  return (
    <div className="flex ">
      {showSidebar && <Sidebar />}

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
