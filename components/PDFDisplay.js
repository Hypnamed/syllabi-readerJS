"use client";
import { useState, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.mjs`;

const PdfDisplayEnhanced = () => {
  const [htmlContent, setHtmlContent] = useState("");
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isLikelyTitle = (item) => {
    // Implement your logic here based on font size (if available),
    // position, formatting, etc. This is a heuristic approach.
    return item.height > 15; // Example: lines with larger height might be titles
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setHtmlContent("");
    setErrorMessage("");

    if (selectedFile) {
      setIsLoading(true);
      const reader = new FileReader();

      reader.onload = async (e) => {
        try {
          const pdf = await pdfjsLib.getDocument(
            new Uint8Array(e.target.result)
          ).promise;
          let fullHtml = "";

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            textContent.items.forEach((item) => {
              if (item.str) {
                if (isLikelyTitle(item)) {
                  fullHtml += `<h2 class="text-xl font-bold mt-4">${item.str}</h2>`;
                } else {
                  fullHtml += `<p class="mb-2">${item.str}</p>`;
                }
              }
            });
          }
          setHtmlContent(fullHtml);
        } catch (error) {
          setErrorMessage(`Error reading PDF: ${error}`);
        } finally {
          setIsLoading(false);
        }
      };

      reader.readAsArrayBuffer(selectedFile);
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

      <div className="mt-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-2">Extracted Content [PDF]:</h2>
        <div
          className="bg-gray-100 p-4 rounded-md overflow-auto whitespace-pre-wrap font-mono text-sm"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
};

export default PdfDisplayEnhanced;
