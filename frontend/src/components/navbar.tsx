import React from 'react';

const Navbar: React.FC = () => {
    const userName = "User One"; // This should be dynamically set

    return (
        <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* Left side content */}
                <div className="flex order-1">
                    <span className="text-gray-700 font-medium">Hello, {userName}</span>
                </div>
                {/* Right side content */}
                <div className="flex order-2 ml-auto space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button
                        type="button"
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
