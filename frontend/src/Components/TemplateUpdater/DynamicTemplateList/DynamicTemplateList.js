import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Grid, Checkbox, Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';
import { fetchAllTemplates } from '../../../Utils/functions';

const DynamicTemplateList = ({ onSelectTemplates, onSelectVersions }) => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [selectedVersionsArray, setSelectedVersionsArray] = useState({});
  const [selectedTemplatesAndVersions, setSelectedTemplatesAndVersions] = useState([])

  const fetchTemplates = async () => {
    try {
      const data = await fetchAllTemplates();
      setTemplates(data);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  useEffect(() => {
    onSelectTemplates(selectedTemplates);
    onSelectVersions(selectedTemplatesAndVersions)
  }, [selectedTemplates, selectedTemplatesAndVersions, onSelectTemplates, onSelectVersions]);

  const handleTemplateSelect = (_template) => (event) =>  {
    const selectedTemplate = templates.find((template) => template.id === _template.id);
    if (event.target.checked) {
      setSelectedTemplates((prevSelectedTemplates) => [...prevSelectedTemplates, selectedTemplate]);   
    } else {
      setSelectedTemplates((prevSelectedTemplates) =>
        prevSelectedTemplates.filter((template) => template.id !== _template.id)
      );
      setSelectedTemplatesAndVersions((prevSelections) =>
        prevSelections.filter((selection) => selection.template_id !== _template.id)  
      )
    }
    onSelectTemplates(selectedTemplates);
  };

  const handleVersionSelect = (selected_versions_array, template) => {

    let updatedArray = [];

    setSelectedVersionsArray((prevOptions) => ({
      ...prevOptions,
      [template.id]: selected_versions_array,
    }));

    const index = selectedTemplatesAndVersions.findIndex(element => element.template_id === template.id)

    if(index === -1){
      updatedArray = [...selectedTemplatesAndVersions, {versions_array: selected_versions_array, template_id: template.id}]
    }
    else {
      updatedArray = [...selectedTemplatesAndVersions]
      updatedArray[index].versions_array = selected_versions_array
    }
    const updatedArrayWithVersions = updatedArray.filter((obj) => obj.versions_array.length > 0);
    setSelectedTemplatesAndVersions(updatedArrayWithVersions)
    onSelectVersions(selectedTemplatesAndVersions)
  };

  return (
    <div>
      <Grid container spacing={2} justifyContent="center" alignItems="center" height="100vh">
        { templates.length === 0 ? 
          (
            <Grid item textAlign="center">
            <CircularProgress />
            <Typography variant="body1">Getting your templates. Please wait...</Typography>
            </Grid>
          ) 
          : 
          (
            templates.map((template, index) => (
            <Grid item xs={12} sm={6} md={4} key={template.id}>
            <Card 
            key={template.id}
            style={{
              border: selectedTemplates.some((selected) => selected.id === template.id) ? '3px solid blue' : '2px solid ',
            }}
            >
              <CardMedia
                component="img"
                height="300"
                image={template.thumbnail_url}
                alt={template.name}
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  {template.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {template.versions_array.length} {template.versions_array.length === 1 ? 'version found' : 'versions found'}
                </Typography>
                <FormControl fullWidth>
                  <InputLabel>Select Version</InputLabel>
                  <Select 
                    value={selectedVersionsArray[template.id] || []}
                    multiple disabled={!selectedTemplates.some((selected) => selected.id === template.id)} 
                    renderValue={(selected) => selected.join(', ')}
                    onChange={(event) =>
                        handleVersionSelect(event.target.value, template)
                    }
                    >
                      {/*<MenuItem key="all-versions" value="all-versions">
                        All Versions
                    </MenuItem>*/}
                    {template.versions_array.map((version) => (
                      <MenuItem key={version.id} value={version.id}>
                        {version.name}
                        {version.active ? ' - Active' : ''}
                      </MenuItem>
                    ))}
                    </Select>
                </FormControl>
              </CardContent>
            </Card>
            <div>
            <Checkbox
                  checked={selectedTemplates.some((selected) => selected.id === template.id)}
                  onChange={handleTemplateSelect(template)}
                />
            <span>Click to select</span>
          </div>
          </Grid>
        )))}
      </Grid>
    </div>
  );
};

export default DynamicTemplateList;