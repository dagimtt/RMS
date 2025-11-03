import { useState } from "react";
import { Upload } from "lucide-react";

function AddOutgoing() {
  const [formData, setFormData] = useState({
    ref_num: "",
    from: "",
    to: "",
    subject: "",
    date: "",
    description: "",
    scan: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Outgoing Letter Submitted:", formData);
    alert("Outgoing letter added successfully!");
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-6">
        Add Outgoing Letter
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 max-w-3xl mx-auto space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Ref Number</label>
            <input
              type="text"
              name="ref_num"
              value={formData.ref_num}
              onChange={handleChange}
              placeholder="Enter reference number"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">From</label>
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleChange}
              placeholder="Sender name"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">To</label>
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleChange}
              placeholder="Recipient name"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter subject"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Description / Remark</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write short description or remark..."
            rows="4"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Scan Document</label>
          <label className="flex items-center justify-center w-full px-4 py-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:border-indigo-500 transition">
            <Upload className="text-indigo-500 mr-2" />
            <span className="text-gray-600 dark:text-gray-300">
              {formData.scan ? formData.scan.name : "Upload scanned file"}
            </span>
            <input type="file" name="scan" onChange={handleChange} className="hidden" />
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Save Letter
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddOutgoing;
