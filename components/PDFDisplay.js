"use client";
import { useState, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.mjs`;

const PdfDisplayEnhanced = () => {
  const [plainText, setPlainText] = useState(""); // For sending to the API
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [events, setEvents] = useState([]); // Store extracted events

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setPlainText("");
    setErrorMessage("");
    setEvents([]);

    if (selectedFile) {
      setIsLoading(true);
      const reader = new FileReader();

      reader.onload = async (e) => {
        try {
          const pdf = await pdfjsLib.getDocument(
            new Uint8Array(e.target.result)
          ).promise;
          let fullText = "";

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            textContent.items.forEach((item) => {
              if (item.str) {
                fullText += `${item.str}\n`; // Collect plain text
              }
            });
          }

          setPlainText(fullText); // Store plain text for API
          await handleExtractDates(fullText); // Automatically extract dates
        } catch (error) {
          setErrorMessage(`Error reading PDF: ${error}`);
        } finally {
          setIsLoading(false);
        }
      };

      reader.readAsArrayBuffer(selectedFile);
    }
  };

  const handleExtractDates = async (text) => {
    if (!text) {
      setErrorMessage("No text extracted from the PDF.");
      return;
    }

    try {
      const res = await fetch("/api/extractDates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ syllabusText: text }),
      });

      const data = await res.json();
      if (res.ok) {
        setEvents(data);
        console.log("📅 Extracted Events:", data);
      } else {
        throw new Error(data.error || "Failed to extract events");
      }
    } catch (error) {
      setErrorMessage(`API Error: ${error.message}`);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center p-6">
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleButtonClick}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Select PDF File"}
      </button>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />

      {errorMessage && (
        <div className="mt-4 text-red-500 font-semibold">{errorMessage}</div>
      )}

      {events.length > 0 && (
        <div className="mt-6 w-full max-w-lg">
          <h2 className="text-xl font-semibold mb-2">Extracted Events:</h2>
          <ul className="list-disc list-inside bg-white rounded p-4 shadow">
            {events.map((event, index) => (
              <li key={index}>
                <strong>{event.title}</strong> — {event.date}
                {event.description && `: ${event.description}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PdfDisplayEnhanced;
