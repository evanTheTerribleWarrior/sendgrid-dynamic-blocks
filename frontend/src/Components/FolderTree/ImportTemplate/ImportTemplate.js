import React, { useRef, useState } from 'react';
import { Button } from '@mui/material';

const ImportTemplate = ({onImportedFile}) => {

  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);


  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        resolve(content);
      };
      reader.onerror = (event) => {
        reject(event.target.error);
      };
      reader.readAsText(file);
    });
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file)
      const importedContent = await readFileContent(file);
      const extractedContent = extractContent(importedContent)
      onImportedFile({
        name: file.name,
        type: "file",
        content: extractedContent
      })
    }

  };

  const extractContent = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    const preheaderTable = doc.querySelector('table[data-type="preheader"]');
    if (!preheaderTable) {
      console.log('Invalid template format: No preheader table found');
      return null;
    }

    const siblings = [];
    let currentNode = preheaderTable.nextElementSibling;

    while (currentNode) {
      siblings.push(currentNode);
      currentNode = currentNode.nextElementSibling;
    }
    const extractedHTML = siblings.map((table) => table.outerHTML);
    return extractedHTML.join('');
  };

  const handleButtonClick = () => {
    fileInputRef.current.value = null;
    fileInputRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        accept=".html"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImport}
      />
      <Button variant="outlined" size="small" sx={{marginLeft: "10px"}} onClick={handleButtonClick}>
        Import Template
      </Button>
    </div>
  );
};

export default ImportTemplate;
