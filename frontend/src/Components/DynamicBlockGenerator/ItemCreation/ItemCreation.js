import React from 'react'
import {Box, Button} from '@mui/material'

const ItemCreation = ({onAddNewRow}) => {

    const handleSetItem = (type) => {
        onAddNewRow(type)
    }


    return (
        <Box mt={2}  sx={{ p: 2, display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <Button variant="outlined" color="primary" onClick={() => handleSetItem("condition")} sx={{ width: '20%' }}>
                Add Condition
            </Button>
            <Button variant="outlined" color="primary" onClick={() => handleSetItem("component")} sx={{ width: '20%' }}>
                Add Component
            </Button>
        </Box>
    )
}

export default ItemCreation;

