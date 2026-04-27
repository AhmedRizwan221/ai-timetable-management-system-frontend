import { useState } from "react";
import { Menu, DoorOpen, UserRoundPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../src/assets/logo.png";
import quest from "../../src/assets/quest logo.png"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
   <header className="sticky top-0 z-50 w-full bg-slate-800 text-white border-b border-slate-700">
      <nav className="w-full flex justify-between items-center bg-slate-800 text-white p-2 md:p-5 relative z-50">
        <div className="flex items-center gap-3">
          {/* Logo Icon */}
          <div className="w-12 h-12 md:w-14 md:h-14 relative">
            <div className="absolute inset-0 border-2 border-white rounded-full"></div>
            <div className="absolute inset-1 border border-white rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M12 4L4 8L12 12L20 8L12 4Z" stroke="white" fill="none" />
                <path d="M4 12L12 16L20 12" stroke="white" fill="none" />
                <path d="M4 16L12 20L20 16" stroke="white" fill="none" />
              </svg>
            </div>
          </div>

          {/* Text Content */}
          <div className="text-white">
            <p className="font-bold text-sm md:text-base leading-tight">
              QUAID-E-AWAM UNIVERSITY
            </p>
            <p className="text-xs md:text-sm opacity-90 leading-tight">
              OF ENGINEERING, SCIENCE & TECHNOLOGY
            </p>
            <p className="text-[10px] md:text-xs opacity-80">
              NAWABSHAH, SINDH, PAKISTAN
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ul className="hidden md:flex gap-4 items-center">
            <li>
              <Link to="/" className="flex items-center gap-1 text-white">
                <DoorOpen size={18} /> Departments
              </Link>
            </li>
            <li>
              <Link to="/" className="flex items-center gap-1 text-white">
                <DoorOpen size={18} /> Faculties
              </Link>
            </li>
            <li>
              <Link to="/" className="flex items-center gap-1 text-white">
                <DoorOpen size={18} /> TimeTable
              </Link>
            </li>
            <li>
              <Link to="/" className="flex items-center gap-1 text-white">
                <DoorOpen size={18} /> Courses
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <ul className="hidden md:flex gap-4 items-center">
            <li>
              <Link to="/login" className="flex items-center gap-1 text-white">
                <DoorOpen size={18} /> Login
              </Link>
            </li>
          </ul>

          {/* Mobile menu icon (only visible on small screens) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded hover:bg-slate-700"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="fixed top-0 left-0 w-64 h-full bg-slate-800 p-5 overflow-y-auto z-50 md:hidden transition-transform duration-300">
            <ul className="flex flex-col gap-4">
              <li>
                <Link to="/login" className="flex items-center gap-2">
                  <DoorOpen size={18} /> Login
                </Link>

              </li>
              {/* <li><Link to="/signup" className="flex items-center gap-2">
              <UserRoundPlus size={18} /> Signup
            </Link>
            </li> */}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
