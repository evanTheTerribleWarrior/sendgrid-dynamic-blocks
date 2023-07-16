import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Box, Button, Grid, TextField, Modal, Typography, Popover } from '@mui/material';
import CodeRenderer from './CodeRenderer/CodeRenderer'; 
import FolderTree from '../FolderTree/FolderTree';
import { updateFolderStructure } from '../../Redux/slices/folderStructureSlice';
import SectionHeader from '../SectionHeader/SectionHeader'

const sectionHeaderContent = {
  title: "Build Your Block",
  subtitle: "Here you can build your Sendgrid block. Use Conditions like if..else and Components like images and text. Finally save to your library"
}

const DynamicBlockGenerator = () => {

    const [generatedBlock, setGeneratedBlock] = useState([]);
    const [saveModalOpen, setSaveModalOpen] = useState(false);
    const selectedFolderRef = useRef(null);
    const fileNameRef = useRef('');
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [fileName, setFileName] = useState('');

    useEffect(() => {
      selectedFolderRef.current = selectedFolder;
    }, [selectedFolder]);
  
    useEffect(() => {
      fileNameRef.current = fileName;
    }, [fileName]);

    const folderStructure = useSelector((state) => state.folderStructure);
    const dispatch = useDispatch()
    
    const findFolderToSaveRecursive = (folders, selectedFolder, fileName) => {

      return folders.map((folder) => {
        if (folder.id === selectedFolder.id) {
          return {
            ...folder,
            children: [...folder.children, { id: uuid(), type: 'file', name: fileName + ".html", content: generatedBlock }],
          };
        }
        else if (folder.children) {
          return {
            ...folder,
            children: findFolderToSaveRecursive(folder.children, selectedFolder, fileName)
          }
        }
        return folder;
      });

    }

    const handleSaveDynamicBlock = () => {

      const selectedFolder = selectedFolderRef.current;
      const fileName = fileNameRef.current;
      dispatch(updateFolderStructure(findFolderToSaveRecursive(folderStructure.folderStructure, selectedFolder, fileName)));
      selectedFolderRef.current = null;
      fileNameRef.current = '';
      handleSaveModalClose()
    }

    const handleOnFolderSelected = (folder) => {
      selectedFolderRef.current = folder;
      console.log(selectedFolderRef)
      //setSelectedFolder(folder)
    }

    const handleFileNameChange = (event) => {
      fileNameRef.current = event.target.value;
    };

    const handleSaveModalOpen = () => {
      
      setSaveModalOpen(true)
    }

    const handleSaveModalClose = () => {
      selectedFolderRef.current = null;
      fileNameRef.current = '';
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
        <div>
        {folderStructure && <FolderTree onItemSelected={handleOnFolderSelected} showFiles={false}/>}
        </div>
        <Typography variant="h6" gutterBottom>
          Save File
        </Typography>
        <TextField
          key="text-field-key"
          label="File Name"
          onChange={handleFileNameChange}
          fullWidth
          autoFocus
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleSaveModalClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button onClick={handleSaveDynamicBlock} variant="contained" color="primary">
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