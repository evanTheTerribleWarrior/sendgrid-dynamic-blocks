import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import UpdateMultiple from './UpdateMultiple/UpdateMultiple';
import UpdateSingle from './UpdateSingle/UpdateSingle';

const tabContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  
  const contentStyle = {
    //width: '400px',
  };
  

const TemplatePrep = ({ selectedBlock, selectedTemplates, selectedVersions }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div style={tabContainerStyle}>
      <div style={contentStyle}>
        <Tabs value={selectedTab} onChange={handleTabChange} centered variant='fullWidth'>
          <Tab label="Update Single" />
          <Tab label="Update Multiple" />
        </Tabs>
        <Box>
          {selectedTab === 0 && <UpdateSingle 
                            selectedBlock={selectedBlock}
                            selectedTemplates={selectedTemplates} 
                            selectedVersions={selectedVersions}
                        />}
          {selectedTab === 1 && <UpdateMultiple 
                            selectedBlock={selectedBlock}
                            selectedTemplates={selectedTemplates} 
                            selectedVersions={selectedVersions}
                        />}
        </Box>
      </div>
    </div>
  );
}

export default TemplatePrep;
