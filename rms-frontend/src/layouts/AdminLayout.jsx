// layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import Header from "../components/admincomponents/Header";
import Sidebar from "../components/admincomponents/Sidebar";
import Footer from "../components/admincomponents/Footer";

export default function AdminLayout() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen flex flex-col transition-colors duration-300">
      <Header />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        <main className="flex-1 p-6 md:ml-64 transition-all duration-300">
          <Outlet /> {/* This renders nested routes */}
        </main>
      </div>
      <Footer />
    </div>
  );
}
