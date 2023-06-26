import React, {useContext, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {CardContent, Grid, Card, Paper} from '@mui/material'
import FolderTree from '../FolderTree/FolderTree';

const SavedCollection = () => {

    const folderStructure = useSelector((state) => state.folderStructure);

      const [selectedFolder, setSelectedFolder] = useState(null);
      const [selectedFile, setSelectedFile] = useState('');

      const handleOnFolderClick = (folder) => {
        console.table(folder)
        setSelectedFolder(folder)
      }

      const handleBlockClick = (file) => {
          console.log(file.content)
        setSelectedFile(file)
      }
    

    return(
        <Grid container direction="row" spacing={10}>
            <Grid item xs={3}>
                <FolderTree folderStructure={folderStructure.folderStructure} onFolderClick={handleOnFolderClick} onBlockClick={handleBlockClick} showFiles={true}/>
            </Grid>
            <Grid item xs={9}>
                <Paper>
                    <div dangerouslySetInnerHTML={{ __html: selectedFile.content }} />
                </Paper>
              
            </Grid>
        </Grid>
    )
}

export default SavedCollection