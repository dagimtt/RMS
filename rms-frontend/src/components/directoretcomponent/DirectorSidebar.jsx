import { Home, Inbox, PlusCircle, LogOut, Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function DirectorSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const menuItems = [
    { icon: Home, label: "Home", path: "/director" },
    { icon: Inbox, label: "Incoming Letter", path: "/director/incoming" },
    { icon: PlusCircle, label: "Add Letter", path: "/director/add-letter" },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...");
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-sm border-r border-gray-200 z-30 hidden md:flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">
          Director Panel
        </h1>
      </div>

      {/* Search Bar */}
      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search documents, letters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
          />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                active
                  ? "bg-blue-50 border border-blue-200 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              <Icon
                size={18}
                className={
                  active
                    ? "text-blue-600"
                    : "text-gray-500 group-hover:text-gray-700"
                }
              />
              <span
                className={`font-medium text-sm ${
                  active ? "text-blue-700" : "text-gray-600 group-hover:text-gray-800"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-3 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 font-medium transition-all duration-200 group border border-red-200"
        >
          <LogOut size={18} className="group-hover:scale-105 transition-transform" />
          <span className="text-sm">Logout</span>
        </button>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200">
        <p className="text-center text-gray-500 text-xs">
          © 2025 Director Panel
        </p>
      </div>
    </aside>
  );
}