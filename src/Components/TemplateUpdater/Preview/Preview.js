import React, { useEffect, useState, useRef } from 'react';
import ExampleTemplateSelect from './ExampleTemplateSelect/ExampleTemplateSelect';
import { Card, CardMedia, CardContent, Typography, Box,Button, Grid, Checkbox, RadioGroup, FormControlLabel, Radio} from '@mui/material';
import { fetchSingleTemplateVersion } from '../../../Utils/functions';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
const cheerio = require('cheerio');


const Preview = ({ selectedBlock, selectedTemplates, selectedVersions }) => {

  const [exampleSelectedTemplate,setExampleSelectedTemplate] = useState(null);
  const [selectedTemplateVersion, setSelectedTemplateVersion] = useState({});
  const [selectedRadioOption, setSelectedRadioOption] = useState('');

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

  const handleExampleTemplateSelect = (template) => {
    console.log(template);
    console.log(selectedVersions)
    const template_version_obj = selectedVersions.find(template_version => template_version.template_id === template.id)
    fetchTemplateVersion(template_version_obj)
    setExampleSelectedTemplate(template)
  }

  const handleMergeContent = () => {
    
  }

  /*const [megredTemplateHtml, setMergedTemplateHtml] = useState('');
  const [randomTemplateHtml, setRandomTemplateHtml] = useState('');
  const [randomTemplateAllData, setRandomTemplateAllData] = useState('');
  const leftSectionRef = useRef(null);
  const [leftSectionHeight, setLeftSectionHeight] = useState(0);

  const randomTemplate = selectedTemplates[Math.floor(Math.random() * selectedTemplates.length)];

  const mergeTemplate = async () => {
    const $ = cheerio.load(randomTemplateHtml);
    const tables = $('body').find('table');
    const lastTable = tables.last();
    const lastTableStyle = lastTable.attr('style');

    const modifiedHtml = randomTemplateHtml.replace('</table>', `</table>${generatedBlock}`);
    console.log(`Modified HTML:  ${modifiedHtml}`)
    setMergedTemplateHtml(modifiedHtml);
  };

  useEffect(() => {
    if (leftSectionRef.current) {
      const height = leftSectionRef.current.clientHeight;
      setLeftSectionHeight(height);
    }
    const fetchTemplateHtml = async () => {
      try {
        const data = await fetchSingleTemplate(randomTemplate.id);
        setRandomTemplateAllData(data);
        // This needs updating, with the user choosing which version they want to update
        setRandomTemplateHtml(data.versions.find((version) => version.html_content)?.html_content)
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };
    fetchTemplateHtml();
  }, [randomTemplate.id]);
*/

  return (

    <Grid container spacing={10} direction="row" sx={{marginTop: "10px"}}>
      <Grid item xs={12}>

        
            <Grid container spacing={5} direction="row">
              <Grid item xs={6}>
                <ExampleTemplateSelect selectedTemplates={selectedTemplates} onSelectedTemplate={handleExampleTemplateSelect} />
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
            selectedTemplateVersion ? 
              (
                <Box dangerouslySetInnerHTML={{ __html: selectedTemplateVersion.html_content }} /> 
              )
              :
              (
              <CardMedia 
                src='./logo512.png' 
                sx={{height: "80%"}}
                component="img"
              >
              </CardMedia>
              )
            }
        </Card>
      </Grid>
    </Grid>

   /* {<Grid container spacing={2}>
       <Grid item xs={6} key="preview-generated-code">
       <Card style={{ display: 'flex' }}>
        <div
          ref={leftSectionRef}
          style={{ flex: 1, padding: '1rem' }}
        >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Generated Code
          </Typography>
          <SyntaxHighlighter language="html" style={codeStyle}  height="100%">
            {generatedBlock}
          </SyntaxHighlighter>
          
        </CardContent>
        </div>
        </Card>
      </Grid>

      <Grid item xs={6} key="preview-random-template">
        <Card>
          <CardContent>
        <Typography variant="h6" gutterBottom>
          Template for Preview
          {randomTemplate.name}
        </Typography>
        </CardContent>
        <CardMedia
        component="img"
        style={{ flex: 1, height: leftSectionHeight }}
        image={randomTemplate.thumbnail_url}
        alt={randomTemplate.name}
        >
        
        </CardMedia>
        </Card>
      </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={mergeTemplate}>
            Merge
          </Button>
      </Grid>

      <Paper elevation={2} sx={{ p: 4, height: '100%', overflow: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Result
      </Typography>
      {/* Render the generated HTML here }*/
      //<Box dangerouslySetInnerHTML={{ __html: megredTemplateHtml }} />
     // </Paper>
  //</Grid>*/}


    
  );
};

export default Preview;