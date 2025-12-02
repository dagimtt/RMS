import { useState } from "react";
import { Upload } from "lucide-react";

function AddIncoming() {
  const [formData, setFormData] = useState({
    ref_num: "",
    from: "",
    to: "",
    subject: "",
    date: "",
    description: "",
    scan: null,
  });

  const [loading, setLoading] = useState(false); // Track form submission
  const [error, setError] = useState(null); // Track errors
  const [success, setSuccess] = useState(null); // Track success

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const data = new FormData();
      data.append("ref_num", formData.ref_num);
      data.append("from", formData.from);
      data.append("to", formData.to);
      data.append("subject", formData.subject);
      data.append("date", formData.date);
      data.append("description", formData.description);
      if (formData.scan) data.append("scan", formData.scan);

      const res = await fetch("http://localhost:5000/api/letters", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to submit letter");
      }

      const result = await res.json();
      setSuccess(result.message);
      setFormData({
        ref_num: "",
        from: "",
        to: "",
        subject: "",
        date: "",
        description: "",
        scan: null,
      });
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-6">
        Add Incoming Letter
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 max-w-3xl mx-auto space-y-6"
      >
        {/* Ref Number & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Ref Number</label>
            <input
              type="text"
              name="ref_num"
              value={formData.ref_num}
              onChange={handleChange}
              placeholder="Enter reference number"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
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
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* From & To */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">From</label>
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleChange}
              placeholder="Sender name"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
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
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter subject"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Description / Remark</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write short description or remark..."
            rows="4"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Scan Document</label>
          <label className="flex items-center justify-center w-full px-4 py-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:border-blue-500 transition">
            <Upload className="text-blue-500 mr-2" />
            <span className="text-gray-600 dark:text-gray-300">
              {formData.scan ? formData.scan.name : "Upload scanned file"}
            </span>
            <input type="file" name="scan" onChange={handleChange} className="hidden" />
          </label>
        </div>

        {/* Success/Error Messages */}
        {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
        {success && <p className="text-green-600 dark:text-green-400">{success}</p>}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Saving..." : "Save Letter"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddIncoming;
