import React from 'react'
import {Box, Button} from '@mui/material'
import BlockImport from '../BlockCreation/BlockImport/BlockImport'

const ItemCreation = ({onAddNewRow, onhandleImportedBlock}) => {

    const handleSetItem = (type) => {
        onAddNewRow(type)
    }

    const handleImportedBlock = (importedBlock) => {
        onhandleImportedBlock(importedBlock)
    }


    return (
        <>
            <Button variant="outlined" color="primary" onClick={() => handleSetItem("condition")}>
                Add Condition
            </Button>
            <Button variant="outlined" color="primary" onClick={() => handleSetItem("component")}>
                Add Component
            </Button>
            <BlockImport onBlockImported={handleImportedBlock} />
        </>
    )
}

export default ItemCreation;

