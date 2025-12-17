import { FileText, Users, Clock, Inbox, Send } from "lucide-react";

function Home() {
  const stats = [
    {
      title: "Total Records",
      value: "1,245",
      icon: <FileText className="text-blue-500" size={28} />,
      color: "from-blue-500/10 to-blue-500/30",
    },
    {
      title: "Active Users",
      value: "312",
      icon: <Users className="text-green-500" size={28} />,
      color: "from-green-500/10 to-green-500/30",
    },
    {
      title: "Pending Letter",
      value: "27",
      icon: <Clock className="text-yellow-500" size={28} />,
      color: "from-yellow-500/10 to-yellow-500/30",
    },
  ];

  const letterStats = [
    {
      title: "Incoming Letters",
      value: "780",
      icon: <Inbox className="text-purple-500" size={28} />,
      color: "from-purple-500/10 to-purple-500/30",
    },
    {
      title: "Outgoing Letters",
      value: "465",
      icon: <Send className="text-pink-500" size={28} />,
      color: "from-pink-500/10 to-pink-500/30",
    },
  ];

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Welcome Header */}
      <div>
        <h2 className="text-1xl font-semibold mb-1">RMS Dashboard</h2>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {stats.map((card) => (
          <div
            key={card.title}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.color} p-6 shadow hover:shadow-xl hover:scale-[1.02] transition-all`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 font-medium">
                  {card.title}
                </p>
                <h3 className="text-4xl font-bold text-gray-900 mt-2">
                  {card.value}
                </h3>
              </div>
              <div className="bg-white/70 p-3 rounded-xl">
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Letter Archive Cards */}
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
        Letter Archive
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {letterStats.map((card) => (
          <div
            key={card.title}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.color} p-6 shadow hover:shadow-xl hover:scale-[1.02] transition-all`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 font-medium">
                  {card.title}
                </p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  {card.value}
                </h3>
              </div>
              <div className="bg-white/70 p-3 rounded-xl">
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Overview Section */}
      <div className="bg-white rounded-2xl shadow p-8 transition-all">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          System Overview
        </h3>
        <p className="text-gray-600 leading-relaxed">
          The RMS Dashboard provides a centralized platform for managing
          organizational records, user activity, and report generation.
          Navigate using the sidebar to access different modules and track
          updates in real-time.
        </p>
      </div>
    </div>
  );
}

export default Home;