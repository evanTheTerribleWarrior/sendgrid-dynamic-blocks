import React, {useState} from 'react';
import {Grid} from '@mui/material'
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

    return(
        <Grid container direction="row">
            <Grid item xs={12} >
                <SectionHeader title={sectionHeaderContent.title} subtitle={sectionHeaderContent.subtitle}/>
            </Grid>
            <Grid item xs={4} >
                <FolderTree onItemSelected={handleSelectedItem} onItemDeleted={handleDeletedItem} showFiles={true} allowUpdates={true}/>
            </Grid>
            <Grid item xs={7} style={{ overflow: 'auto', marginLeft: "30px" }}>
                
                    <TemplateRenderer template={selectedFile} placeholderText="Your selected template will render here"/>
                
            </Grid>
        </Grid>
    )
}

export default SavedCollection