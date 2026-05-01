import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Load user on route change
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsed = JSON.parse(storedUser);

      // Ensure normal users have a role
      if (!parsed.role) {
        parsed.role = "user";
      }

      setUser(parsed);
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <header className="flex items-center justify-between px-8 py-4 border-b">
        <div className="flex items-center gap-4">
          <Link to="/">
            <img
              src="/images/PurdueLogo.svg"
              alt="Purdue University"
              className="h-12 hover:opacity-80 transition cursor-pointer"
            />
          </Link>

          <span className="text-lg font-medium">
            Living Lab Purdue University
          </span>
        </div>

        <nav className="hidden md:flex gap-8 text-sm font-semibold">
          <Link to="/" className="hover:text-yellow-600">Home</Link>
          <Link to="/documents" className="hover:text-yellow-600">Documents</Link>
          <Link to="/projects" className="hover:text-yellow-600">Projects</Link>
          <Link to="/faq" className="hover:text-yellow-600">FAQ</Link>
          <Link to="/help" className="hover:text-yellow-600">Help</Link>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="bg-[#C4B07A] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-yellow-700 transition"
                >
                  Admin Panel
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="border border-gray-300 px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-100 transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-[#C4B07A] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-yellow-700 transition"
            >
              Log In
            </Link>
          )}
        </div>
      </header>

      {showSearch && (
        <div className="w-full bg-gray-100 border-b px-8 py-3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border rounded outline-none"
          />
        </div>
      )}
    </>
  );
}

export default Header;
