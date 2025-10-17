import React from "react";
import { Link } from "react-router-dom";
import { Home, Users, LogOut } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-800 text-white p-5 flex flex-col">
      <h2 className="text-xl font-semibold mb-10 text-center">Admin Panel</h2>

      <nav className="flex-1 space-y-4">
        <Link to="/dashboard/superadmin" className="flex items-center gap-2 hover:text-yellow-400">
          <Home size={18} /> Dashboard
        </Link>

        <Link to="/layout/DepartmentCard" className="flex items-center gap-2 hover:text-yellow-400">
          <Users size={18} /> Departments
        </Link>

        <Link to="/dashboard/chairmen" className="flex items-center gap-2 hover:text-yellow-400">
          <Users size={18} /> Chairmen
        </Link>
      </nav>

      <button className="flex items-center gap-2 hover:text-red-400 mt-auto">
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
}
