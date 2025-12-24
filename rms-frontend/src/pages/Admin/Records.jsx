import { useEffect, useState } from "react";
import { Search } from "lucide-react";

function Records() {
  const [filters, setFilters] = useState({
    query: "",
    letter_type: "",
    status: "",
  });

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // -------------------------
  // Fetch Incoming + Outgoing
  // -------------------------
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const [incomingRes, outgoingRes] = await Promise.all([
          fetch("http://localhost:5000/api/letters"),
          fetch("http://localhost:5000/api/outgoing"),
        ]);

        const incoming = await incomingRes.json();
        const outgoing = await outgoingRes.json();

        const incomingMapped = incoming.map((l) => ({
          id: l.id,
          reply_num: l.reply_num, // Incoming has no reply number
          ref_num: l.ref_num,
          from: l.from_person,
          to: l.to_person,
          main_idea: l.main_idea,
          letter_type: "Incoming",
          status: l.status,
        }));

        const outgoingMapped = outgoing.map((o) => ({
          id: o.id,
          reply_num: o.reply_num,
          ref_num: o.ref_num,
          from: o.from_person,
          to: o.to_person,
          main_idea: o.main_idea,
          letter_type: "Outgoing",
          status: o.status || "Sent",
        }));

        setRecords([...incomingMapped, ...outgoingMapped]);
        setLoading(false);
      } catch (err) {
        console.error("Error loading records:", err);
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  // -------------------------
  // Filters
  // -------------------------
  const filteredRecords = records.filter((r) => {
    const q = filters.query.toLowerCase();
    return (
      (r.ref_num?.toLowerCase().includes(q) ||
        r.from?.toLowerCase().includes(q) ||
        r.to?.toLowerCase().includes(q) ||
        r.main_idea?.toLowerCase().includes(q)) &&
      r.letter_type.toLowerCase().includes(filters.letter_type.toLowerCase()) &&
      r.status.toLowerCase().includes(filters.status.toLowerCase())
    );
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const statusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  if (loading) {
    return <div className="p-6 text-gray-500">Loading records...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
        Records
      </h2>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Filters */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="relative lg:col-span-2">
              <Search size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="query"
                placeholder="Search by Ref, From, To, Subject"
                value={filters.query}
                onChange={handleChange}
                className="w-full pl-10 py-2 rounded-lg border"
              />
            </div>

            <div className="flex gap-2">
              <select
                name="letter_type"
                value={filters.letter_type}
                onChange={handleChange}
                className="w-1/2 py-2 px-3 rounded-lg border"
              >
                <option value="">All Types</option>
                <option value="Incoming">Incoming</option>
                <option value="Outgoing">Outgoing</option>
              </select>

              <select
                name="status"
                value={filters.status}
                onChange={handleChange}
                className="w-1/2 py-2 px-3 rounded-lg border"
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <tr>
                {[
                  "ID",
                  "Reply Num",
                  "Ref Num",
                  "From",
                  "To",
                  "Subject",
                  "Type",
                  "Status",
                ].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-sm font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y">
              {filteredRecords.length ? (
                filteredRecords.map((r, idx) => (
                  <tr
                    key={`${r.letter_type}-${r.id}`}
                    className={`${idx % 2 === 0 ? "bg-gray-50" : ""} hover:bg-gray-100`}
                  >
                    <td className="px-6 py-4">{r.id}</td>
                    <td className="px-6 py-4">{r.reply_num}</td>
                    <td className="px-6 py-4">{r.ref_num}</td>
                    <td className="px-6 py-4">{r.from}</td>
                    <td className="px-6 py-4">{r.to}</td>
                    <td className="px-6 py-4">{r.main_idea}</td>
                    <td className="px-6 py-4">{r.letter_type}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(
                          r.status
                        )}`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-6 text-center text-gray-500">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Records;
