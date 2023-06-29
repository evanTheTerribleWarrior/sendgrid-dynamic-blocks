import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Box, Button, Grid, TextField, Modal, Typography } from '@mui/material';
import CodeRenderer from './CodeRenderer/CodeRenderer'; 
import FolderTree from '../FolderTree/FolderTree';
import { updateFolderStructure } from '../../Redux/reducers';
import SectionHeader from '../SectionHeader/SectionHeader'

const sectionHeaderContent = {
  title: "Build Your Block",
  subtitle: "Here you can build your Sendgrid block. Use Conditions like if..else and Components like images and text. Finally save to your library"
}

const DynamicBlockGenerator = () => {

    const [generatedBlock, setGeneratedBlock] = useState([]);
    const [saveModalOpen, setSaveModalOpen] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState("")
    const [fileName, setFileName] = useState('');

    const folderStructure = useSelector((state) => state.folderStructure);
    const dispatch = useDispatch()
    
    const handleSaveDynamicBlock = () => {

      const updatedStructure = folderStructure.folderStructure.map((folder) => {
        if (folder.id === selectedFolder.id) {
          return {
            ...folder,
            children: [...folder.children, { id: uuid(), type: 'file', name: fileName + ".html", content: generatedBlock }],
          };
        }
        return folder;
      });
      dispatch(updateFolderStructure(updatedStructure));
      handleSaveModalClose()
    }

    const handleOnFolderSelected = (folder) => {
      console.table(folder)
      setSelectedFolder(folder)
    }

    const handleFileNameChange = (e) => {
      setFileName(e.target.value);
    };

    const handleSaveModalOpen = () => {
      setSaveModalOpen(true)
    }

    const handleSaveModalClose = () => {
      setSaveModalOpen(false);
    };
    
    const handleGeneratedDynamicBlock = (dynamicBlock) => {
      setGeneratedBlock(dynamicBlock)
    }

    const DialogRenderer = () => {
    return (
      
      <Modal scrollable={true} open={saveModalOpen} onClose={handleSaveModalClose}>
        
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          maxWidth: 400,
          width: '100%',
          outline: 'none',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Choose Folder
        </Typography>
        {folderStructure && <FolderTree onFolderSelected={handleOnFolderSelected} showFiles={false}/>}
        <Typography variant="h6" gutterBottom>
          Save File
        </Typography>
        <TextField
          key="text-field-key"
          label="File Name"
          value={fileName}
          onChange={handleFileNameChange}
          fullWidth
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleSaveModalClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button onClick={handleSaveDynamicBlock} disabled={!fileName} variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
    )
  }

  return (
      <Grid container direction="row">
        <Grid item xs={12}>
          <SectionHeader title={sectionHeaderContent.title} subtitle={sectionHeaderContent.subtitle}/>
        </Grid>
      
        <Grid item xs={12}>
          <CodeRenderer onGenerateDynamicBlock={handleGeneratedDynamicBlock} />
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveModalOpen}
          sx={{ position: 'fixed', top: 80, right: 16 }}
        >
          Save
        </Button>
        <Grid item xs={12}>
          <DialogRenderer/>
        </Grid>
      </Grid>
  );
};

export default DynamicBlockGenerator;