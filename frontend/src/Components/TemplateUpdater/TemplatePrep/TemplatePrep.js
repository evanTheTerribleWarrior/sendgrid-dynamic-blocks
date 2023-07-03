import React, { useEffect, useState, useRef } from 'react';
import {Button, Grid, Checkbox, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Paper} from '@mui/material';
import { fetchSingleTemplateVersion, updateSingleTemplate } from '../../../Utils/functions';
import TemplateRenderer from '../../TemplateRenderer/TemplateRenderer';

const TemplatePrep = ({ selectedBlock, selectedTemplates, selectedVersions }) => {

  const [selectedTemplateVersion, setSelectedTemplateVersion] = useState(null);
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

  const handleExampleTemplateFetch = async () => {
    
    const chosen_template = checkedTemplates[Math.floor(Math.random() * checkedTemplates.length)];
    const template_version_obj = {
      template_id: chosen_template.template_id,
      version_id: chosen_template.version_id
    }
    const data = await fetchSingleTemplateVersion(template_version_obj);
    setSelectedTemplateVersion(data);
    return data;
  }

  const domParserMerge = (versionHtmlContent) => {

    const doc = parser.parseFromString(versionHtmlContent ? versionHtmlContent : selectedTemplateVersion.html_content, 'text/html');
    const preheaderTable = doc.querySelector('table[data-type="preheader"]');

    if (selectedRadioOption === "header"){
      if (preheaderTable) {
        preheaderTable.insertAdjacentHTML('afterend', selectedBlock.content);
      }
      console.log("Result: " + doc.documentElement.outerHTML)
      return doc.documentElement.outerHTML;
    }
    else if(selectedRadioOption === "footer") {
      const siblings = [];
      let currentNode = preheaderTable.nextElementSibling;
      
      while (currentNode) {
        siblings.push(currentNode);
        currentNode = currentNode.nextElementSibling;
      }
      console.log(siblings)
      let lastSiblingIndex = siblings.length - 1;
      if (siblings[lastSiblingIndex].getAttribute('data-type') === 'unsubscribe') {
        siblings[lastSiblingIndex].insertAdjacentHTML('beforebegin', selectedBlock.content)
        return doc.documentElement.outerHTML;
      }
      const lastSiblingParent = siblings[lastSiblingIndex];
      if (lastSiblingParent) {
        lastSiblingParent.insertAdjacentHTML('afterend', selectedBlock.content);
      }
      return doc.documentElement.outerHTML;
    }

    
  }
  const handlePreview = async () => {
    if (selectedRadioUpdateOption === "updateMultiple"){
      const version = await handleExampleTemplateFetch()
      setMergedHTML(domParserMerge(version.html_content))
    }
    
  }

  const handleUpdateAllMerge = async (versionData) => {
    const resultHtml = domParserMerge(versionData.html_content);
    const data = {
      version_id: versionData.id,
      template_id: versionData.template_id,
      name: versionData.name,
      html_content: resultHtml,
      subject: versionData.subject
    }
    try {
      const result = await updateSingleTemplate(data, createVersionChecked)
      console.log(result)
    }
    catch (error) {
      console.error(`handleUpdateAllMerge error at UpdateMultiple.js: ${error}`)
    }

  }

  const handleCheckBeforeUpdate = () => {

  }
  const handleUpdateAll = () => {

    const initialPromises = [];

    console.log(checkedTemplates)

    checkedTemplates.forEach( async (template_version_item) => {
      const { template_id, version_id } = template_version_item;
      let promise = "";
      const template_version_obj = {
        "template_id" : template_id,
        "version_id" : version_id
      }
      try {
        promise = await fetchSingleTemplateVersion(template_version_obj);
        handleUpdateAllMerge(promise)
      }
      catch (error) {
        console.error(`handleUpdateAll on UpdateMultiple.js failed: ${error}`)
      }
      initialPromises.push(promise) 
    })
  }

  const placeholderStyle = {
    width: '50vw',
    height: '60vh',
    border: '1px solid #ddd',
    overflow: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const templateRenderStyle = {
    width: '60vw',
    height: '60vh',
    border: '1px solid #ddd',
    //display: 'flex',
    overflow: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
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
            <Button variant="outlined" sx={{marginTop: "20px"}} onClick={() => handlePreview()}>
             Preview
            </Button>
            <Button variant="contained" sx={{marginTop: "20px"}} onClick={() => handleUpdateAll()}>
              Update all
            </Button>
          </FormControl>
            
          </Grid>
      </Grid>

      <Grid item xs={4}>
      <TemplateRenderer template={mergedHTML} placeholderText="Your updated template will render here"/>
         
      </Grid>

      
            </Grid>
      </div>
  );
};

export default TemplatePrep;