import React, {useState, useRef} from 'react';
import TemplateVersionSelect from './TemplateVersionSelect/TemplateVersionSelect';
import { Card, CardMedia, CardContent, Typography, Box,Button, Grid, Checkbox, RadioGroup, FormControlLabel, Radio} from '@mui/material';
import { fetchSingleTemplateVersion } from '../../../../Utils/functions';
import ReactDOM from 'react-dom';

const UpdateSingle = ({ selectedBlock, selectedTemplates, selectedVersions }) => {

  const [selectedTemplateVersion, setSelectedTemplateVersion] = useState({});
  const [elementsArray, setElementsArray] = useState([])

  const ClickArea = ({ onClick }) => {
    return (
      <div style={{ backgroundColor: 'lightgray', padding: '10px', margin: '10px 0' }} onClick={onClick}>
        Click here
      </div>
    );
  };

  const HTMLContent = ({ innerHTML }) => {
    return <div style={{ margin: '10px 0' }} dangerouslySetInnerHTML={{ __html: innerHTML }} />;
  };

  const fetchTemplateVersion = async (template_version_obj) => {
    try {
      const data = await fetchSingleTemplateVersion(template_version_obj);
      console.log("returned data: " + JSON.stringify(data))
      setSelectedTemplateVersion(data);
      //domParserMerge()
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const handleTemplateVersionSelect = (templateVersionObj) => {
    console.log(templateVersionObj)
    fetchTemplateVersion(templateVersionObj)
  }

  const domParserMerge = () => {

   // const data_types = ["image", ]
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(selectedTemplateVersion.html_content, 'text/html');
    const elements = doc.querySelectorAll('table[data-type]');
    
    let html_array = []
    
    for (let i=0; i < elements.length; i++){
      if(elements[i].dataset["type"] === "preheader"){
        continue;
      }
      else {
        html_array.push({type: "clickArea"})
        html_array.push({type: "html", content: elements[i].outerHTML})
      }
    }
    
    console.table(html_array)

    setElementsArray(html_array)

  }

  const renderElements = () => {
    return elementsArray.map((element, index) => {
      if (element.type === 'clickArea') {
        return <ClickArea key={index} onClick={() => handleElementClick(element)} />;
      }
      if (element.type === 'html') {
        return <HTMLContent key={index} innerHTML={element.innerHTML} />;
      }
      return null;
    });
  };

  const handleElementClick = (element) => {
    console.log('Clicked element:', element);
  };

  return (

    <Grid container spacing={10} direction="row" sx={{marginTop: "10px"}}>
      <Grid item xs={12}>

        
            <Grid container spacing={5} direction="row">
              <Grid item xs={6}>
                <TemplateVersionSelect selectedTemplates={selectedTemplates} selectedVersions={selectedVersions} onChosenVersion={handleTemplateVersionSelect} />
              </Grid>
              <Button onClick={() => domParserMerge()}>
                  Parse
                </Button>
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
            selectedTemplateVersion && elementsArray ? 
              (
                <div>{renderElements()}</div>
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
}

export default UpdateSingle;