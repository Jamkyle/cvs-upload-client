import { useState } from "react";
import { api } from "@/api";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/components/Form/types";

export const useUploadFile = () => {
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const uploadFile = async (file: File | null) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("csvfile", file);

    try {
      const response = await api.post("/upload", formData, {
        onUploadProgress: (progressEvent) => {
          setLoading(true);
          const total = progressEvent.total ?? 0;
          const current = progressEvent.loaded;
          setProgress(Math.round((current / total) * 100));
        },
        responseType: "blob",
      });
      setLoading(false);
      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadUrl(blobUrl);
      setSuccessMessage("File processed successfully!");
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error: unknown) => {
    const axiosError = error as AxiosError<ErrorResponse>;
    setErrorMessage(
      axiosError.response?.data?.message ||
        axiosError.message ||
        "Error uploading file"
    );
  };

  return {
    progress,
    errorMessage,
    successMessage,
    downloadUrl,
    setErrorMessage,
    uploadFile,
    resetMessages: () => {
      setErrorMessage("");
      setSuccessMessage("");
      setDownloadUrl(null);
      setProgress(0);
    },
    loading
  };
};
