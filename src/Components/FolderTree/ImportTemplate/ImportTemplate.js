import React, { useState } from 'react';
import { Button } from '@mui/material';

const ImportTemplate = ({onImportedFile}) => {

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

    const tables = Array.from(doc.querySelectorAll('table'));
    const preheaderIndex = tables.findIndex(table => table.getAttribute('data-type') === 'preheader');
  
    if (preheaderIndex !== -1) {
      const extractedContent = tables.slice(preheaderIndex + 1)
      const extractedHTML = extractedContent.map((table) => table.outerHTML);
      return extractedHTML.join('');
    } else {
      return tables;
    }
  };

  const handleButtonClick = () => {
    document.getElementById('template-upload').click();
  };

  return (
    <div>
      <input
        type="file"
        accept=".html"
        id="template-upload"
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
