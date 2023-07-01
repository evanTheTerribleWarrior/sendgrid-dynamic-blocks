import React, { useEffect, useState, useRef } from 'react';
import { Card, CardMedia, CardContent, Typography, Box,Button, Grid, Checkbox, 
RadioGroup, FormControlLabel, Radio, FormControl, InputLabel, Select, MenuItem, Tooltip, FormLabel, Paper} from '@mui/material';
import { fetchSingleTemplateVersion, updateSingleTemplate } from '../../../../Utils/functions';
import HelpIcon from "@mui/icons-material/Help";

const UpdateMultiple = ({ selectedBlock, selectedTemplates, selectedVersions }) => {

  const [exampleSelectedTemplate,setExampleSelectedTemplate] = useState(null);
  const [selectedTemplateVersion, setSelectedTemplateVersion] = useState({});
  const [selectedRadioOption, setSelectedRadioOption] = useState('');
  const [mergedHTML, setMergedHTML] = useState('')
  const [createVersionChecked, setCreateVersionChecked] = useState(false);
  const [selectedRadioUpdateOption, setSelectedRadioUpdateOption] = useState('updateMultiple');
  const [checkBoxList, setCheckBoxList] = useState([])
  const [checkedTemplates, setCheckedTemplates] = useState([])

  const parser = new DOMParser();

  useEffect(() => {
    createCheckboxList();
  }, []);

  const createCheckboxList = () => {

    const result = selectedVersions.flatMap(({ template_id, versions_array }) =>
        versions_array
        .filter((versionId) => {
        const version = selectedTemplates
          .flatMap((template) => template.versions_array)
          .find((version) => version.id === versionId);
        return version !== undefined;
        })
        .map((versionId) => {
        const template = selectedTemplates.find((template) =>
          template.versions_array.some((version) => version.id === versionId)
        );
        const version = template.versions_array.find((version) => version.id === versionId);

      return {
        template_id,
        template_name: template.name,
        version_id: versionId,
        version_name: version.name,
      };
    })
);

    setCheckBoxList(result)

  }

  const handleCreateVersionChange = (event) => {
    setCreateVersionChecked(event.target.checked)
  }

  const handleRadioChange = (event) => {
    setSelectedRadioUpdateOption(event.target.value);
    setCheckedTemplates([])
  };

  const handlePositionChange = (event) => {
    setSelectedRadioOption(event.target.value)
  }

  const handleManageCheckboxList = (template) => {

    console.log("Passed" + template)
  
    if (selectedRadioUpdateOption === "updateOne"){
      setCheckedTemplates([template])
    }
    else{
      const updatedTemplates = [...checkedTemplates];
      if (updatedTemplates.includes(template)) {
        const index = updatedTemplates.indexOf(template);
        updatedTemplates.splice(index, 1);
      } else {
        updatedTemplates.push(template);
      }
      console.table(updatedTemplates)
      setCheckedTemplates(updatedTemplates);
    }
  }


  const fetchTemplateVersion = async (template_version_obj) => {
    try {
      const data = await fetchSingleTemplateVersion(template_version_obj);
      console.log("returned data: " + JSON.stringify(data))
      setSelectedTemplateVersion(data);
      return data;
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const handleExampleTemplateSelect = (event) => {
    const template_id = event.target.value;
    const template_version_obj = selectedVersions.find(template_version => template_version.template_id === template_id)
    const template_to_get = {"template_id": template_id, "version_id": template_version_obj.versions_array[0]}
    fetchTemplateVersion(template_to_get)
    setExampleSelectedTemplate(template_id)
  }

  const domParserMerge = (versionHtmlContent) => {

    const doc = parser.parseFromString(versionHtmlContent ? versionHtmlContent : selectedTemplateVersion.html_content, 'text/html');
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
    setMergedHTML(domParserMerge(null))
  }

  const handleUpdateAllMerge = async (versionData) => {
    const resultHtml = domParserMerge(versionData.html_content);
    console.log(resultHtml);
    const data = {
      version_id: versionData.id,
      template_id: versionData.template_id,
      name: versionData.name,
      html_content: resultHtml,
      subject: versionData.subject
    }
    try {
      const result = await updateSingleTemplate(data)
      console.log(result)
    }
    catch (error) {
      console.error(`handleUpdateAllMerge error at UpdateMultiple.js: ${error}`)
    }

  }
  const handleUpdateAll = () => {

    const initialPromises = [];

    selectedVersions.forEach((template_version_item) => {
      const { template_id, versions_array } = template_version_item;

      versions_array.forEach(async (versionId)=> {
        let promise = "";
        const template_version_obj = {
          "template_id" : template_id,
          "version_id" : versionId
        }
        try {
          promise = await fetchTemplateVersion(template_version_obj);
          handleUpdateAllMerge(promise)
        }
        catch (error) {
          console.error(`handleUpdateAll on UpdateMultiple.js failed: ${error}`)
        }
        initialPromises.push(promise)
        
      })
    })
    console.log(selectedTemplates);
    console.log(selectedVersions)
  }

  const placeholderStyle = {
    width: '800px', // Adjust the width as needed
    height: '500px', // Adjust the height as needed
    border: '1px solid #ddd', // Visible border style
    display: 'flex',
    overflow: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const blockStyle = {
    width: '500px', // Adjust the desired width
    maxHeight: '300px', // Adjust the desired max height
    overflow: 'auto', // Add scrollbar when necessary
    border: '1px solid #ddd', // Visible border style
    padding: '10px',
  };

  return (
    <div style={{marginTop: "20px"}}>
    <Grid container spacing={5}>
      <Grid item xs={4}>
        
        <Grid container direction="column">
          <FormControl component="fieldset">
            <FormLabel component="legend">Update Options</FormLabel>
            <RadioGroup value={selectedRadioUpdateOption} onChange={handleRadioChange} row>
              <FormControlLabel value="updateOne" control={<Radio />} label="Update One" />
              <FormControlLabel value="updateMultiple" control={<Radio />} label="Update Multiple" />
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset" sx={{marginTop: "20px"}}>
            <FormLabel component="legend">Template -&gt; Version List</FormLabel>
            {checkBoxList.map((template) => {
              return (<FormControlLabel
                key={`${template.template_id}-${template.version_id}`}
                control={
                  <Checkbox
                    checked={checkedTemplates.some((selected) => selected.template_id === template.template_id && selected.version_id === template.version_id)}
                    onChange={() => handleManageCheckboxList(template)}
                    //value={template}
                  />
                }
                label={`${template.template_name} -> ${template.version_name}`}
              />)
            })}
          </FormControl>

          <FormControl disabled={selectedRadioUpdateOption === "updateOne"} component="fieldset" sx={{marginTop: "20px"}}>
            <FormLabel component="legend">Block Position</FormLabel>
            <RadioGroup name="options" value={selectedRadioOption} onChange={handlePositionChange}>
              <FormControlLabel value="header" control={<Radio />} label="Set as Header" />
              <FormControlLabel value="footer" control={<Radio />} label="Set as Footer" />
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset" sx={{marginTop: "20px"}}>
            <FormLabel component="legend">Create Version</FormLabel>
            <div>
            <Checkbox
              color="primary"
              checked={createVersionChecked}
              onChange={handleCreateVersionChange}
            />
            <span>If clicked, a new version will be created for every updated template</span>  
            </div>
          </FormControl>  
          

          <FormControl component="fieldset" sx={{marginTop: "20px"}}>
            <FormLabel component="legend">Actions</FormLabel>
            <Button variant="outlined" sx={{marginTop: "20px"}} onClick={() => handleMergeContent()}>
             Preview
            </Button>
            <Button variant="contained" sx={{marginTop: "20px"}} onClick={() => handleUpdateAll()}>
              Update all
            </Button>
          </FormControl>
            
          </Grid>
      </Grid>

      <Grid item xs={4}>
        {
          selectedTemplateVersion.html_content ? 
          (
            <div dangerouslySetInnerHTML={{ __html: selectedTemplateVersion.html_content}}/>
          )
          :
          (
            <Paper style={placeholderStyle}>
              <div>Your updated template will render here</div>
            </Paper>
          )
        }
         
      </Grid>

      
            </Grid>
      </div>
  );
};

export default UpdateMultiple;