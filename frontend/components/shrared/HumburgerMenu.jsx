import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

export default function HumburgerMenu({
    dashboardName,
    options = [],
    className = "",
    ...props
}) {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <>
            <nav className="flex flex-col justify-between items-center p-3 bg-slate-800 text-white">
                <h2 className="text-xl font-bold">{dashboardName}</h2>
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Menu size={22} />
                </button>

                <ul className="hidden md:flex flex-col gap-6">
                    {options.map(({ name, path, icon: Icon }) => (
                        <li key={name}>
                            <Link to={path}>
                                <Icon size={18} /> {name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
            {isOpen && (
                <div className="md:hidden bg-slate-700 text-white p-4">
                    <ul className="space-y-3">
                        {options.map(({ name, path, icon: Icon }) => (
                            <li key={name}>
                                <Link
                                    to={path}
                                    onClick={() => setIsOpen(false)}
                                    className="block hover:text-gray-300"
                                >
                                    <Icon size={18} />
                                    {name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}