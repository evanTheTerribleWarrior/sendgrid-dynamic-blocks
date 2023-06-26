import React, {useState} from 'react';
import {Grid, Box, Paper, Container} from '@mui/material';
import FolderTree from '../../FolderTree/FolderTree';
import { useSelector } from 'react-redux';

const BlockChooser = ({onBlockSelected}) => {

    const [blockSelected, setBlockSelected] = useState("")

    const folderStructure = useSelector((state) => state.folderStructure);
    console.log(folderStructure)

    const handleBlockClick = (node) => {
        setBlockSelected(node)
        onBlockSelected(node)
    }

    return (
        <Container>
        <Grid container direction="row" spacing={2} sx={{margin: "20px"}} >
            <Grid item xs={4}>
                <FolderTree folderStructure={folderStructure.folderStructure} onBlockClick={handleBlockClick}/>
            </Grid>
            <Grid item xs={8}>
                <Paper elevation={3} style={{ height: '100%' }}>
                {
                    blockSelected ? (
                            <Box dangerouslySetInnerHTML={{ __html: blockSelected.content }} />
                       
                    ) : (
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            Select a file from the treeview
                        </div>
                        )
                }
                 </Paper>
            </Grid>
        </Grid>
        </Container>

    )

}

export default BlockChooser;