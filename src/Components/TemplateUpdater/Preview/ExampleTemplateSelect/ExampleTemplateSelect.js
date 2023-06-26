import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const ExampleTemplateSelect = ({ onSelectedTemplate, selectedTemplates }) => {

    const [selectedTemplate, setSelectedTemplate] = useState("")

    const handleTemplateSelect = (event) => {
        console.log(event.target.value);
        console.log(selectedTemplates)
        const selectedObj = selectedTemplates.find(template => template.id === event.target.value);
        console.log("selected: " + selectedObj)
        setSelectedTemplate(selectedObj)
        onSelectedTemplate(selectedObj)
    }

    return (
        <FormControl fullWidth>
            <InputLabel>Select Test Template</InputLabel>
            <Select value={selectedTemplate.id || ''} onChange={handleTemplateSelect}>
            {selectedTemplates.map((template) => (
                <MenuItem key={template.id} value={template.id}>
                    {template.name}
                </MenuItem>
            ))}
            </Select>
        </FormControl>
    );
};

export default ExampleTemplateSelect;