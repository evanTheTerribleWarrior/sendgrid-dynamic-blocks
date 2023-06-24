import React, {useContext, useState} from 'react';
import {CardContent, Grid, Card, Paper} from '@mui/material'
import FolderTree from '../FolderTree/FolderTree';

const SavedCollection = () => {

      const [selectedFolder, setSelectedFolder] = useState(null);
      const [selectedFileContent, setSelectedFileContent] = useState('');

      const handleSelectFolder = (folderId) => {
        setSelectedFolder(folderId);
      };

      const handleFileClick = (fileId, fileName, fileContent) => {
        setSelectedFileContent(fileContent)
      }
    

    return(
        <Grid container direction="row" spacing={10}>
            <Grid item xs={3}>
                {/*<FolderTree folderStructure={folderStructure} onSelectFolder={handleSelectFolder} onFileClick={handleFileClick}/>*/}
            </Grid>
            <Grid item xs={9}>
                <Paper>
                    <div dangerouslySetInnerHTML={{ __html: selectedFileContent }} />
                </Paper>
                

            </Grid>
        </Grid>
    )
}

export default SavedCollection