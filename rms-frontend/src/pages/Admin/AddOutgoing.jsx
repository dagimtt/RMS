import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { useLocation } from "react-router-dom";

function AddOutgoing() {
  const location = useLocation();

  // If redirected from reply button, we get reply_num from state
  const incomingReplyNum = location.state?.reply_num || "";

  const [formData, setFormData] = useState({
    reply_num: incomingReplyNum, // pre-fill if replying
    ref_num: "",
    from: "",
    to: "",
    subject: "",
    date: "", // <-- date added here
    description: "",
    scan: null,
  });

  useEffect(() => {
    // If no reply_num (manual new outgoing), generate random 1-10000
    if (!incomingReplyNum) {
      const randomNum = Math.floor(Math.random() * 10000) + 1;
      setFormData((prev) => ({ ...prev, reply_num: randomNum }));
    }
  }, [incomingReplyNum]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.date) {
      alert("Please select a date!");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) data.append(key, formData[key]);
    });

    try {
      const res = await fetch("http://localhost:5000/api/outgoing", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      alert(json.message);
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to add outgoing letter");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
        Add Outgoing Letter
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto space-y-6"
      >
        {/* Reply and Ref Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Reply Number</label>
            <input
              type="text"
              name="reply_num"
              value={formData.reply_num}
              readOnly={!!incomingReplyNum} 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-900 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Ref Number</label>
            <input
              type="text"
              name="ref_num"
              value={formData.ref_num}
              onChange={handleChange}
              placeholder="Enter reference number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        {/* From and To */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">From</label>
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleChange}
              placeholder="Sender name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">To</label>
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleChange}
              placeholder="Recipient name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        {/* Subject and Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-2">Description / Remark</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write short description or remark..."
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        {/* Scan Upload */}
        <div>
          <label className="block text-gray-700 mb-2">Scan Document</label>
          <label className="flex items-center justify-center w-full px-4 py-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition">
            <Upload className="text-indigo-500 mr-2" />
            <span className="text-gray-600">
              {formData.scan ? formData.scan.name : "Upload scanned file"}
            </span>
            <input type="file" name="scan" onChange={handleChange} className="hidden" />
          </label>
        </div>

        {/* Submit Button */}
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
