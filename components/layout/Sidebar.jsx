import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Home,
  Users,
  LogOut,
  Menu,
  X,
  LayoutGrid,
  Building2,
  GraduationCap,
  ChevronDown,
  BookOpen,
  Calendar,
  CalendarDays,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const panelTitle =
    user?.role === "admin"
      ? "Admin Panel"
      : user?.role === "dean"
        ? "Dean Panel"
        : "Chairman Panel";

  const toggleMenu = (menu) => {
    setExpandedMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const dashboardRoutes = {
    admin: [
      { name: "Dashboard", icon: <Home size={18} />, path: "/dashboard/superadmin" },
      {
        name: "Deans",
        icon: <Users size={18} />,
        submenu: [
          { name: "Create Dean", path: "/dashboard/superadmin/create-dean" },
          { name: "Manage Deans", path: "/dashboard/superadmin/manage-deans" },
        ]
      },
      {
        name: "Faculty",
        icon: <GraduationCap size={18} />,
        submenu: [
          { name: "Create Faculty", path: "/dashboard/superadmin/create-faculty" },
          { name: "Manage Faculties", path: "/dashboard/superadmin/manage-faculties" }
        ]
      },
    ],
    dean: [
      { name: "Dashboard", icon: <Home size={18} />, path: "/dashboard/dean" },
      {
        name: "Chairmans",
        icon: <Users size={18} />,
        submenu: [
          { name: "Create Chairman", path: "/dashboard/dean/create-chairman" },
          { name: "Manage Chairmans", path: "/dashboard/dean/manage-chairmans" }
        ]
      },
      {
        name: "Departments",
        icon: <Building2 size={18} />,
        submenu: [
          { name: "Create Department", path: "/dashboard/dean/create-department" },
          { name: "Manage Department", path: "/dashboard/dean/manage-departments" },
          { name: "Departments List", path: "/dashboard/dean/departments" },
        ]
      },
      {
        name: "TimeTables",
        icon: <CalendarDays size={18} />,
        path: "/dashboard/dean/manage-timetables"
      }
    ],
    chairman: [
      { name: "Dashboard", icon: <Home size={18} />, path: "/dashboard/chairman" },
      {
        name: "Teachers",
        icon: <Users size={18} />,
        submenu: [
          { name: "Create Teacher", path: "/dashboard/chairman/create-teacher" },
          { name: "Manage Teachers", path: "/dashboard/chairman/manage-teachers" },
        ],
      },
      {
        name: "Sections & Batches",
        icon: <LayoutGrid size={18} />,
        submenu: [
          { name: "Create Section", path: "/dashboard/chairman/create-section" },
          { name: "Manage Section", path: "/dashboard/chairman/manage-sections" },
          { name: "Create Batch", path: "/dashboard/chairman/create-batch" },
          { name: "Manage Batch", path: "/dashboard/chairman/manage-batches" },
        ],
      },
      {
        name: "TimeTable",
        icon: <Calendar size={18} />,
        submenu: [
          { name: "Create TimeTable", path: "/dashboard/chairman/create-timetable" },
          { name: "Manage TimeTable", path: "/dashboard/chairman/manage-timetables" },
          { name: "Manage Slots", path: "/dashboard/chairman/manage-timetablesSlots" },
        ],
      },
      {
        name: "Semester",
        icon: <Calendar size={18} />,
        submenu: [
          { name: "Create Semester", path: "/dashboard/chairman/create-semester" },
          { name: "Manage Semesters", path: "/dashboard/chairman/manage-semesters" },
        ],
      },
      {
        name: "Courses",
        icon: <BookOpen size={18} />,
        submenu: [
          { name: "Create Course", path: "/dashboard/chairman/create-course" },
          { name: "Manage Courses", path: "/dashboard/chairman/manage-courses" },
        ],
      },
      {
        name: "View Teacher Slots",
        icon: <BookOpen size={18} />,
        path: "/dashboard/chairman/view-teacherSlots"
      }
    ],
  };

  const links = dashboardRoutes[user?.role] || [];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  // Shared inner content loop used by desktop and mobile configurations
  const renderNavLinks = (closeMobileMenu = () => { }) => (
    <ul className="flex flex-col gap-2.5">
      {links.map((link, idx) => {
        const isMenuExpanded = !!expandedMenus[link.name];

        return link.submenu ? (
          <li key={idx} className="block">
            <button
              onClick={() => toggleMenu(link.name)}
              className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-all text-sm font-medium focus:outline-none ${isMenuExpanded ? "bg-slate-800/50 text-white" : ""
                }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-slate-400 group-hover:text-white">{link.icon}</span>
                <span>{link.name}</span>
              </div>
              <ChevronDown
                size={16}
                className={`transform transition-transform duration-200 text-slate-400 ${isMenuExpanded ? "rotate-180 text-white" : ""}`}
              />
            </button>

            {/* Smooth height accordion drawer */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out pl-4 ${isMenuExpanded ? "max-h-[300px] opacity-100 mt-1" : "max-h-0 opacity-0 pointer-events-none"
                }`}
            >
              <ul className="pl-3 border-l border-slate-700/60 flex flex-col gap-1 py-1">
                {link.submenu.map((sub, i) => {
                  const isSubActive = location.pathname === sub.path;
                  return (
                    <li key={i}>
                      <Link
                        to={sub.path}
                        onClick={closeMobileMenu}
                        className={`block py-2 px-3 text-sm rounded-md transition-all ${isSubActive
                          ? "text-blue-400 bg-blue-500/10 font-medium"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                          }`}
                      >
                        {sub.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        ) : (
          <li key={idx}>
            <Link
              to={link.path}
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${location.pathname === link.path
                ? "bg-blue-600 text-white font-semibold shadow-md shadow-blue-900/20"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          </li>
        );
      })}

      <li className="mt-4 pt-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all text-sm font-medium focus:outline-none"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </li>
    </ul>
  );

  return (
    <>
      {/* Mobile Sticky Mini Header */}
      <div className="md:hidden flex items-center justify-between bg-slate-900 text-white px-4 py-3 sticky top-0 z-40 border-b border-slate-800">
        <h2 className="text-md font-bold tracking-wide">{panelTitle}</h2>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white focus:outline-none"
          aria-label="Open sidebar menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Desktop Persistent Sidebar Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:h-screen md:sticky md:top-0 bg-slate-900 text-white p-5 border-r border-slate-800 shrink-0 z-40">
        <div className="mb-8 px-2">
          <h2 className="text-lg font-bold tracking-wider text-slate-200">{panelTitle}</h2>
          <p className="text-[11px] text-slate-500 font-medium tracking-tight mt-0.5 uppercase">Management Portal</p>
        </div>
        <nav className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
          {renderNavLinks()}
        </nav>
      </aside>

      {/* Mobile Drawer Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-50 md:hidden transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Side Slide-In Panel */}
      <aside
        className={`fixed top-0 left-0 w-72 h-full bg-slate-900 p-5 z-50 flex flex-col md:hidden transform transition-transform duration-300 ease-in-out shadow-2xl ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between pb-5 mb-5 border-b border-slate-800">
          <div>
            <h2 className="text-md font-bold text-slate-200">{panelTitle}</h2>
            <p className="text-[10px] text-slate-500 uppercase font-semibold">Navigation</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto pr-1">
          {renderNavLinks(() => setIsOpen(false))}
        </nav>
      </aside>
    </>
  );
}