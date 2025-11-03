import { Link, useLocation } from "react-router-dom";
import { Home, Folder, BarChart2, Settings, Inbox, Send } from "lucide-react";

function Sidebar() {
  const location = useLocation();
  const links = [
    { to: "/", label: "Home", icon: <Home size={18} /> },
    { to: "/records", label: "Records", icon: <Folder size={18} /> },
    { to: "/reports", label: "Reports", icon: <BarChart2 size={18} /> },
    // New buttons
  { to: "/incoming", label: "Incoming", icon: <Inbox size={18} /> },
{ to: "/outgoing", label: "Outgoing", icon: <Send size={18} /> },
    { to: "/settings", label: "Settings", icon: <Settings size={18} /> },


  ];

  return (
    <aside className="hidden md:flex flex-col w-64 fixed top-16 left-0 h-[calc(100vh-4rem)] bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-6 text-gray-700 dark:text-gray-300 transition-all">
      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-3 p-2 rounded-lg transition ${
              location.pathname === link.to
                ? "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-white font-medium"
                : "hover:bg-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
