import React from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import "./styles.scss"; // Importez le fichier Sass pour les styles
import { IconButtonProps } from "./types";

const FileUploadButton = forwardRef(
  ({ onChange, disabled }: IconButtonProps, ref) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null); // Référence pour l'élément input

    // Exposer la référence de l'input fichier aux composants parents
    useImperativeHandle(ref, () => ({
      click: () => {
        if (!disabled) {
          fileInputRef.current?.click(); // Simule un clic sur l'input caché
        }
      },
    }));
    return (
      <div>
        <input
          type="file"
          ref={fileInputRef}
          accept=".csv"
          onChange={onChange}
          style={{ display: "none" }}
          aria-label="Upload CSV file"
        />
        <div
          className={`file-upload-button ${disabled ? "disabled" : ""}`}
          onClick={() => !disabled && fileInputRef.current?.click()}
          role="button"
          aria-disabled={disabled}
        >
          <span className="icon">+</span>
          <span className="text">Choisir un fichier</span>
        </div>
      </div>
    );
  }
);

export default FileUploadButton;
