import  { useState } from "react";
import { Menu, DoorOpen, UserRoundPlus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center p-3 bg-slate-800 text-white">
      {/* Left side - Logo */}
      <h2 className="text-xl font-bold">Logo</h2>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Desktop links (hidden on mobile) */}
        <ul className="hidden md:flex gap-4 items-center">
          {(user?.role === "superadmin" || user?.role === "chairman") && (
            <>
              <Link to="/login" className="flex items-center gap-1">
                <DoorOpen size={18} /> Login
              </Link>
              <Link to="/signup" className="flex items-center gap-1">
                <UserRoundPlus size={18} /> Signup
              </Link>
            </>
          )}
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
        <div className="absolute top-14 right-3 bg-slate-700 p-4 rounded-lg flex flex-col gap-2 md:hidden">
          {(user?.role === "superadmin" || user?.role === "chairman") && (
            <>
              <Link to="/login" className="flex items-center gap-2">
                <DoorOpen size={18} /> Login
              </Link>
              <Link to="/signup" className="flex items-center gap-2">
                <UserRoundPlus size={18} /> Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
