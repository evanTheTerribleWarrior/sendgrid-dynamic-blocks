import React, {useContext, useState} from 'react';
import {CardContent, Grid, Card, Paper} from '@mui/material'
import FolderTree from '../FolderTree/FolderTree';

const SavedCollection = () => {

      const [selectedFile, setSelectedFile] = useState('');

      const handleSelectedFile = (file) => {
        setSelectedFile(file)
      }
    

    return(
        <Grid container direction="row" spacing={10}>
            <Grid item xs={4}>
                <FolderTree onFileSelected={handleSelectedFile} showFiles={true} allowUpdates={true}/>
            </Grid>
            <Grid item xs={8}>
                <Paper>
                    <div dangerouslySetInnerHTML={{ __html: selectedFile.content }} />
                </Paper>
              
            </Grid>
        </Grid>
    )
}

export default SavedCollection