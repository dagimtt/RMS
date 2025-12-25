import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Home,
  Folder,
  BarChart2,
  Settings,
  Inbox,
  Send,
  Users,
  UserPlus,
  LogOut,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openUsers, setOpenUsers] = useState(false);

  const role = localStorage.getItem("role"); // admin | user

  const links = [
    { to: "/admin", label: "Home", icon: <Home size={18} /> },
    { to: "/admin/records", label: "Records", icon: <Folder size={18} /> },
    { to: "/admin/reports", label: "Reports", icon: <BarChart2 size={18} /> },
    { to: "/admin/incoming", label: "Incoming", icon: <Inbox size={18} /> },
    { to: "/admin/outgoing", label: "Outgoing", icon: <Send size={18} /> },
  ];

  const userLinks = [
    { to: "/admin/users", label: "View Users", icon: <Users size={16} /> },
    { to: "/admin/add-user", label: "Add User", icon: <UserPlus size={16} /> },
  ];

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="hidden md:flex flex-col w-64 fixed top-16 left-0 h-[calc(100vh-4rem)] bg-gray-100 border-r p-6">
      <nav className="flex flex-col gap-2">

        {/* Main Links */}
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-3 p-2 rounded-lg transition ${
              isActive(link.to)
                ? "bg-blue-100 text-blue-600 font-medium"
                : "hover:bg-gray-200"
            }`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}

        {/* ADMIN ONLY - User Management Dropdown */}
        {role === "admin" && (
          <div className="mt-4">
            <button
              onClick={() => setOpenUsers(!openUsers)}
              className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-200 transition"
            >
              <div className="flex items-center gap-3 text-gray-700">
                <Users size={18} />
                <span>User Management</span>
              </div>
              {openUsers ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {openUsers && (
              <div className="ml-6 mt-2 flex flex-col gap-1">
                {userLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-2 p-2 rounded-lg text-sm transition ${
                      isActive(link.to)
                        ? "bg-blue-100 text-blue-600 font-medium"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Settings */}
        <Link
          to="/admin/settings"
          className={`flex items-center gap-3 p-2 rounded-lg transition mt-4 ${
            isActive("/admin/settings")
              ? "bg-blue-100 text-blue-600 font-medium"
              : "hover:bg-gray-200"
          }`}
        >
          <Settings size={18} />
          Settings
        </Link>

        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center gap-3 p-2 rounded-lg text-red-600 hover:bg-red-100 transition mt-auto"
        >
          <LogOut size={18} />
          Logout
        </button>

      </nav>
    </aside>
  );
}

export default Sidebar;
