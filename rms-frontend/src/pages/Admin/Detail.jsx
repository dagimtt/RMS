import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Download, Printer, Eye } from "lucide-react";

function Detail() {
  const { id } = useParams();
  const [letter, setLetter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAttachment, setShowAttachment] = useState(false);

  const attachmentRef = useRef();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/letters/${id}`);
        const data = await res.json();
        setLetter(data);
      } catch (err) {
        console.error("Error fetching letter detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handlePrintAttachment = () => {
    const content = attachmentRef.current.innerHTML;
    const printWindow = window.open("", "", "width=900,height=650");

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Attachment</title>
          <style>
            body { margin: 0; }
            img, iframe { width: 100%; height: 100vh; }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!letter) return <p className="p-6">No record found</p>;

  const fileUrl = `http://localhost:5000/${letter.scan_path}`;
  const isPdf = letter.scan_path?.endsWith(".pdf");

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Letter Detail</h2>

      {/* Metadata */}
      <div className="bg-white p-6 rounded-xl shadow space-y-2">
        <p><b>Ref Number:</b> {letter.ref_num}</p>
        <p><b>From:</b> {letter.from_person}</p>
        <p><b>To:</b> {letter.to_person}</p>
        <p><b>Date:</b> {letter.date}</p>
        <p><b>Status:</b> {letter.status}</p>
        <p><b>Main Idea:</b> {letter.main_idea}</p>
        <p><b>Description:</b> {letter.description}</p>

        {/* View Attachment Button */}
        {letter.scan_path && (
          <button
            onClick={() => setShowAttachment(!showAttachment)}
            className="mt-4 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
          >
            <Eye size={18} />
            {showAttachment ? "Hide Attachment" : "View Attachment"}
          </button>
        )}
      </div>

      {/* Attachment Section (Hidden initially) */}
      {showAttachment && (
        <>
          <div
            ref={attachmentRef}
            className="mt-6 bg-white p-4 rounded-xl shadow"
          >
            {isPdf ? (
              <iframe
                src={fileUrl}
                title="Attachment"
                className="w-full h-[650px] border rounded-lg"
              />
            ) : (
              <img
                src={fileUrl}
                alt="Attachment"
                className="max-w-full rounded-lg border"
              />
            )}
          </div>

          {/* Attachment Actions */}
          <div className="flex gap-4 mt-4">
            <a
              href={fileUrl}
              download
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              <Download size={18} /> Download
            </a>

            <button
              onClick={handlePrintAttachment}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              <Printer size={18} /> Print Attachment
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Detail;
