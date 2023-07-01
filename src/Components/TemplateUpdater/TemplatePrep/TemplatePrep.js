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
    <UpdateMultiple 
                            selectedBlock={selectedBlock}
                            selectedTemplates={selectedTemplates} 
                            selectedVersions={selectedVersions}
                        />
    
  );
}

export default TemplatePrep;
