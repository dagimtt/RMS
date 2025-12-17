// layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import Header from "../components/admincomponents/Header";
import Sidebar from "../components/admincomponents/Sidebar";
import Footer from "../components/admincomponents/Footer";

export default function AdminLayout() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-1 pt-16">
        <Sidebar />

        <main className="flex-1 p-6 md:ml-64">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
