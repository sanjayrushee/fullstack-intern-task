import  { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const handleStorage = () => {
      const updatedToken = localStorage.getItem("token");
      setIsLoggedIn(!!updatedToken);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [location]);(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear()
    setIsLoggedIn(false);
    navigate("/login");
  };

  const NavLink = ({ to, children }) => {
    const active = location.pathname === to;
    return (
      <Link
        to={to}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
          active ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
        }`}
        onClick={() => setMenuOpen(false)}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-semibold text-gray-800 mr-6">
              MyTemplates
            </Link>
            <div className="hidden sm:flex sm:space-x-2">
              <NavLink to="/templates">Templates</NavLink>
              <NavLink to="/favorite-templates">Favorites</NavLink>
            </div>
          </div>

          <div className="flex items-center">
            <div className="hidden sm:flex sm:items-center">
              {!isLoggedIn ? (
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md text-sm font-medium bg-blue-500 text-white hover:opacity-90"
                >
                  Login
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md text-sm font-medium bg-red-500 text-white hover:opacity-90"
                >
                  Logout
                </button>
              )}
            </div>

            <div className="sm:hidden ml-2 flex items-center">
              <button
                onClick={() => setMenuOpen((s) => !s)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
                aria-expanded={menuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {menuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="sm:hidden border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/templates"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === "/templates" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Templates
            </Link>

            <Link
              to="/favorite-templates"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === "/favorite-templates" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Favorites
            </Link>

            {!isLoggedIn ? (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
