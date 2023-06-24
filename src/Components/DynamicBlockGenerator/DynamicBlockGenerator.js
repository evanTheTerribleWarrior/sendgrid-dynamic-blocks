import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@mui/material';
import CodeRenderer from './CodeRenderer/CodeRenderer'; 
import FolderTree from '../FolderTree/FolderTree';

const DynamicBlockGenerator = () => {

    const [selectedTemplates, setSelectedTemplates] = useState([]);
    const [selectedVersions, setSelectedVersions] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [generatedBlock, setGeneratedBlock] = useState([]);
    const [saveDialogOpen, setSaveDialogOpen] = useState(false);

    const folderStructure = useSelector((state) => state.folderStructure);
    
    const handleSaveDynamicBlock = () => {

    }

    const handleSaveDialogOpen = () => {
      setSaveDialogOpen(true)
    }

    const handleSaveDialogClose = () => {
      setSaveDialogOpen(false);
    };
    
    const handleGeneratedDynamicBlock = (dynamicBlock) => {
      setGeneratedBlock(dynamicBlock)
    }

  const DialogRenderer = () => {
    return (
      <Dialog open={saveDialogOpen} onClose={handleSaveDialogClose}>
        <DialogTitle>Save Block</DialogTitle>
        <DialogContent>
          {folderStructure && <FolderTree folderStructure={folderStructure.folderStructure} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveDialogClose}>Cancel</Button>
          <Button onClick={handleSaveDynamicBlock} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
  
      <Box>
        <CodeRenderer onGenerateDynamicBlock={handleGeneratedDynamicBlock} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveDialogOpen}
          sx={{ position: 'fixed', top: 80, right: 16 }}
        >
          Save
        </Button>
        <DialogRenderer/>
      </Box>
  );
};

export default DynamicBlockGenerator;