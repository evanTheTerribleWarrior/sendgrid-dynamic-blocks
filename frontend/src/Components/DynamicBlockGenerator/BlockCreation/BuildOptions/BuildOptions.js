import React from 'react'
import {Box, Button, Tooltip, IconButton} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import BlockImport from '../BlockImport/BlockImport'

const BuildOptions = ({onAddNewRow, onhandleImportedBlock, onhandleClearBlock}) => {

    const handleSetItem = (type) => {
        onAddNewRow(type)
    }

    const handleImportedBlock = (importedBlock) => {
        onhandleImportedBlock(importedBlock)
    }

    const handleClearButtonClick = () => {
        onhandleClearBlock()
    }


    return (
        <>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
                <Button variant="outlined" color="primary" sx={{ mr: 1 }} onClick={() => handleSetItem("condition")}>
                    Add Condition
                </Button>
                <Button variant="outlined" color="primary" onClick={() => handleSetItem("component")}>
                    Add Component
                </Button>
            </Box>
            <Box>
                <BlockImport onBlockImported={handleImportedBlock} />
                <Tooltip title="Clear your current block creation">
                    <IconButton component="span" onClick={handleClearButtonClick}>
                        <ClearIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
        </>
        
    )
}

export default BuildOptions;

