import { useState } from "react";
import { Search, Eye, Download } from "lucide-react";

export default function DirectorIncoming() {
  const [searchTerm, setSearchTerm] = useState("");

  const letters = [
    {
      id: 1,
      reference: "IMM/2025/001",
      subject: "Request for Document Verification",
      sender: "Addis Ababa Immigration Office",
      date: "Nov 2, 2025",
      file: "/sample-letter.pdf",
    },
    {
      id: 2,
      reference: "IMM/2025/002",
      subject: "Follow-up on Passport Renewal",
      sender: "Dire Dawa Branch",
      date: "Nov 1, 2025",
      file: "/passport-renewal.pdf",
    },
    {
      id: 3,
      reference: "IMM/2025/003",
      subject: "Visa Application Review",
      sender: "Mekelle Immigration Office",
      date: "Oct 30, 2025",
      file: "/visa-review.pdf",
    },
  ];

  const filteredLetters = letters.filter(
    (letter) =>
      letter.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      letter.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      letter.sender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (file) => {
    const link = document.createElement("a");
    link.href = file;
    link.download = file.split("/").pop();
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">
          Incoming Letters
        </h2>
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search letters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead className="bg-white border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                #
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Reference
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Sender
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Date
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredLetters.length > 0 ? (
              filteredLetters.map((letter, index) => (
                <tr
                  key={letter.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-800 font-medium">
                    {letter.reference}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {letter.subject}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {letter.sender}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {letter.date}
                  </td>
                  <td className="px-6 py-3 text-center flex justify-center gap-3">
                    <button
                      onClick={() =>
                        alert(`Viewing details for ${letter.reference}`)
                      }
                      className="flex items-center gap-1 px-3 py-1 border border-gray-300 bg-white text-gray-700 text-sm rounded-full hover:shadow-md hover:bg-gray-100 transition"
                    >
                      <Eye size={16} /> View
                    </button>
                    <button
                      onClick={() => handleDownload(letter.file)}
                      className="flex items-center gap-1 px-3 py-1 border border-gray-300 bg-white text-gray-700 text-sm rounded-full hover:shadow-md hover:bg-gray-100 transition"
                    >
                      <Download size={16} /> Download
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500 text-sm"
                >
                  No letters found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-center text-sm text-gray-500">
        Showing {filteredLetters.length} of {letters.length} total letters
      </p>
    </div>
  );
}
