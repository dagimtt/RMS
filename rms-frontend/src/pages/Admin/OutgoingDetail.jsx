import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Eye, Download, Printer } from "lucide-react";

function OutgoingDetail() {
  const { id } = useParams();
  const [letter, setLetter] = useState(null);
  const [showAttachment, setShowAttachment] = useState(false);
  const attachmentRef = useRef();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/outgoing/${id}`);
        const data = await res.json();
        setLetter(data);
      } catch (err) {
        console.error("Error fetching outgoing detail:", err);
      }
    };
    fetchDetail();
  }, [id]);

  const handlePrint = () => {
    const content = attachmentRef.current.innerHTML;
    const win = window.open("", "", "width=900,height=650");

    win.document.write(`
      <html>
        <head>
          <title>Print Attachment</title>
          <style>
            body { margin: 0; }
            img, iframe { width: 100%; height: 100vh; }
          </style>
        </head>
        <body>${content}</body>
      </html>
    `);

    win.document.close();
    win.print();
    win.close();
  };

  if (!letter) return <p className="p-6">Loading...</p>;

  const fileUrl = letter.scan_path
    ? `http://localhost:5000/${letter.scan_path}`
    : null;

  const isPdf = fileUrl?.endsWith(".pdf");

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Outgoing Letter Detail</h2>

      {/* Metadata */}
      <div className="bg-white p-6 rounded-xl shadow space-y-2">
        <p><b>Reply No:</b> {letter.reply_num}</p>
        <p><b>Ref No:</b> {letter.ref_num}</p>
        <p><b>From:</b> {letter.from_person}</p>
        <p><b>To:</b> {letter.to_person}</p>
        <p><b>Date:</b> {letter.date}</p>
        <p><b>Subject:</b> {letter.main_idea}</p>
        <p><b>Description:</b> {letter.description}</p>

        {fileUrl && (
          <button
            onClick={() => setShowAttachment(!showAttachment)}
            className="mt-4 flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            <Eye size={18} />
            {showAttachment ? "Hide Attachment" : "View Attachment"}
          </button>
        )}
      </div>

      {/* Attachment */}
      {showAttachment && (
        <>
          <div
            ref={attachmentRef}
            className="mt-6 bg-white p-4 rounded-xl shadow"
          >
            {isPdf ? (
              <iframe
                src={fileUrl}
                className="w-full h-[650px] rounded-lg border"
              />
            ) : (
              <img
                src={fileUrl}
                alt="Attachment"
                className="max-w-full rounded-lg border"
              />
            )}
          </div>

          <div className="flex gap-4 mt-4">
            <a
              href={fileUrl}
              download
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              <Download size={18} /> Download
            </a>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              <Printer size={18} /> Print Attachment
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default OutgoingDetail;
