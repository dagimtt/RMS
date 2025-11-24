// src/layouts/DirectorLayout.jsx
import { Outlet } from "react-router-dom";
import DirectorHeader from "../components/directoretcomponent/DirectorHeader";
import DirectorSidebar from "../components/directoretcomponent/DirectorSidebar";
import DirectorFooter from "../components/directoretcomponent/DirectorFooter";

export default function DirectorLayout() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen flex flex-col">
      {/* Header */}
      <DirectorHeader />

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <div className="z-30">
          <DirectorSidebar />
        </div>

        {/* Main content */}
        <main className="flex-1 p-6 md:ml-64 z-10 overflow-y-auto">
          <Outlet /> {/* ✅ This is what renders nested pages */}
        </main>
      </div>

      {/* Footer */}
      <DirectorFooter />
    </div>
  );
}
