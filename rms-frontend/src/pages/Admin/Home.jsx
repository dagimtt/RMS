import { useEffect, useState } from "react";
import { FileText, Clock, Inbox, Send } from "lucide-react";

function Home() {
  const [stats, setStats] = useState({
    totalRecords: 0,
    pending: 0,
    incoming: 0,
    outgoing: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/dashboard-stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Header */}
      <h2 className="text-xl font-semibold">RMS Dashboard</h2>

      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <StatCard
          title="Total Records"
          value={stats.totalRecords}
          icon={<FileText className="text-blue-500" size={28} />}
          color="from-blue-500/10 to-blue-500/30"
        />

        <StatCard
          title="Pending Letters"
          value={stats.pending}
          icon={<Clock className="text-yellow-500" size={28} />}
          color="from-yellow-500/10 to-yellow-500/30"
        />
      </div>

      {/* Letter Archive */}
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
        Letter Archive
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <StatCard
          title="Incoming Letters"
          value={stats.incoming}
          icon={<Inbox className="text-purple-500" size={28} />}
          color="from-purple-500/10 to-purple-500/30"
        />

        <StatCard
          title="Outgoing Letters"
          value={stats.outgoing}
          icon={<Send className="text-pink-500" size={28} />}
          color="from-pink-500/10 to-pink-500/30"
        />
      </div>

      {/* Overview */}
      <div className="bg-white rounded-2xl shadow p-8">
        <h3 className="text-xl font-semibold mb-4">System Overview</h3>
        <p className="text-gray-600">
          RMS provides centralized management of incoming and outgoing letters
          with real-time tracking, status updates, and secure document storage.
        </p>
      </div>
    </div>
  );
}

/* Reusable Card Component */
function StatCard({ title, value, icon, color }) {
  return (
    <div
      className={`rounded-2xl bg-gradient-to-br ${color} p-6 shadow hover:shadow-xl hover:scale-[1.02] transition`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-700 font-medium">{title}</p>
          <h3 className="text-4xl font-bold text-gray-900 mt-2">
            {value}
          </h3>
        </div>
        <div className="bg-white/70 p-3 rounded-xl">{icon}</div>
      </div>
    </div>
  );
}

export default Home;
