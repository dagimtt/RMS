import { useState } from "react";
import { Menu } from "lucide-react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-4 md:px-8 z-50 transition-all">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <Menu className="text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">
          Record Management System
        </h1>
      </div>
    </header>
  );
}

export default Header;