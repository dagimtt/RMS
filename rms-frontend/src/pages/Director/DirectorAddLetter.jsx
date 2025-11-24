import { useRef } from "react";
import { Printer, Save } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function DirectorAddLetter() {
  const printRef = useRef();

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const win = window.open("", "_blank");
    win.document.write(`
      <html>
        <head>
          <title>Letter Document</title>
          <style>
            @page { size: A4; margin: 20mm; }
            body {
              font-family: 'Times New Roman', serif;
              color: #333;
              line-height: 1.5;
            }
          </style>
        </head>
        <body>${printContents}</body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  const handleSavePDF = async () => {
    const element = printRef.current;

    // convert the editable letter into a canvas
    const canvas = await html2canvas(element, {
      scale: 2, // higher quality
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    // calculate dimensions for full A4 fit
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("LetterDocument.pdf");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Compose Letter
        </h2>
        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
          >
            <Printer size={18} /> Print
          </button>
          <button
            onClick={handleSavePDF}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
          >
            <Save size={18} /> Save as PDF
          </button>
        </div>
      </div>

      {/* Editable Letter Template */}
      <div className="flex justify-center">
        <div
          ref={printRef}
          className="bg-white shadow-lg rounded-lg p-12 w-[210mm] h-[297mm] border border-gray-300 overflow-auto"
          contentEditable
          suppressContentEditableWarning={true}
        >
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold">Federal Immigration Office</h1>
            <p className="text-sm text-gray-500">Addis Ababa, Ethiopia</p>
            <hr className="border-t border-gray-400 my-4" />
          </div>

          <p className="text-right mb-6">
            Date: <span className="text-gray-600">{new Date().toLocaleDateString()}</span>
          </p>

          <p className="mb-6">
            To:<br />
            <strong>Recipient Name</strong><br />
            Immigration and Citizens Service Office<br />
            Addis Ababa
          </p>

          <p className="mb-6">
            <strong>Subject:</strong>{" "}
            <span className="text-gray-700">Regarding Document Processing</span>
          </p>

          <p className="mb-6 leading-relaxed">
            Dear Sir/Madam,<br /><br />
            I am writing to inform you about the recent updates regarding the
            document distribution process. Please find the attached information
            for your reference. Your cooperation is highly appreciated.
          </p>

          <p className="leading-relaxed">
            Sincerely,<br /><br />
            <strong>Director Name</strong><br />
            Director, Immigration and Citizens Service Office
          </p>
        </div>
      </div>

      <p className="text-gray-500 text-sm text-center">
        ✏️ Click anywhere in the letter to edit.  
        🖨️ Use “Print” or “Save as PDF” to download.
      </p>
    </div>
  );
}
