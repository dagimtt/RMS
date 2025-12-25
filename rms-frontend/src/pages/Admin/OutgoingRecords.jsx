import { useState, useEffect } from "react";
import { Eye, Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function OutgoingRecords() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({ query: "", status: "" });
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch outgoing letters
  useEffect(() => {
    const fetchOutgoing = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/outgoing");
        const data = await res.json();
        setRecords(data);
      } catch (err) {
        console.error("Failed to fetch outgoing letters:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOutgoing();
  }, []);

  // Filter logic
  const filteredRecords = records.filter((record) => {
    const q = filters.query.toLowerCase();

    const matchesQuery =
      record.ref_num?.toLowerCase().includes(q) ||
      record.from_person?.toLowerCase().includes(q) ||
      record.to_person?.toLowerCase().includes(q) ||
      record.main_idea?.toLowerCase().includes(q);

    const matchesStatus =
      !filters.status ||
      record.status?.toLowerCase() === filters.status.toLowerCase();

    return matchesQuery && matchesStatus;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => navigate("/admin/add-outgoing");

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

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-extrabold text-gray-800">
          Outgoing Letters
        </h2>
        <button
          onClick={handleAddClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <Plus size={18} /> Add Letter
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Filters */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="relative lg:col-span-2">
              <Search size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="query"
                placeholder="Search by Ref, From, To, or Subject"
                value={filters.query}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              name="status"
              value={filters.status}
              onChange={handleChange}
              className="w-full py-2 px-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-center py-6 text-gray-500">Loading...</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                <tr>
                  {["ID", "Ref_num", "From", "To", "Subject", "Status", "Action"].map(
                    (header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-sm font-semibold uppercase"
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record, idx) => (
                    <tr
                      key={record.id}
                      className={`${idx % 2 === 0 ? "bg-gray-50" : ""} hover:bg-gray-100`}
                    >
                      <td className="px-6 py-4 text-sm">{record.id}</td>
                      <td className="px-6 py-4 text-sm">{record.ref_num}</td>
                      <td className="px-6 py-4 text-sm">{record.from_person}</td>
                      <td className="px-6 py-4 text-sm">{record.to_person}</td>
                      <td className="px-6 py-4 text-sm">{record.main_idea}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(
                            record.status
                          )}`}
                        >
                          {record.status || "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() =>
                            navigate(`/admin/outgoing-detail/${record.id}`)
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-6 text-gray-500">
                      No matching records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default OutgoingRecords;
