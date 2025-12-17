import { useState } from "react";
import { Eye, Search } from "lucide-react";

function Records() {
  const [filters, setFilters] = useState({
    query: "",
    letter_type: "",
    status: "",
  });

  const records = [
    { id: 1, ref_num: "REF001", from: "Alice", to: "Bob", main_idea: "Project Update", letter_type: "Incoming", action: "Review", status: "Pending" },
    { id: 2, ref_num: "REF002", from: "Charlie", to: "David", main_idea: "Budget Approval", letter_type: "Outgoing", action: "Approve", status: "Approved" },
    { id: 3, ref_num: "REF003", from: "Eve", to: "Frank", main_idea: "Meeting Schedule", letter_type: "Incoming", action: "Schedule", status: "Rejected" },
    { id: 4, ref_num: "REF004", from: "Grace", to: "Henry", main_idea: "Policy Review", letter_type: "Outgoing", action: "View", status: "Pending" },
  ];

  // Combined search filter
  const filteredRecords = records.filter((record) => {
    const q = filters.query.toLowerCase();
    return (
      (record.ref_num.toLowerCase().includes(q) ||
        record.from.toLowerCase().includes(q) ||
        record.to.toLowerCase().includes(q) ||
        record.main_idea.toLowerCase().includes(q)) &&
      record.letter_type.toLowerCase().includes(filters.letter_type.toLowerCase()) &&
      record.status.toLowerCase().includes(filters.status.toLowerCase())
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

  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Records</h2>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <p className="text-gray-600 mb-4">
            Manage all stored records and document entries
          </p>

          {/* 🔍 Filter Bar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Combined Search Field */}
            <div className="relative lg:col-span-2">
              <Search size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="query"
                placeholder="Search by Ref Number, From, To, or Main Idea"
                value={filters.query}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Letter Type */}
            <div className="flex gap-2">
              <select
                name="letter_type"
                value={filters.letter_type}
                onChange={handleChange}
                className="w-1/2 py-2 px-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">All Letter Types</option>
                <option value="Incoming">Incoming</option>
                <option value="Outgoing">Outgoing</option>
              </select>

              {/* Status Filter */}
              <select
                name="status"
                value={filters.status}
                onChange={handleChange}
                className="w-1/2 py-2 px-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                {["ID", "Ref_num", "From", "To", "Main idea", "Letter Type", "Status", "Action"].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record, idx) => (
                  <tr
                    key={record.id}
                    className={`${
                      idx % 2 === 0 ? "bg-gray-50" : ""
                    } hover:bg-gray-100 transition-colors duration-200`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">{record.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{record.ref_num}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{record.from}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{record.to}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{record.main_idea}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{record.letter_type}</td>
                    
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition flex items-center justify-center"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                    No matching records found
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