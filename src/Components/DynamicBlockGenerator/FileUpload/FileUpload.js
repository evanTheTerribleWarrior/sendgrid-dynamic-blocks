import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';

const fileUploadStyle = {
  border: '4px dashed #aaa',
  padding: '32px',
  textAlign: 'center',
  cursor: 'pointer',
  marginTop: '20px'
};

const FileUpload = ({onFileUpload}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  useEffect(() => {
    if (selectedFile) {
      handleFileUpload(selectedFile);
    }
  }, [selectedFile]);

  const handleFileSelect = (event) => {
    if(event.target.files)
      setSelectedFile(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    setSelectedFile(event.dataTransfer.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();

      // Callback function when file reading is complete
      reader.onload = (event) => {
        const htmlContent = event.target.result;
        console.log(htmlContent)
        onFileUpload(htmlContent);
      };

      // Read the file as text
      reader.readAsText(selectedFile);
    }
  };

  return (
    <Paper
      style={{
        ...fileUploadStyle,
        borderColor: isDragOver ? 'green' : '',
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      >
      <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
        Select file or drag and drop here
        <input
          id="file-upload"
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileSelect}
        />
      </label>
    </Paper>
  );
};

export default FileUpload;
