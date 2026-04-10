import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between px-8 py-4 border-b">
        <div className="flex items-center gap-4">
  
  {/* Clickable logo */}
  <Link to="/">
    <img 
      src="/images/PurdueLogo.svg" 
      alt="Purdue University" 
      className="h-12 hover:opacity-80 transition cursor-pointer"
    />
  </Link>

  {/* Text NOT clickable */}
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
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
          >
            🔍
          </button>
          
          <Link 
            to="/login" 
            className="bg-[#C4B07A] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-yellow-700 transition"
          >
            Log In
          </Link>
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
