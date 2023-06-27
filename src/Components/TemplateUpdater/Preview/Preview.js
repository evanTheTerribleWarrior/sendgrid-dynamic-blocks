import React, { useEffect, useState, useRef } from 'react';
import ExampleTemplateSelect from './ExampleTemplateSelect/ExampleTemplateSelect';
import { Card, CardMedia, CardContent, Typography, Box,Button, Grid, Checkbox, RadioGroup, FormControlLabel, Radio} from '@mui/material';
import { fetchSingleTemplateVersion } from '../../../Utils/functions';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';


const Preview = ({ selectedBlock, selectedTemplates, selectedVersions }) => {

  const [exampleSelectedTemplate,setExampleSelectedTemplate] = useState(null);
  const [selectedTemplateVersion, setSelectedTemplateVersion] = useState({});
  const [selectedRadioOption, setSelectedRadioOption] = useState('');
  const [mergedHTML, setMergedHTML] = useState('')

  const handleRadioChange = (event) => {
    setSelectedRadioOption(event.target.value);
  };

  const fetchTemplateVersion = async (template_version_obj) => {
    try {
      const data = await fetchSingleTemplateVersion(template_version_obj);
      console.log("returned data: " + JSON.stringify(data))
      setSelectedTemplateVersion(data);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const handleExampleTemplateSelect = (event) => {
    const template_id = event.target.value;
    const template_version_obj = selectedVersions.find(template_version => template_version.template_id === template_id)
    fetchTemplateVersion(template_version_obj)
    setExampleSelectedTemplate(template_id)
  }

  const domParserMerge = () => {

    const parser = new DOMParser();
    const doc = parser.parseFromString(selectedTemplateVersion.html_content, 'text/html');
    const newElement = parser.parseFromString(selectedBlock.content, 'text/html').body;

    if (selectedRadioOption === "header"){
      const table = doc.querySelector('table[data-type="preheader"]');
      if (table) {
        table.insertAdjacentElement('afterend', newElement);
      }
      console.log("Result: " + doc.documentElement.innerHTML)
      return doc.documentElement.innerHTML;
    }
    else if(selectedRadioOption === "footer") {
      const tables = doc.querySelectorAll('table');
      if (tables.length > 0) {
        const lastTable = tables[tables.length - 1];
        lastTable.insertAdjacentElement('afterend', newElement);
      }
      return doc.documentElement.outerHTML;
    }

    
  }
  const handleMergeContent = () => {
    setMergedHTML(domParserMerge())
  }
  
  return (

    <Grid container spacing={10} direction="row" sx={{marginTop: "10px"}}>
      <Grid item xs={12}>

        
            <Grid container spacing={5} direction="row">
              <Grid item xs={6}>
                <ExampleTemplateSelect selectedTemplates={selectedTemplates} onChange={handleExampleTemplateSelect} />
                <RadioGroup name="options" value={selectedRadioOption} onChange={handleRadioChange}>
                  <FormControlLabel value="header" control={<Radio />} label="Set as Header" />
                  <FormControlLabel value="footer" control={<Radio />} label="Set as Footer" />
                </RadioGroup>
                  <Button onClick={() => handleMergeContent()}>
                  Merge
                </Button>
              </Grid>
              <Grid item xs={6}>
              <Card>
          <CardContent>
              <Box dangerouslySetInnerHTML={{ __html: selectedBlock.content }} />
              </CardContent>
        </Card>
              </Grid>
          </Grid>
          

      </Grid>
      <Grid item xs={12} sx={{marginTop: "20px"}}>
        <Card style={{border: "1px solid #ccc"}}>
          {
            selectedTemplateVersion && mergedHTML ? 
              (
                <Box dangerouslySetInnerHTML={{ __html: mergedHTML }} /> 
              )
              :
              (
                <Box dangerouslySetInnerHTML={{ __html: selectedTemplateVersion.html_content }} /> 
              )
            }
        </Card>
      </Grid>
    </Grid>  
  );
};

export default Preview;