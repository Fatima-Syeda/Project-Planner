import React, { useState } from "react";
import { UserAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function Nav() {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-gray-800 text-white px-4 py-3">
      <div className="w-full flex items-center justify-between">
        {/* Left side: title, welcome, sign out */}
        <div>
          <h1 className="text-xl font-bold">Project Planner</h1>
          <h2 className="text-sm">
            Welcome, {session?.user?.user_metadata?.name.toUpperCase()}
          </h2>
        </div>

        {/* Right side: menu button and dropdown */}
        <div className="relative">
          <button
            id="menu-button"
            aria-expanded={menuOpen}
            aria-haspopup="true"
            onClick={toggleMenu}
            className="inline-flex items-center justify-center p-2 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span className="sr-only">Open main menu</span>
            {!menuOpen ? (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>

          {/* Dropdown menu */}
          {menuOpen && (
            <div
              id="menu"
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none text-black z-50"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <h2 className="px-4 py-10 text-sm text-gray-700">
                Signed in as <p className= "font-bold mb-10">{session?.user?.email}</p>
              </h2>
            <p
            onClick={handleSignOut}
            className="hover:cursor-pointer border inline-block px-4 py-1 mt-4 hover:underline"
            >
            Sign out
            </p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Nav;
