import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { COMPONENTS } from '../../../Utils/variables';

const ComponentsSelect = ({onChange}) => {

    return(
        <FormControl fullWidth>
            <InputLabel>Component</InputLabel>
            <Select onChange={onChange}>
            {Object.entries(COMPONENTS).map(([key,value])=> (
                <MenuItem key={key} value={value.type}>{value.label}</MenuItem>
            ))}
            </Select>
        </FormControl>
    )

}

export default ComponentsSelect