import React, {useContext, useState} from 'react';
import {CardContent, Grid, Card, Paper, Box, Button} from '@mui/material'
import FolderTree from '../FolderTree/FolderTree';
import SectionHeader from '../SectionHeader/SectionHeader';

const sectionHeaderContent = {
    title: "My Saved Content",
    subtitle: "Here you can manage your dynamic blocks folder structure. Right-click on a folder or file to see your options"
}

const SavedCollection = () => {

      const [selectedFile, setSelectedFile] = useState('');

      const handleSelectedItem = (item) => {
        if(item.type === "file")setSelectedFile(item)
      }

      const handleDeletedItem = (item) => {
          if(selectedFile && item.id === selectedFile.id) setSelectedFile(null)
      }
    

    return(
        <Grid container direction="row">
            <Grid item xs={12} >
                <SectionHeader title={sectionHeaderContent.title} subtitle={sectionHeaderContent.subtitle}/>
            </Grid>
            <Grid item xs={3} >
                <FolderTree onItemSelected={handleSelectedItem} onItemDeleted={handleDeletedItem} showFiles={true} allowUpdates={true}/>
            </Grid>
            <Grid item xs={8} style={{ overflow: 'auto', marginLeft: "20px" }}>
                <Box >
                    <div dangerouslySetInnerHTML={{ __html: selectedFile ? selectedFile.content : "" }} />
                </Box>
            </Grid>
        </Grid>
    )
}

export default SavedCollection