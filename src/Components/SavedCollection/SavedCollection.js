import React, {useContext, useState} from 'react';
import {CardContent, Grid, Card, Paper, Box, Button} from '@mui/material'
import FolderTree from '../FolderTree/FolderTree';
import SectionHeader from '../SectionHeader/SectionHeader';
import TemplateRenderer from '../TemplateRenderer/TemplateRenderer';

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
    
      const placeholderStyle = {
        width: '50vw',
        height: '60vh',
        border: '1px solid #ddd',
        overflow: 'auto',
        padding: '10px'
      };
    
      const templateRenderStyle = {
        width: '50vw',
        height: '60vh',
        border: '1px solid #ddd',
        overflow: 'auto',
        padding: '50px'
      };

    return(
        <Grid container direction="row">
            <Grid item xs={12} >
                <SectionHeader title={sectionHeaderContent.title} subtitle={sectionHeaderContent.subtitle}/>
            </Grid>
            <Grid item xs={3} >
                <FolderTree onItemSelected={handleSelectedItem} onItemDeleted={handleDeletedItem} showFiles={true} allowUpdates={true}/>
            </Grid>
            <Grid item xs={8} style={{ overflow: 'auto', marginLeft: "20px" }}>
                
                    <TemplateRenderer template={selectedFile} placeholderText="Your selected template will render here"/>
                
            </Grid>
        </Grid>
    )
}

export default SavedCollection