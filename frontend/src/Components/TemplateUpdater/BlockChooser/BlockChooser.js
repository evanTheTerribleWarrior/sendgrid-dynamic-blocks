import React, {useState} from 'react';
import {Grid, Container} from '@mui/material';
import FolderTree from '../../FolderTree/FolderTree';
import TemplateRenderer from '../../TemplateRenderer/TemplateRenderer';

const BlockChooser = ({onFileSelected}) => {

    const [blockSelected, setFileSelected] = useState("")

    const handleOnItemSelected = (item) => {
        if(item.type === "file"){
            setFileSelected(item)
            onFileSelected(item)
        }
        
    }

    return (
        <Container>
        <Grid container direction="row" spacing={2} sx={{margin: "20px"}} >
            <Grid item xs={3} >
                <FolderTree onItemSelected={handleOnItemSelected} showFiles={true}/>
            </Grid>
            <Grid item xs={7}>
                
                <TemplateRenderer template={blockSelected} placeholderText="Your selected template will render here"/>
                
            </Grid>
        </Grid>
        </Container>

    )

}

export default BlockChooser;