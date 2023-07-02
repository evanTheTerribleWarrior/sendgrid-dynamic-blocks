import React, {useState} from 'react';
import {Grid, Box, Paper, Container} from '@mui/material';
import FolderTree from '../../FolderTree/FolderTree';

const BlockChooser = ({onFileSelected}) => {

    const [blockSelected, setFileSelected] = useState("")

    const handleOnItemSelected = (item) => {
        if(item.type === "file"){
            setFileSelected(item)
            onFileSelected(item)
        }
        
    }

    const placeholderStyle = {
        width: '50vw',
        height: '60vh',
        border: '1px solid #ddd',
        overflow: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      };
    
      const templateRenderStyle = {
        width: '50vw',
        height: '60vh',
        border: '1px solid #ddd',
        overflow: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
      };

    return (
        <Container>
        <Grid container direction="row" spacing={2} sx={{margin: "20px"}} >
            <Grid item xs={3} >
                <FolderTree onItemSelected={handleOnItemSelected} showFiles={true}/>
            </Grid>
            <Grid item xs={7}>
                
                {
                    blockSelected ? (
                            <Paper style={templateRenderStyle}>
                                <div dangerouslySetInnerHTML={{ __html: blockSelected.content }} />
                            </Paper>
                    ) : (
                        <Paper style={placeholderStyle}>
                            Select a file from the treeview
                        </Paper>
                        )
                }
                
            </Grid>
        </Grid>
        </Container>

    )

}

export default BlockChooser;