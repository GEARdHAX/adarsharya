import React, { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

const DragDropUpload = ({ onFileSelect, previewUrl, label, id }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type !== "dragleave");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files?.[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const removeFile = (e) => {
    e.stopPropagation();
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="upload-wrapper">
      {label && <label className="upload-label">{label}</label>}

      <div
        className={`upload-zone ${dragActive ? "active" : ""} ${
          previewUrl ? "has-preview" : ""
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current.click()}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept="image/*"
          hidden
          onChange={handleChange}
        />

        {previewUrl ? (
          <div className="preview">
            <img src={previewUrl} alt="Preview" />
            <div className="preview-overlay">
              <button onClick={removeFile} className="remove-btn">
                <X size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="placeholder">
            <div className="icon-wrap">
              <ImageIcon size={26} />
            </div>
            <p className="primary-text">
              <span>Click to upload</span> or drag & drop
            </p>
            <p className="secondary-text">PNG, JPG, WEBP • Max 5MB</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DragDropUpload;
