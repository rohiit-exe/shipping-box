import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();

    const baseLinkClasses = "px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-blue-500/50";

    const activeLinkClasses = "bg-white text-blue-800 shadow-md font-bold";

    return (
        <nav className="bg-blue-700 p-4 shadow-lg">
            <div className="container mx-auto flex items-center gap-6 text-white font-medium">

                <Link
                    to="/form"
                    className={`${baseLinkClasses} ${location.pathname === "/form" ? activeLinkClasses : ""}`}
                >
                    Add Box
                </Link>

                <Link
                    to="/list"
                    className={`${baseLinkClasses} ${location.pathname === "/list" ? activeLinkClasses : ""}`}
                >
                    View Boxes
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;