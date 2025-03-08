import React from "react";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { logout } = useAuth();

  const userName = localStorage.getItem("username");

  return (
    <nav className="bg-[rgb(35,35,35))] fixed w-full z-20 top-0 start-0 ">
      <div className=" flex flex-wrap items-center justify-between mx-auto p-3">
        {/* Left side content */}
        <div className="flex ">
          <span className="text-white font-medium tracking-widest">LOGO</span>
        </div>

        {/* Right side content */}
        <div className="flex  justify-center items-center gap-5">
          <span className="text-white font-medium">Hello, {userName}</span>
          <button
            type="button"
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
