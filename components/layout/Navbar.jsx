import { useState } from "react";
import { Menu, X, DoorOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-slate-900 text-white shadow-lg transition-all duration-300">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">

          {/* Brand Logo & University Text */}
          <Link to="/" className="flex items-center gap-3 group dynamic-zone py-2">
            {/* Logo Icon with subtle hover scale */}
            <div className="w-12 h-12 md:w-14 md:h-14 relative shrink-0 transition-transform duration-300 group-hover:scale-105">
              <div className="absolute inset-0 border-2 border-white/80 rounded-full"></div>
              <div className="absolute inset-1 border border-white/40 rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                  <path d="M12 4L4 8L12 12L20 8L12 4Z" stroke="white" fill="none" />
                  <path d="M4 12L12 16L20 12" stroke="white" fill="none" />
                  <path d="M4 16L12 20L20 16" stroke="white" fill="none" />
                </svg>
              </div>
            </div>

            {/* Typography */}
            <div className="text-white select-none">
              <p className="font-bold text-sm md:text-base leading-tight tracking-wide group-hover:text-blue-400 transition-colors duration-200">
                QUAID-E-AWAM UNIVERSITY
              </p>
              <p className="text-[11px] md:text-xs text-slate-300 leading-tight">
                OF ENGINEERING, SCIENCE & TECHNOLOGY
              </p>
              <p className="text-[9px] md:text-[10px] text-slate-400 font-medium tracking-wider">
                NAWABSHAH, SINDH, PAKISTAN
              </p>
            </div>
          </Link>

          {/* Desktop Navigation (Only Login Button) */}
          <div className="hidden md:flex items-center">
            <Link
              to="/login"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all duration-200 shadow-sm shadow-blue-900/20"
            >
              <DoorOpen size={16} />
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Overlay Background */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 md:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Side Drawer Menu */}
      <div className={`fixed top-0 left-0 w-72 h-full bg-slate-900 p-6 z-50 md:hidden transform transition-transform duration-300 ease-in-out shadow-2xl ${menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className="flex flex-col h-full justify-between">
          <div>
            {/* Header inside drawer */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <span className="font-bold text-slate-200 tracking-wide">Navigation</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-1 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Actions list */}
            <ul className="flex flex-col gap-3 mt-6">
              <li>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-all duration-200 group"
                >
                  <DoorOpen size={18} className="text-blue-400 group-hover:scale-110 transition-transform" />
                  <span>Login Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-[10px] text-center text-slate-500">
            © {new Date().getFullYear()} QUEST. All rights reserved.
          </div>
        </div>
      </div>
    </>
  );
}