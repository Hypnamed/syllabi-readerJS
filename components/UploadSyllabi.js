"use client";
import { useState, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

const UploadSyllabi = ({ onEventsExtracted }) => {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      let extractedText = "";

      if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        // Handle DOCX
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        extractedText = result.value.trim();
      } else if (file.type === "application/pdf") {
        // Handle PDF
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          extractedText +=
            content.items.map((item) => item.str).join(" ") + "\n";
        }
      } else {
        throw new Error("Unsupported file type. Please upload a PDF or DOCX.");
      }

      const res = await fetch("/api/extractDates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ syllabusText: extractedText }),
      });

      const data = await res.json();

      if (res.ok) {
        onEventsExtracted(data); // pass events to parent component
      } else {
        throw new Error(data.error || "Failed to extract events");
      }
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => fileInputRef.current.click()}
        className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
        disabled={isLoading}
      >
        {isLoading ? "Extracting..." : "Upload Syllabus (PDF/DOCX)"}
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".docx,.pdf"
      />
      {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
    </div>
  );
};

export default UploadSyllabi;
