import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Grid, Checkbox, 
  Select, MenuItem, FormControl, InputLabel, CircularProgress, Button } from '@mui/material';
import { fetchAllTemplates } from '../../../Utils/functions';

const DynamicTemplateList = ({ onSelectTemplates, onSelectVersions }) => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [selectedVersionsArray, setSelectedVersionsArray] = useState({});
  const [selectedTemplatesAndVersions, setSelectedTemplatesAndVersions] = useState([])
  const [nextPageToken, setNextPageToken] = useState(null);
  const [initialLoaded, setInitialLoaded] = useState(false);

  const fetchTemplates = async () => {
    try {
      const data = await fetchAllTemplates(nextPageToken);
      console.log(JSON.stringify(data))
      data.page_token ? setNextPageToken(data.page_token) : setNextPageToken(null)
      setTemplates((prevTemplates) => {
        const uniqueTemplates = [...prevTemplates, ...data.templates_array];
        const uniqueTemplatesById = Array.from(
          new Map(uniqueTemplates.map((template) => [template.id, template]))
        ).map((entry) => entry[1]);

        return uniqueTemplatesById;
      });
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  useEffect(() => {
    if(!initialLoaded){
      fetchTemplates();
    }
      
  }, []);

  useEffect(() => {
    onSelectTemplates(selectedTemplates);
    onSelectVersions(selectedTemplatesAndVersions)
  }, [selectedTemplates, selectedTemplatesAndVersions, onSelectTemplates, onSelectVersions]);

  const handleLoadMoreTemplates = () => {
    fetchTemplates();
  };

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
      <Grid container direction="column" alignItems="center" spacing={2}>
        { templates.length === 0 ? 
          (
            <Grid item textAlign="center" sx={{mt: 10}}>
            <CircularProgress />
            <Typography variant="body1">Getting your templates. Please wait...</Typography>
            </Grid>
          ) 
          : 
          (
            <Grid container item spacing={2} sx={{mt: 2}}>
              {
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
                    value={selectedVersionsArray[template.id]|| []}
                    multiple disabled={!selectedTemplates.some((selected) => selected.id === template.id)} 
                    renderValue={(selected) => selected.length + " selected"}
                    onChange={(event) =>
                        handleVersionSelect(event.target.value, template)
                    }
                    >
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
        ))}</Grid>)}
        <Grid item>
        {nextPageToken && (
            <Button variant="outlined" onClick={handleLoadMoreTemplates}>Load More Templates</Button>
        )}
        </Grid>
      </Grid>
      
    </div>
  );
};

export default DynamicTemplateList;
