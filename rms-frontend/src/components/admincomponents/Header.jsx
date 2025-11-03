import { useState } from "react";
import { Moon, Sun, Menu } from "lucide-react";

function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 md:px-8 z-50 transition-all">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <Menu className="text-gray-600 dark:text-gray-300" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          Record Management System
        </h1>
      </div>

      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:scale-110 transition-transform"
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  );
}

export default Header;
