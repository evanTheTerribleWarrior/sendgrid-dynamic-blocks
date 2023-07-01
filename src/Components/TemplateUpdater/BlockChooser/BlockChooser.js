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

    return (
        <Container>
        <Grid container direction="row" spacing={2} sx={{margin: "20px"}} >
            <Grid item xs={4}>
                <FolderTree onItemSelected={handleOnItemSelected} showFiles={true}/>
            </Grid>
            <Grid item xs={8}>
                
                {
                    blockSelected ? (
                            <Box dangerouslySetInnerHTML={{ __html: blockSelected.content }} />
                       
                    ) : (
                        <Paper elevation={3} style={{ height: '100%' }}>
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            Select a file from the treeview
                        </div>
                        </Paper>
                        )
                }
                
            </Grid>
        </Grid>
        </Container>

    )

}

export default BlockChooser;