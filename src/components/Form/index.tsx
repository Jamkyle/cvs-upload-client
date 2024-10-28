import React from "react";
import Progressbar from "@/components/Progressbar";
import FileUploadButton from "@/components/IconButton";
import { useUploadFile } from "@/hooks/useUploadFile";
import "./styles.scss";
import SpinLoader from "@/components/SpinLoader";

const CsvUploadForm: React.FC = () => {
  const {
    progress,
    errorMessage,
    successMessage,
    downloadUrl,
    setErrorMessage,
    uploadFile,
    resetMessages,
    loading,
  } = useUploadFile();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    resetMessages();

    if (selectedFile) {
      if (selectedFile.type === "text/csv") {
        uploadFile(selectedFile);
      } else {
        setErrorMessage("Invalid file type. Please upload a CSV file.");
      }
    } else {
      setErrorMessage("No file selected. Please select a CSV file.");
    }
  };

  return (
    <div className="form-upload">
      <h1>Upload CSV File</h1>
      <FileUploadButton onChange={handleFileChange} disabled={loading} />
      {/* Progress Bar */}
      {progress > 0 && <Progressbar progress={progress} />}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {!downloadUrl && loading && <SpinLoader />}
      {downloadUrl && (
        <div>
          <a
            href={downloadUrl}
            download={`csv-gender-${Date.now()}.zip`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="download file"
          >
            Télécharger le fichier
          </a>
        </div>
      )}
    </div>
  );
};

export default CsvUploadForm;
