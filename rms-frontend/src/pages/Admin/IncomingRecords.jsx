import { useState } from "react";
import { Eye, Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function IncomingRecords() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    query: "",
    status: "",
  });

  const records = [
    {
      id: 1,
      ref_num: "REF001",
      from: "Alice",
      to: "Bob",
      main_idea: "Project Update",
      letter_type: "Incoming",
      status: "Pending",
    },
    {
      id: 2,
      ref_num: "REF003",
      from: "Eve",
      to: "Frank",
      main_idea: "Meeting Schedule",
      letter_type: "Incoming",
      status: "Rejected",
    },
    {
      id: 3,
      ref_num: "REF005",
      from: "David",
      to: "Emma",
      main_idea: "Report Submission",
      letter_type: "Incoming",
      status: "Approved",
    },
  ];

  // Filter logic
  const filteredRecords = records.filter((record) => {
    const q = filters.query.toLowerCase();
    return (
      record.letter_type === "Incoming" &&
      (record.ref_num.toLowerCase().includes(q) ||
        record.from.toLowerCase().includes(q) ||
        record.to.toLowerCase().includes(q) ||
        record.main_idea.toLowerCase().includes(q)) &&
      record.status.toLowerCase().includes(filters.status.toLowerCase())
    );
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    navigate("/add-incoming");
  };

  const statusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
      case "Rejected":
        return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100";
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100";
    }
  };

  return (
    <div className="p-6">
      {/* Header and Add Button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white">
          Incoming Letters
        </h2>
        <button
          onClick={handleAddClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <Plus size={18} /> Add Letter
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            View and manage all incoming letters
          </p>

          {/* Filter Bar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="relative lg:col-span-2">
              <Search
                size={18}
                className="absolute left-3 top-3 text-gray-400"
              />
              <input
                type="text"
                name="query"
                placeholder="Search by Ref Number, From, To, or Main Idea"
                value={filters.query}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <select
              name="status"
              value={filters.status}
              onChange={handleChange}
              className="w-full py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <tr>
                {[
                  "ID",
                  "Ref_num",
                  "From",
                  "To",
                  "Main idea",
                  "Status",
                  "Action",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record, idx) => (
                  <tr
                    key={record.id}
                    className={`${
                      idx % 2 === 0
                        ? "bg-gray-50 dark:bg-gray-800"
                        : ""
                    } hover:bg-gray-100 dark:hover:bg-gray-700`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {record.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {record.ref_num}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {record.from}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {record.to}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {record.main_idea}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(
                          record.status
                        )}`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg flex items-center justify-center"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                  >
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

export default IncomingRecords;
