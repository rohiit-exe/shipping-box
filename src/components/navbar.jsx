import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useBox } from "../context/useBox";

const Navbar = () => {
    const location = useLocation();
    const { boxes = [] } = useBox();

    const baseLinkClasses = "relative px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-blue-500/50 flex items-center";
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
                    {boxes.length > 0 && (
                        <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-semibold leading-none text-blue-800 bg-blue-200 rounded-full shadow-sm">
                            {boxes.length}
                        </span>
                    )}
                </Link>

            </div>
        </nav>
    );
};

export default Navbar;
