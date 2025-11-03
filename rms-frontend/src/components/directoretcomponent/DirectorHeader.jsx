import { Bell, User, Search, Menu, ChevronDown, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function DirectorHeader() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, text: "New incoming letter received", time: "5 min ago", unread: true },
    { id: 2, text: "Meeting scheduled for tomorrow", time: "1 hour ago", unread: true },
    { id: 3, text: "Weekly report is ready", time: "2 hours ago", unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-50 transition-all duration-300 md:left-64 md:w-[calc(100%-16rem)]">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-all duration-200 group md:hidden"
          >
            <Menu className="text-gray-600 group-hover:text-gray-800" size={20} />
          </button>
          
        

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search documents, letters..."
              className="pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 w-72 hidden md:block text-sm"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-1.5 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
            >
              <Bell className="text-gray-600 group-hover:text-gray-800" size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center w-4 h-4 bg-red-500 text-[10px] text-white font-medium rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 top-12 w-72 bg-white rounded-xl shadow-lg border border-gray-200 py-1 transform origin-top-right transition-all duration-200 z-50">
                <div className="px-3 py-2 border-b border-gray-100">
                  <h3 className="font-medium text-gray-800 text-sm">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-3 py-2 hover:bg-gray-50 transition-colors border-l-2 ${
                        notification.unread 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-transparent'
                      }`}
                    >
                      <p className="text-xs text-gray-700">{notification.text}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="px-3 py-1 border-t border-gray-100">
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium w-full text-center py-2">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                <User className="text-white" size={16} />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-gray-700 font-medium text-sm">Director</p>
              </div>
              <ChevronDown className={`text-gray-500 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} size={14} />
            </button>

            {/* Profile Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-1 transform origin-top-right transition-all duration-200 z-50">
                <div className="px-3 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">Director Account</p>
                  <p className="text-xs text-gray-500">director@example.com</p>
                </div>
                <div className="py-1">
                  <button 
                    onClick={() => {
                      navigate("/director/profile");
                      setProfileOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <User size={14} />
                    Profile Settings
                  </button>
                  <button className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <Mail size={14} />
                    Messages
                  </button>
                </div>
                <div className="px-3 py-1 border-t border-gray-100">
                  <button className="w-full text-sm text-red-600 hover:text-red-700 font-medium text-center py-2 text-xs">
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}