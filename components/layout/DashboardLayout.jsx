import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="md:flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="p-4 flex-1 overflow-y-auto">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
