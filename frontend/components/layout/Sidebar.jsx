// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Home, Users, LogOut, UserCog, Menu, LayoutGrid, Building2, GraduationCap, ChevronDown, ChevronUp, BookOpen, Calendar } from "lucide-react";
// import { useSelector } from "react-redux";


// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isTeacherOpen, setIsTeacherOpen] = useState(false);
//   const [isBatchSectionOpen, setIsBatchSectionOpen] = useState(false);
//   const [isTimeTableOpen, setIsTimeTableOpen] = useState(false);
//   const [isCourseOpen, setIsCourseOpen] = useState(false);
//   const [isSemesterOpen, setIsSemesterOpen] = useState(false);

//   const user = useSelector((state) => state.auth.user);

//   // console.log(user);
//   let panelTitle = "";
//   if (user?.role === 'admin') {
//     panelTitle = "Admin Panel"
//   } else if (user?.role === "dean") {
//     panelTitle = "Dean Panel"
//   } else if (user?.role === "chairman") {
//     panelTitle = "Chairman Panel"
//   }

//   const dashboardRoutes = {
//     admin: "/dashboard/superadmin",
//     chairman: "/dashboard/chairman",
//     dean: "/dashboard/dean",
//   };

//   return (
//     <aside className="flex md:block md:w-64 bg-slate-800 text-white p-2 md:p-5">
//       <h2 className="text-xl font-semibold mb-10 text-center">{panelTitle}</h2>
//       <nav className="flex-1 space-y-4">
//         <button
//           className="md:hidden text-2xl"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <Menu size={22} />
//         </button>

//         <ul className=" flex md:flex-col gap-4">
//           <li>
//             <Link to={dashboardRoutes[user?.role] || "/"}
//               className="flex items-center gap-2 hover:text-yellow-400 ">
//               <Home size={18} /> Dashboard
//             </Link>
//           </li>
//           {user?.role === 'admin' && (
//             <li>
//               <Link to="/dashboard/facultyDashboard" className="flex items-center gap-2 hover:text-yellow-400">
//                 <GraduationCap size={18} /> Faculties
//               </Link>
//             </li>
//           )}
//           {user?.role === 'admin' && (
//             <li>
//               <Link to="/dashboard/superadmin/create-dean" className="flex items-center gap-2 hover:text-yellow-400">
//                 <Users size={18} /> Create Dean
//               </Link>
//             </li>
//           )}
//           {user?.role === 'admin' && (
//             <li>
//               <Link to="/dashboard/superadmin/create-faculty" className="flex items-center gap-2 hover:text-yellow-400">
//                 <UserCog size={24} />Create Faculty
//               </Link>
//             </li>
//           )}
//           {user?.role === 'admin' && (
//             <li>
//               <Link to="/dashboard/superadmin/manage-deans" className="flex items-center gap-2 hover:text-yellow-400">
//                 <UserCog size={24} />Manage Deans
//               </Link>
//             </li>
//           )}
//           {/* //////////dean faculty stuff is here //////////////////////////////////////// */}
//           {/* for faculty and assign dean we need one more component */}
//           {user?.role === 'dean' && (
//             <li>
//               <Link to="/dashboard/dean/create-chairman" className="flex items-center gap-2 hover:text-yellow-400">
//                 <Users size={18} /> Create Chairman
//               </Link>
//             </li>
//           )}
//           {user?.role === 'dean' && (
//             <li>
//               <Link to="/dashboard/dean/departments" className="flex items-center gap-2 hover:text-yellow-400">
//                 <Building2 size={24} />Departments
//               </Link>
//             </li>
//           )}
//           {user?.role === 'dean' && (
//             <li>
//               <Link to="/dashboard/dean/create-department" className="flex items-center gap-2 hover:text-yellow-400">
//                 <Building2 size={24} />Create Department
//               </Link>
//             </li>
//           )}

//           {/* chairman sidebar  */}
//           {user?.role === 'chairman' && (
//             <>
//               <li>
//                 <button
//                   onClick={() => setIsTeacherOpen(!isTeacherOpen)}
//                   className="flex items-center justify-between w-full gap-2 hover:text-yellow-400 cursor-pointer"
//                 >
//                   <div className="flex items-center gap-2">
//                     <Users size={18} />
//                     <span>Teachers</span>
//                   </div>
//                   {isTeacherOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                 </button>

//                 {isTeacherOpen && (
//                   <ul className="pl-6 mt-2 space-y-2 border-l border-gray-600 ">
//                     <li>
//                       <Link to="/dashboard/chairman/create-teacher" className="hover:text-yellow-400 text-sm">
//                         Create Teacher
//                       </Link>
//                     </li>
//                     <li>
//                       <Link to="/dashboard/chairman/manage-teachers" className="hover:text-yellow-400 text-sm">
//                         Manage Teachers
//                       </Link>
//                     </li>
//                   </ul>
//                 )}
//               </li>
//               <li>
//                 <button
//                   onClick={() => setIsBatchSectionOpen(!isBatchSectionOpen)}
//                   className="flex items-center justify-between w-full gap-2 hover:text-yellow-400 cursor-pointer"
//                 >
//                   <div className="flex items-center gap-2">
//                     <LayoutGrid size={18} />
//                     <span>Sections & Batches</span>
//                   </div>
//                   {isBatchSectionOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                 </button>

