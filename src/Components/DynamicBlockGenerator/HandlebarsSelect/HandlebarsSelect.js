import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { HANDLEBARS } from '../../../Utils/variables';

const HandlebarsSelect = ({ onChange }) => {

    const excludedKeys = ['LENGTH', 'EACH_THIS', 'EACH_ARRAY_INDEX', 'EACH_OBJ_KEY'];

    const removeHandlebarTags = (value) => {
        return value.replace(/{{[#\/]?/g, '').replace(/}}/g, '');
    };

    const filteredHandlebars = Object.entries(HANDLEBARS).filter(([key]) => {
        return !excludedKeys.includes(key) && !key.endsWith('_CLOSE');
      });
    return (
        <FormControl fullWidth>
            <InputLabel>Condition</InputLabel>
            <Select onChange={onChange}>
            {filteredHandlebars.map(([key, { value }]) => (
                <MenuItem key={key} value={value}>
                    {removeHandlebarTags(value)}
                </MenuItem>
            ))}
            </Select>
        </FormControl>
    );
};

export default HandlebarsSelect;