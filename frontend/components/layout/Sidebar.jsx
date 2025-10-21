import React from "react";
import { Link } from "react-router-dom";
import { Home, Users, LogOut } from "lucide-react";

export default function Sidebar() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  // console.log(user);
  return (
    <aside className="w-64 bg-slate-800 text-white p-5 flex flex-col">
      <h2 className="text-xl font-semibold mb-10 text-center">{user?.role === 'superadmin' ? "Admin Panel" : "Chairman Panel"}</h2>

      <nav className="flex-1 space-y-4">
        <ul className="flex flex-col gap-4">
          <Link to={user?.role === 'superadmin' ? "/dashboard/superadmin" : "/dashboard/ChairmanDashboard"}
            className="flex items-center gap-2 hover:text-yellow-400 ">
            <Home size={18} /> Dashboard
          </Link>

          {user?.role === 'superadmin' && (
            <Link to="/dashboard/deptDashboard" className="flex items-center gap-2 hover:text-yellow-400">
              <Users size={18} /> Departments
            </Link>
          )}

          {user?.role === 'superadmin' && (
            <Link to="/dashboard/superadmin/create-chairman" className="flex items-center gap-2 hover:text-yellow-400">
              <Users size={18} /> Create Chairman
            </Link>
          )}
          <li>
            {user?.role === 'chairman' && (
              <Link to="/dashboard/chairman/create-teacher" className="flex items-center gap-2 hover:text-yellow-400">
                <Users size={18} /> Create Teacher
              </Link>
            )}
          </li>
        </ul>
      </nav>

      <button className="flex items-center gap-2 hover:text-red-400 mt-auto"
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}>
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
}