//                 {isBatchSectionOpen && (
//                   <ul className="pl-6 mt-2 space-y-2 border-l border-gray-600">
//                     <li>
//                       <Link to="/dashboard/chairman/create-section" className="hover:text-yellow-400 text-sm">
//                         Create Section
//                       </Link>
//                     </li>
//                     <li>
//                       <Link to="/dashboard/chairman/manage-sections" className="hover:text-yellow-400 text-sm">
//                         Manage Section
//                       </Link>
//                     </li>
//                     <li>
//                       <Link to="/dashboard/chairman/create-batch" className="hover:text-yellow-400 text-sm">
//                         Create Batch
//                       </Link>
//                     </li>
//                     <li>
//                       <Link to="/dashboard/chairman/manage-batches" className="hover:text-yellow-400 text-sm">
//                         Manage Batch
//                       </Link>
//                     </li>
//                   </ul>
//                 )}
//               </li>
//               <li>
//                 <button
//                   onClick={() => setIsTimeTableOpen(!isTimeTableOpen)}
//                   className="flex items-center justify-between w-full gap-2 hover:text-yellow-400 cursor-pointer"
//                 >
//                   <div className="flex items-center gap-2">
//                     <Calendar size={18} />
//                     <span>TimeTable</span>
//                   </div>
//                   {isTimeTableOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                 </button>

//                 {isTimeTableOpen && (
//                   <ul className="pl-6 mt-2 space-y-2 border-l border-gray-600">
//                     <li>
//                       <Link to="/dashboard/chairman/create-timetable" className="hover:text-yellow-400 text-sm">
//                         Create TimeTable
//                       </Link>
//                     </li>
//                     <li>
//                       <Link to="/dashboard/chairman/manage-timetables" className="hover:text-yellow-400 text-sm">
//                         Manage TimeTable
//                       </Link>
//                     </li>
//                     <li>
//                       <Link to="/dashboard/chairman/manage-timetablesSlots" className="hover:text-yellow-400 text-sm">
//                         Manage TimeTable Slots
//                       </Link>
//                     </li>
//                   </ul>
//                 )}
//               </li>
//               <li>
//                 <button
//                   onClick={() => setIsSemesterOpen(!isSemesterOpen)}
//                   className="flex items-center justify-between w-full gap-2 hover:text-yellow-400 cursor-pointer"
//                 >
//                   <div className="flex items-center gap-2">
//                     <Calendar size={18} />
//                     <span>Semester</span>
//                   </div>
//                   {isSemesterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                 </button>
//                 {isSemesterOpen && (
//                   <ul className="pl-6 mt-2 space-y-2 border-l border-gray-600">
//                     <li>
//                       <Link to="/dashboard/chairman/create-semester" className="hover:text-yellow-400 text-sm">
//                         Create Semester
//                       </Link>
//                     </li>
//                     <li>
//                       <Link to="/dashboard/chairman/manage-semesters" className="hover:text-yellow-400 text-sm">
//                         Manage Semesters
//                       </Link>
//                     </li>
//                   </ul>
//                 )}
//               </li>
//               <li>
//                 <button
//                   onClick={() => setIsCourseOpen(!isCourseOpen)}
//                   className="flex items-center justify-between w-full gap-2 hover:text-yellow-400 cursor-pointer"
//                 >
//                   <div className="flex items-center gap-2">
//                     <BookOpen size={18} />
//                     <span>Courses</span>
//                   </div>
//                   {isCourseOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                 </button>

//                 {isCourseOpen && (
//                   <ul className="pl-6 mt-2 space-y-2 border-l border-gray-600">
//                     <li>
//                       <Link to="/dashboard/chairman/create-course" className="hover:text-yellow-400 text-sm">
//                         Create Course
//                       </Link>
//                     </li>
//                     <li>
//                       <Link to="/dashboard/chairman/manage-courses" className="hover:text-yellow-400 text-sm">
//                         Manage Courses
//                       </Link>
//                     </li>
//                   </ul>
//                 )}
//               </li>
//             </>
//           )}
//         </ul>
//         <button className="flex items-center gap-2 hover:text-red-400 mt-auto"
//           onClick={() => {
//             localStorage.clear();
//             window.location.href = "/";
//           }}>
//           <LogOut size={18} /> Logout
//         </button>
//       </nav>


//       {isOpen && (
//         <div className="md:hidden bg-slate-700 text-white p-4">
//           <ul className="space-y-3">
//             <Link to={user?.role === 'superadmin' ? "/dashboard/superadmin" : "/dashboard/ChairmanDashboard"}
//               className="flex items-center gap-2 hover:text-yellow-400 ">
//               <Home size={18} /> Dashboard
//             </Link>

