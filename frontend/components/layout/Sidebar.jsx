// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { Home, Users, LogOut, UserCog, Menu } from "lucide-react";
// import { logout } from "../../store/auth/authSlice.js"; 
// import axios from "axios";

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const user = useSelector((state) => state.auth.user);

//   const isSuperAdmin = user?.role === "superadmin";
//   const isChairman = user?.role === "chairman";

//   const handleLogout = async () => {
//     try {
//       await axios.post(
//         "http://localhost:4000/auth/logout",
//         {},
//         { withCredentials: true }
//       );
//     } catch (err) {
//       console.error("Logout error:", err);
//     } finally {
//       dispatch(logout());
//       navigate("/");
//     }
//   };

//   return (
//     <aside className="flex md:block md:w-64 bg-slate-800 text-white p-2 md:p-5">
//       <h2 className="text-xl font-semibold mb-10 text-center">
//         {isSuperAdmin ? "Admin Panel" : "Chairman Panel"}
//       </h2>

//       <nav className="flex-1 space-y-4">
//         <button
//           className="md:hidden text-2xl"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <Menu size={22} />
//         </button>

//         <ul className="flex md:flex-col gap-4">
//           <Link
//             to={isSuperAdmin ? "/dashboard/superadmin" : "/dashboard/ChairmanDashboard"}
//             className="flex items-center gap-2 hover:text-yellow-400"
//           >
//             <Home size={18} /> Dashboard
//           </Link>

//           {isSuperAdmin && (
//             <Link
//               to="/dashboard/deptDashboard"
//               className="flex items-center gap-2 hover:text-yellow-400"
//             >
//               <Users size={18} /> Departments
//             </Link>
//           )}

//           {isSuperAdmin && (
//             <Link
//               to="/dashboard/superadmin/create-chairman"
//               className="flex items-center gap-2 hover:text-yellow-400"
//             >
//               <Users size={18} /> Create Chairman
//             </Link>
//           )}

//           {isSuperAdmin && (
//             <Link
//               to="/dashboard/superadmin/create-department"
//               className="flex items-center gap-2 hover:text-yellow-400"
//             >
//               <UserCog size={24} /> Create Dept & Assign Chairman
//             </Link>
//           )}

//           {isChairman && (
//             <Link
//               to="/dashboard/chairman/create-teacher"
//               className="flex items-center gap-2 hover:text-yellow-400"
//             >
//               <Users size={18} /> Create Teacher
//             </Link>
//           )}
//         </ul>

//         <button
//           className="flex items-center gap-2 hover:text-red-400 mt-auto"
//           onClick={handleLogout}
//         >
//           <LogOut size={18} /> Logout
//         </button>
//       </nav>

//       {isOpen && (
//         <div className="md:hidden bg-slate-700 text-white p-4">
//           <ul className="space-y-3">
//             {/* Same links as above (can be refactored later) */}
//           </ul>
//         </div>
//       )}
//     </aside>
//   );
// }

















import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Users, LogOut, UserCog, Menu } from "lucide-react";
import { useSelector } from "react-redux";


export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

 
  const user = useSelector((state) => state.auth.user);
  // console.log(user);

  return (
    <aside className="flex md:block md:w-64 bg-slate-800 text-white p-2 md:p-5">
      <h2 className="text-xl font-semibold mb-10 text-center">{user?.role === 'admin' ? "Admin Panel" : "Chairman Panel"}</h2>
      <nav className="flex-1 space-y-4">
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={22} />
        </button>

        <ul className=" flex md:flex-col gap-4">
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
          {user?.role === 'superadmin' && (
            <Link to="/dashboard/superadmin/create-department" className="flex items-center gap-2 hover:text-yellow-400">
              <UserCog size={24} />Create Dept & Assign Chairman
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
        <button className="flex items-center gap-2 hover:text-red-400 mt-auto"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}>
          <LogOut size={18} /> Logout
        </button>
      </nav>


      {isOpen && (
        <div className="md:hidden bg-slate-700 text-white p-4">
          <ul className="space-y-3">
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
            {user?.role === 'superadmin' && (
              <Link to="/dashboard/superadmin/create-department" className="flex items-center gap-2 hover:text-yellow-400">
                <UserCog size={24} />Create Dept & Assign Chairman
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
        </div>
      )}
    </aside>
  );
}
