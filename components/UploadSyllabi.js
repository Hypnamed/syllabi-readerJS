"use client";
import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

const UploadSyllabi = ({ onEventsExtracted }) => {
  const t = useTranslations("UploadComponent");
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      let allExtractedEvents = [];

      for (const file of files) {
        let extractedText = "";

        if (
          file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          const arrayBuffer = await file.arrayBuffer();
          const result = await mammoth.extractRawText({ arrayBuffer });
          extractedText = result.value.trim();
        } else if (file.type === "application/pdf") {
          const arrayBuffer = await file.arrayBuffer();
          const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            extractedText +=
              content.items.map((item) => item.str).join(" ") + "\n";
          }
        } else {
          throw new Error(t("unsupported"));
        }

        const res = await fetch("/api/extractDates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ syllabusText: extractedText }),
        });

        const data = await res.json();

        if (res.ok) {
          allExtractedEvents.push(...data); // Merge into one mega list
        } else {
          throw new Error(data.error || t("failedToExtract"));
        }
      }

      allExtractedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
      onEventsExtracted(allExtractedEvents); // Send all events to parent
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
        className="bg-primary text-white font-bold py-2 px-4 rounded"
        disabled={isLoading}
      >
        {isLoading ? t("extracting") : t("button")}
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".docx,.pdf"
        multiple
      />
      {errorMessage && <p className="text-destructive mt-2">{errorMessage}</p>}
    </div>
  );
};

export default UploadSyllabi;
