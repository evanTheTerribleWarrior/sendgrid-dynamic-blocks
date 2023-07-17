import React, { useState, useRef } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, Tooltip, IconButton, Typography, Box } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useSelector } from 'react-redux';
import FolderTree from '../../../FolderTree/FolderTree';


const BlockImport = ({onBlockImported}) => {

  const folderStructure = useSelector((state) => state.folderStructure);

  const [openDialog, setOpenDialog] = useState(false);
  const [cantImport, setCantImport] = useState(false)
  const selectedItemRef = useRef(null);

  const handleButtonClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    
    setOpenDialog(false);
  };

  const handleChoiceSelected = (choice) => {
    //onChoiceSelected(choice);
    setOpenDialog(false);
  };

  const handleOnItemSelected = (item) => {
    selectedItemRef.current = item;
    console.log(selectedItemRef)
  }

  const handleImportDynamicBlock = () => {
    if(!selectedItemRef.current.savedRowsStructure){
        setCantImport(true)
        return
    }
    setCantImport(false)
    onBlockImported(selectedItemRef.current)
    setOpenDialog(false);
  }

  return (
    <>
        <Tooltip title="Import existing block from your collection">
            <IconButton component="span" onClick={handleButtonClick}>
                <FileUploadIcon />
            </IconButton>
        </Tooltip>
        <Dialog open={openDialog} onClose={handleDialogClose}>
            <DialogTitle>Import Existing Block</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <div>
                {folderStructure && <FolderTree onItemSelected={handleOnItemSelected} showFiles={true}/>}
                </div>
                <Button onClick={handleImportDynamicBlock} variant="contained" color="primary">
                    Import
                </Button>
                {
                    cantImport && (
                        <Typography variant="body1" color="error" align="center">
                            Currently you can import blocks only created with the generator
                        </Typography>
                    )
                }
                </Box>
            </DialogContent>
        </Dialog>
    </>
  );
}

export default BlockImport;
