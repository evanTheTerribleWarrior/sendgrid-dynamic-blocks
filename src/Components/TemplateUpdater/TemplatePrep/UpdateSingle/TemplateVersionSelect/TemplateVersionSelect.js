import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const TemplateVersionSelect = ({ onChosenVersion, selectedTemplates, selectedVersions }) => {

    const [selectedTemplate, setSelectedTemplate] = useState("")
    const [chosenVersions, setChosenVersions] = useState([])

    const handleVersionSelect = (event) => {

        onChosenVersion({"template_id": selectedTemplate.id, "version_id": event.target.value})
    }

    const handleTemplateSelect = (event) => {
        const selectedObj = selectedTemplates.find(template => template.id === event.target.value);
        console.log("selected: " + JSON.stringify(selectedObj))
        setSelectedTemplate(selectedObj)   
        getVersionsFromTemplate(selectedObj)
    }

    const getVersionsFromTemplate = (template) => {
        
        const extractedData = selectedVersions.flatMap((selectedVersion) =>
            selectedVersion.versions_array.map((versionId) => {
                const versionObject = template.versions_array.find(
                (version) => version.id === versionId
                );
                if (versionObject) return { id: versionObject.id, name: versionObject.name }
            })
        ).filter(Boolean);
        console.log(extractedData)
        setChosenVersions(extractedData)
    }

    return (<>
        <FormControl fullWidth>
            <InputLabel>Select Template</InputLabel>
            <Select onChange={handleTemplateSelect}>
            {selectedTemplates.map((template) => (
                <MenuItem key={template.id} value={template.id}>
                    {template.name}
                </MenuItem>
            ))}
            </Select>
        </FormControl>

        <FormControl fullWidth>
        <InputLabel>Select Version</InputLabel>
        <Select onChange={handleVersionSelect}>
        {chosenVersions.map((version) => (
            <MenuItem key={version.id} value={version.id}>
                {version.name}
            </MenuItem>
        ))}
        </Select>
        </FormControl>
        </>
    );
};

export default TemplateVersionSelect;