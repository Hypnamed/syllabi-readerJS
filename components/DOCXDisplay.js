"use client";
import { useState, useRef } from "react";
import mammoth from "mammoth";

const DocxDisplay = () => {
  const [text, setText] = useState("");
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setText("");
    setErrorMessage("");

    if (selectedFile) {
      setIsLoading(true);
      const reader = new FileReader();

      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target.result;
          const result = await mammoth.convertToHtml({
            arrayBuffer: arrayBuffer,
          });
          setText(result.value);
        } catch (error) {
          setErrorMessage(`Error reading DOCX: ${error}`);
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
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleButtonClick}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Select DOCX File"}
      </button>
      <input
        type="file"
        accept=".docx"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />

      {errorMessage && (
        <div className="mt-4 text-red-500 font-semibold">{errorMessage}</div>
      )}

      <div className="mt-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-2">
          Extracted Content [DOCX]:
        </h2>
        <div
          className="bg-gray-100 p-4 rounded-md overflow-auto whitespace-pre-wrap font-mono text-sm"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    </div>
  );
};

export default DocxDisplay;
