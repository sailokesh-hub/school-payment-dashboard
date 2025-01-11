import React from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle";

const Navbar = () => {
  return (
    <nav className="bg-[#898af7] dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-md p-3">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-semibold ">School Payments Dashboard</h1>
        <div className="space-x-6 flex items-center">
          <Link
            to="/transactions"
            className="hover:text-teal-700 dark:hover:text-green-400 transition"
          >
            Dashboard
          </Link>
          <Link
            to="/custompayload"
            className="hover:text-teal-700 dark:hover:text-green-400 transition"
          >
            Custom Payload
          </Link>
          <Link
            to="/transactions/status-check"
            className="hover:text-teal-700 dark:hover:text-green-400 transition"
          >
            Status Check
          </Link>
          <DarkModeToggle /> {/* Dark mode toggle button */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
