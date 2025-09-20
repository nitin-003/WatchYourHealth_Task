import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Function to get link styles based on active state
  const getLinkStyles = (path) => {
    const baseStyles = "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200";
    const activeStyles = "bg-blue-700 text-white shadow-md";
    const inactiveStyles = "text-blue-100 hover:bg-blue-700 hover:text-white";
    
    return `${baseStyles} ${isActive(path) ? activeStyles : inactiveStyles}`;
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center relative">
      <div className="text-2xl font-bold">
        <Link 
          to="/" 
          className={`transition-colors duration-200 ${isActive("/") ? "text-white" : "text-blue-100 hover:text-white"}`}
        >
          WatchYourHealth
        </Link>
      </div>

      {/* Desktop */}
      <ul className="hidden md:flex space-x-4 items-center">
        {user ? (
          <>
            <li>
              <Link to="/" className={getLinkStyles("/")}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/report" className={getLinkStyles("/report")}>
                Reports
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className={`px-4 py-2 border rounded hover:bg-white hover:text-blue-600 transition-colors text-sm font-medium ${isActive("/login") ? "bg-white text-blue-600" : ""}`}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className={`px-4 py-2 border rounded hover:bg-white hover:text-blue-600 transition-colors text-sm font-medium ${isActive("/signup") ? "bg-white text-blue-600" : ""}`}
              >
                Signup
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* Mobile menu button */}
      <button
        className="md:hidden p-2 rounded hover:bg-blue-700 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <ul className="absolute top-16 left-0 w-full bg-blue-600 flex flex-col space-y-2 p-4 md:hidden z-10 shadow-lg">
          {user ? (
            <>
              <li>
                <Link 
                  to="/" 
                  onClick={() => setMenuOpen(false)}
                  className={getLinkStyles("/")}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/report" 
                  onClick={() => setMenuOpen(false)}
                  className={getLinkStyles("/report")}
                >
                  Reports
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm font-medium w-full text-left"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-2 border rounded hover:bg-white hover:text-blue-600 transition-colors text-sm font-medium w-full text-center ${isActive("/login") ? "bg-white text-blue-600" : ""}`}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-2 border rounded hover:bg-white hover:text-blue-600 transition-colors text-sm font-medium w-full text-center ${isActive("/signup") ? "bg-white text-blue-600" : ""}`}
                >
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
}