//             {user?.role === 'superadmin' && (
//               <Link to="/dashboard/deptDashboard" className="flex items-center gap-2 hover:text-yellow-400">
//                 <Users size={18} /> Departments
//               </Link>
//             )}

//             {user?.role === 'superadmin' && (
//               <Link to="/dashboard/superadmin/create-chairman" className="flex items-center gap-2 hover:text-yellow-400">
//                 <Users size={18} /> Create Chairman
//               </Link>
//             )}
//             {user?.role === 'superadmin' && (
//               <Link to="/dashboard/superadmin/create-department" className="flex items-center gap-2 hover:text-yellow-400">
//                 <UserCog size={24} />Create Dept & Assign Chairman
//               </Link>
//             )}
//             <li>
//               {user?.role === 'chairman' && (
//                 <Link to="/dashboard/chairman/create-teacher" className="flex items-center gap-2 hover:text-yellow-400">
//                   <Users size={18} /> Create Teacher
//                 </Link>
//               )}
//             </li>
//           </ul>
//         </div>
//       )}
//     </aside>
//   );
// }


import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Users,
  LogOut,
  UserCog,
  Menu,
  LayoutGrid,
  Building2,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Calendar,
} from "lucide-react";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});

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
      { name: "Faculties", icon: <GraduationCap size={18} />, path: "/dashboard/facultyDashboard" },
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
      { name: "Create Chairman", icon: <Users size={18} />, path: "/dashboard/dean/create-chairman" },
      { name: "Departments", icon: <Building2 size={24} />, path: "/dashboard/dean/departments" },
      { name: "Create Department", icon: <Building2 size={24} />, path: "/dashboard/dean/create-department" },
      { name: "Update Department", icon: <Building2 size={24} />, path: "/dashboard/dean/update-department" }
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
          { name: "Manage TimeTable Slots", path: "/dashboard/chairman/manage-timetablesSlots" },
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
    ],
  };

  const links = dashboardRoutes[user?.role] || [];

  return (
    <aside className="flex justify-between items-center md:block md:w-64 bg-slate-800 text-white p-2 md:p-5 relative z-50">
      {/* Title */}
      <h2 className="text-xl font-semibold md:mb-10 text-center">{panelTitle}</h2>

      {/* Mobile toggle button */}
      <button
        className="md:hidden text-2xl md:mb-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={22} />
      </button>

      {/* Desktop sidebar */}
      <nav className="hidden md:block">
        <ul className="flex flex-col gap-4">
          {links.map((link, idx) =>
            link.submenu ? (
              <li key={idx}>
                <button
                  onClick={() => toggleMenu(link.name)}
                  className="flex items-center justify-between w-full gap-2 hover:text-yellow-400 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2">{link.icon} <span>{link.name}</span></div>
                  {expandedMenus[link.name] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <ul
                  className={`pl-6 mt-2 space-y-2 border-l border-gray-600 overflow-hidden transition-max-height duration-300 ease-in-out
                ${expandedMenus[link.name] ? "max-h-40" : "max-h-0"}`}
                >
                  {link.submenu.map((sub, i) => (
                    <li key={i}>
                      <Link
                        to={sub.path}
                        className="hover:text-yellow-400 text-sm block transition-colors"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={idx}>
                <Link
                  to={link.path}
                  className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
                >
                  {link.icon} {link.name}
                </Link>
              </li>
            )
          )}
          <button
            className="flex items-center gap-2 hover:text-red-400 mt-6 md:mt-auto transition-colors cursor-pointer"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            <LogOut size={18} /> Logout
          </button>
        </ul>
      </nav>

      {/* Mobile sidebar */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 md:hidden z-40"
            onClick={() => setIsOpen(false)}
          />
          <nav className="fixed top-0 left-0 w-64 h-full bg-slate-800 p-5 overflow-y-auto z-50 md:hidden transition-transform duration-300">
            <ul className="flex flex-col gap-4">
              {links.map((link, idx) =>
                link.submenu ? (
                  <li key={idx}>
                    <button
                      onClick={() => toggleMenu(link.name)}
                      className="flex items-center justify-between w-full gap-2 hover:text-yellow-400 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2">{link.icon} <span>{link.name}</span></div>
                      {expandedMenus[link.name] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    <ul
                      className={`pl-6 mt-2 space-y-2 border-l border-gray-600 overflow-hidden transition-max-height duration-300 ease-in-out
                    ${expandedMenus[link.name] ? "max-h-40" : "max-h-0"}`}
                    >
                      {link.submenu.map((sub, i) => (
                        <li key={i}>
                          <Link
                            to={sub.path}
                            className="hover:text-yellow-400 text-sm block transition-colors"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={idx}>
                    <Link
                      to={link.path}
                      className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
                    >
                      {link.icon} {link.name}
                    </Link>
                  </li>
                )
              )}
            </ul>
            <button
              className="flex items-center gap-2 hover:text-red-400 mt-6 transition-colors"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
            >
              <LogOut size={18} /> Logout
            </button>
          </nav>
        </>
      )}
    </aside>
  );
}