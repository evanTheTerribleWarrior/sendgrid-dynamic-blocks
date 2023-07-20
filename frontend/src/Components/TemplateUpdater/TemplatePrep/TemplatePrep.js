import React, { useEffect, useState } from 'react';
import {Button, Grid, Checkbox, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Select, MenuItem } from '@mui/material';
import { fetchSingleTemplateVersion, updateSingleTemplate } from '../../../Utils/functions';
import TemplateRenderer from '../../TemplateRenderer/TemplateRenderer';
import LoadingDialog from '../../LoadingDialog/LoadingDialog';

const TemplatePrep = ({ selectedBlock, selectedTemplates, selectedVersions }) => {

  const [selectedTemplateVersion, setSelectedTemplateVersion] = useState(null);
  const [selectedRadioOption, setSelectedRadioOption] = useState('');
  const [mergedHTML, setMergedHTML] = useState('')
  const [createVersionChecked, setCreateVersionChecked] = useState(false);
  const [selectedRadioUpdateOption, setSelectedRadioUpdateOption] = useState('updateMultiple');
  const [checkBoxList, setCheckBoxList] = useState([])
  const [checkedTemplates, setCheckedTemplates] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const parser = new DOMParser();

  useEffect(() => {
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
    createCheckboxList()
  }, [selectedTemplates, selectedVersions]);

  
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

  const handleManageCheckboxList = async (template) => {
  
    if (selectedRadioUpdateOption === "updateOne"){
      setCheckedTemplates([template])
      const template_version_obj = {
        template_id: template.template_id,
        version_id: template.version_id
      }
      const data = await fetchSingleTemplateVersion(template_version_obj);
      console.log(data)
      setSelectedTemplateVersion(data);
      domParserMergeSingle(data.html_content)
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

  /*
  ******************************
  * Update One Functions - Start
  ******************************
  */

  const [htmlWithOptions, setHtmlWithOptions] = useState(null)
  const [updateSingleSiblings, setUpdateSingleSiblings] = useState([])
  const [selectedSibling, setSelectedSibling] = useState(null)

  const handleSelectSibling = (event) => {
    setSelectedSibling(event.target.value)
    console.log(event.target.value)
  }

  const domParserMergeSingle = (versionHtmlContent) => {

    const doc = parser.parseFromString(versionHtmlContent ? versionHtmlContent : selectedTemplateVersion.html_content, 'text/html');
    const preheaderTable = doc.querySelector('table[data-type="preheader"]');
    const siblings = [];
    let currentNode = preheaderTable.nextElementSibling;
      
    while (currentNode) {
      siblings.push(currentNode);
      currentNode = currentNode.nextElementSibling;
    }

    const updatedHtml = siblings.reduce((acc, sibling, siblingIndex) => {
      const insertedBlock = `<p class="insert-option" ">Position ${siblingIndex}</p>`; 
      return acc + insertedBlock + sibling.outerHTML;
    }, '');

    console.log("UPDATED HTML: " + updatedHtml)

    setHtmlWithOptions(updatedHtml)
    setUpdateSingleSiblings(siblings)
    return;
    
  }

  const domParserMergeSingleFinalise = (siblings) => {

    const updatedHtml = siblings.reduce((acc, sibling, siblingIndex) => {
      if(siblingIndex === selectedSibling) {
        return acc + selectedBlock.content + sibling.outerHTML
      }
      else return acc + sibling.outerHTML;
    }, '');

    console.log(updatedHtml)
    return updatedHtml;
  }

  const handleUpdateSingle = async () => {
    setIsLoading(true)

    let existing_html = selectedTemplateVersion.html_content
    const doc = parser.parseFromString(existing_html, 'text/html');
    const preheaderTable = doc.querySelector('table[data-type="preheader"]');
    if (preheaderTable) {
      while (preheaderTable.nextSibling) {
        preheaderTable.nextSibling.remove();
      }
      preheaderTable.insertAdjacentHTML('afterend', mergedHTML);
    }
    
    const data = {
      version_id: selectedTemplateVersion.id,
      template_id: selectedTemplateVersion.template_id,
      name: selectedTemplateVersion.name,
      html_content: doc.documentElement.outerHTML,
      subject: selectedTemplateVersion.subject
    }
    try {
      const result = await updateSingleTemplate(data, createVersionChecked)
      setIsLoading(false)
    }
    catch (error) {
      console.error(`handleUpdateSingle error at TemplatePrep.js: ${error}`)
      setIsLoading(false)
    }

  }

  const handleClear = () => {
    setMergedHTML(htmlWithOptions)
  }

  /*
  ******************************
  * Update One Functions - End
  ******************************
  */



  const handlePreview = async () => {
    setIsLoading(true)
    if (checkedTemplates.length === 0) return;
    if (selectedRadioUpdateOption === "updateMultiple"){
      const version = await handleExampleTemplateFetch()
      setMergedHTML(domParserMerge(version.html_content))
    }
    else if (selectedRadioUpdateOption === "updateOne") {
      setMergedHTML(domParserMergeSingleFinalise(updateSingleSiblings))
    }
    setIsLoading(false)
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


  const handleUpdateAll = async () => {
    setIsLoading(true)
    const initialPromises = [];

    for ( const template_version_item of checkedTemplates) {
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
    }
    setIsLoading(false)
  }


  return (
    <div style={{marginTop: "20px"}}>
    <Grid container spacing={2}>
      <Grid item >
        
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
            <div style={{ overflow: 'auto' }}>
            {checkBoxList.map((template) => {
              return (<FormControlLabel
                key={`${template.template_id}-${template.version_id}`}
                control={
                  <Checkbox
                    checked={checkedTemplates.some((selected) => selected.template_id === template.template_id && selected.version_id === template.version_id)}
                    onChange={() => handleManageCheckboxList(template)}
                  />
                }
                label={`${template.template_name} -> ${template.version_name}`}
              />)
            })}
            </div>
          </FormControl>
          

          {
            selectedRadioUpdateOption === "updateOne" ? (
              <FormControl component="fieldset" sx={{marginTop: "20px"}}>
                <FormLabel component="legend">Select Block Position</FormLabel>
                <Select
                  value={selectedSibling}
                  onChange={handleSelectSibling}
                  displayEmpty
                  sx={{ minWidth: 200 }}
                  inputProps={{ 'aria-label': 'Select Sibling' }}
                >
                  <MenuItem value="" disabled>
                    Select Position
                  </MenuItem>
                  {updateSingleSiblings.map((sibling, index) => (
                    <MenuItem key={index} value={index}>
                      Position {index}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <FormControl component="fieldset" sx={{marginTop: "20px"}}>
              <FormLabel component="legend">Block Position</FormLabel>
              <RadioGroup name="options" value={selectedRadioOption} onChange={handlePositionChange}>
                <FormControlLabel value="header" control={<Radio />} label="Set as Header" />
                <FormControlLabel value="footer" control={<Radio />} label="Set as Footer" />
              </RadioGroup>
            </FormControl>
            )
          }


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
            {
              selectedRadioUpdateOption === "updateOne" ? (<>
                <Button variant="outlined" disabled={mergedHTML ? false : true} sx={{marginTop: "20px"}} onClick={() => handleClear()}>
                  Clear
                </Button>
                <Button variant="contained" disabled={mergedHTML ? false : true} sx={{marginTop: "20px"}} onClick={() => handleUpdateSingle()}>
                  Update single
                </Button>
                </>): (
                <Button variant="contained" sx={{marginTop: "20px"}} onClick={() => handleUpdateAll()}>
                  Update all
                </Button>
              )
            }
            
          </FormControl>
            
          </Grid>
      </Grid>

      <Grid item>
        {
          selectedRadioUpdateOption === "updateOne" ? (<>
            <TemplateRenderer template={mergedHTML ? mergedHTML : htmlWithOptions} placeholderText="Your updated template will render here"/>
            <style>
        {`
          .insert-option {
            display: block;
            width: 100%;
            margin-top: 8px;
            padding: 6px;
            border: 1px dotted #000;
            border-radius: 4px;
            outline: none;
            text-align: center;
            background-color: #fff;
            height: 40px;
          }
        `}
      </style>
      </>) :
          (
            <TemplateRenderer template={mergedHTML} placeholderText="Your updated template will render here"/>
          )
        }
      </Grid>
      <LoadingDialog open={isLoading} text="Updating your templates, please wait..." />
      
            </Grid>
      </div>
  );
};

export default TemplatePrep;