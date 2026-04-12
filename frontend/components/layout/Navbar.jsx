import { useState } from "react";
import { Menu, DoorOpen, UserRoundPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    
    <nav className="w-full flex justify-between items-center bg-slate-800 text-white p-2 md:p-5 relative z-50">
      {/* Left side - Logo */}
      <h2 className="text-xl font-bold">Logo</h2>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Desktop links (hidden on mobile) */}
        <ul className="hidden md:flex gap-4 items-center">
          <li>
            <Link to="/login" className="flex items-center gap-1 text-white">
              <DoorOpen size={18} /> Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className="flex items-center gap-1">
              <UserRoundPlus size={18} /> Signup
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
            <li><Link to="/signup" className="flex items-center gap-2">
              <UserRoundPlus size={18} /> Signup
            </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
