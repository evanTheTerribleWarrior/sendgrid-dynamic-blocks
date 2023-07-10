import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import './styles.css';
import HandlebarsSelect from '../HandlebarsSelect/HandlebarsSelect';
import ComponentsSelect from '../ComponentsSelect/ComponentsSelect';
import ItemCreation from '../ItemCreation/ItemCreation'
import { getCloseHandlebar, getHandlebarsObject, getComponentsObject, getCodeBlockObject } from '../../../Utils/functions';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Popover,
  MenuItem,
  IconButton, Tooltip
} from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from '@mui/icons-material/Add';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import html from 'react-syntax-highlighter/dist/esm/languages/hljs/htmlbars';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
SyntaxHighlighter.registerLanguage('html', html);
const codeStyle = {
  ...atomDark,
  'code[class*="language-"]': {
    borderRadius: '0.4em',
    boxShadow: '0 0.3em 1em -0.2em rgba(0, 0, 0, 0.4)',
    padding: '0.5em',
    margin: '0.5em 0',
  },
};

const BlockCreation = ({getCustomBlock}) => {
  const [rows, setRows] = useState([]);
  const [generatedCode, setGeneratedCode] = useState('');
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  
  /* We use useEffect to update the resulting code every time
  the user changes something. We provide as input all the rows
  that capture essentially each condition + component, going to 
  any depth required
  */
  useEffect(() => {
      generateCode(rows);
  }, [rows]);

  /* This function updates a specific row with specific data
  We do this recursively as the row might exist in any depth
  */
  const updateRowRecursive = (rows, rowId, data) => {
    return rows.map((row) => {
      if (row.id === rowId) {
        return {
          ...row,
          ...data
        };
      } else if (row.nestedRows.length > 0) {
        return {
          ...row,
          nestedRows: updateRowRecursive(row.nestedRows, rowId, data),
        };
      }
      return row;
    });
  };
  
  /* This function is for selecting a "Condition" value e.g. "equals"*/
  const handleHandlebarSelectChange = (event, rowId) => {
    const selectedOption = getHandlebarsObject(event.target.value)
    const data = {
      condition: selectedOption.value,
      hasVariables: selectedOption.hasVariables
    }
    setRows((prevRows) => updateRowRecursive(prevRows, rowId, data));
  };

  const handleVariableChange = (event, rowId, variableCount) => {
    let data = {};
    if(variableCount === 1)
      data.variable1 = event.target.value;
    else if(variableCount === 2)
      data.variable2 = event.target.value;
    setRows((prevRows) => updateRowRecursive(prevRows, rowId, data));
  };

  const handleComponentRowChange = (event, rowId) => {
    const component = getComponentsObject(event.target.value, true)
    const data = {
      component: JSON.parse(JSON.stringify(component))
    }
    setRows((prevRows) => updateRowRecursive(prevRows, rowId, data));
  };


  const findComponentRow = (rows, rowId) => {
    for (const row of rows) {
      if (row.id === rowId && row.type === 'component') {
        return row;
      }
      if (row.nestedRows && row.nestedRows.length > 0) {
        const nestedComponentRow = findComponentRow(row.nestedRows, rowId);
        if (nestedComponentRow) {
          return nestedComponentRow;
        }
      }
    }
    return null;
  };
  

  const handleComponentRowContentChange = (event, rowId, fieldIndex) => {
    const componentRow = findComponentRow(rows, rowId);
  if (componentRow) {
    const updatedComponent = {
      ...componentRow.component,
      fields: [
        ...componentRow.component.fields.slice(0, fieldIndex),
        {
          ...componentRow.component.fields[fieldIndex],
          value: event.target.value,
        },
        ...componentRow.component.fields.slice(fieldIndex + 1),
      ],
    };
    const updatedRows = rows.map((row) =>
      row.id === rowId && row.type === 'component'
        ? { ...row, component: updatedComponent }
        : row
    );
    setRows(updatedRows);
  }
  }

  const addRow = (type, parentId, isNested) => {
    const newRow = {
      id: uuid(),
      parentId: parentId,
      type: type,
      nestedRows: [],
      isNested: isNested
    }

    const addNestedRow = (rows) => {
      return rows.map((row) => {
        if (row.id === parentId) {
          return {
            ...row,
            nestedRows: [...row.nestedRows, newRow],
          };
        } else if (row.nestedRows.length > 0) {
          return {
            ...row,
            nestedRows: addNestedRow(row.nestedRows),
          };
        }
        return row;
      });
    };

    if (!isNested) {
      setRows((prevRows) => [...prevRows, newRow]);
    } else {
      setRows((prevRows) => addNestedRow(prevRows));
    }
  };

  const removeRow = (rowId) => {
    setRows((prevRows) => {
      const updatedRows = prevRows.filter((row) => {
        if (row.id === rowId) {
          if (row.nestedRows) {
            row.nestedRows.forEach((nestedRow) => {
              removeRow(nestedRow.id);
            });
          }
          return false;
        }
        if (row.nestedRows && row.nestedRows.length > 0) {
          row.nestedRows = row.nestedRows.filter((nestedRow) => {
            return nestedRow.id !== rowId;
          });
        }
        return true;
      });
      return updatedRows;
    });
  };

  const handleAddClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAddOptionClick = (option, parentId, isNested) => {
    setAnchorEl(null);
    if (option === "condition") {
      addRow("condition", parentId, isNested);
    } else if (option === "component") {
      addRow("component", parentId, isNested);
    }
  };

  const generateCode = (rows) => {
    let code = "";
    let html = "";
    const generateRowCodeAndHtml = (row, level) => {
      const indent = "  ".repeat(level);
      
      if (row.type === "condition" && row.condition) {
        code += `${indent}${row.condition}`;
        if(row.variable1) code += ` ${row.variable1}`
        if(row.variable2) code += ` ${row.variable2}`
        code += '}}\n'

        const html_condition_value = row.condition + (row.variable1 ? ` ${row.variable1}`: "") + (row.variable2 ? ` ${row.variable2}`: "") + '}}'
        html += `${indent}${getCodeBlockObject("code", html_condition_value)}`

      } else if (row.type === "component" && row.component) {
        code += `${indent}${row.component.fields[0].value}\n`;
        html += `${indent}${getCodeBlockObject(row.component.type, row.component.value)}`
      }
      
      if (row.nestedRows && row.nestedRows.length > 0) {
        row.nestedRows.forEach((nestedRow) => {
          generateRowCodeAndHtml(nestedRow, level + 1);
        });
      }
      
      const close_condition = getCloseHandlebar(row.condition);
      code += `${indent}${close_condition}\n`;
      html += `${indent}${getCodeBlockObject("code", close_condition)}\n`;
    };
    
    rows.forEach((row) => {
      generateRowCodeAndHtml(row, 0);
    });
    setGeneratedHtml(html);
    setGeneratedCode(html);
    getCustomBlock(html, code);
    console.table(rows)
    return code;
  };

  const handleExport = () => {
    const blob = new Blob([generatedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'dynamic_block.html';
    link.click();
    URL.revokeObjectURL(url);
    link.remove();
  };

  const renderComponent = (row) => {
    return ( row.type === "component" && (
      <>
      <Grid item xs={3}>
        <ComponentsSelect onChange={(event) => handleComponentRowChange(event, row.id)}/>
      </Grid>
      {
        (row.type === "component" && row.component && row.component.fields && row.component.fields[0].type === "text") && (
          <>
          <Grid item xs={3}>
              <TextField fullWidth label={row.component.label} value={row.component.fields[0].value} onChange={(event) => handleComponentRowContentChange(event, row.id ,0)} />
          </Grid>
          </>
        )
      }
      <Grid item>
        <IconButton size="small" onClick={() =>  removeRow(row.id)}>
          <CloseIcon />
        </IconButton>
      </Grid>
    </>)
    )
  }

  const renderConditionVariables = (row) => {
    return ( <>{
      row.type === "condition" && (
        <Grid item xs={3}>
          <HandlebarsSelect onChange={(event) => handleHandlebarSelectChange(event, row.id)} />
        </Grid>
      )
    }
      
    
    {row.hasVariables === 1 && (
      <>
      <Grid item xs={3}>
          <TextField fullWidth label="Variable1" value={row.variable1} onChange={(event) => handleVariableChange(event, row.id, 1)} />
      </Grid>
      </>
    )}
    {row.hasVariables === 2 && (
      <>
      <Grid item xs={3}>
          <TextField fullWidth label="Variable1" value={row.variable1} onChange={(event) => handleVariableChange(event, row.id, 1)} />
      </Grid>
      <Grid item xs={3}>
          <TextField fullWidth label="Variable2" value={row.variable2} onChange={(event) => handleVariableChange(event, row.id, 2)} />
      </Grid>
      </>
    )}
    </>)
  }

  const renderConditionNestedRow = (row) => {
    return (
      <>
        {row.type === 'condition' && (<>
          <Grid item>
            <IconButton size="small" onClick={(event) => handleAddClick(event)}>
              <AddIcon />
            </IconButton>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={() => handleAddOptionClick("condition", row.parentId, true)}>Add Nested Condition</MenuItem>
              <MenuItem onClick={() => handleAddOptionClick("component", row.parentId, true)}>Add Nested Component</MenuItem>
            </Popover>
          </Grid>
          <Grid item>
            <IconButton size="small" onClick={() =>  removeRow(row.id)}>
              <CloseIcon />
            </IconButton>
          </Grid>
       </>)
        }
      </>
    )
  }

  const renderRows = (row) => {

    return (<>
        {
          renderComponent(row)    
        }
        {
          renderConditionVariables(row)    
        }
        {
          renderConditionNestedRow(row)
        }
        {row.nestedRows.map((nestedRow) => (
          <div key={nestedRow.id}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <span>----&gt;</span>
              </Grid>
              {renderRows(nestedRow)}
            </Grid>
          </div>
        ))}

    </>);



  }

  return (
    <>
        <ItemCreation onAddNewRow={(type) => addRow(type, -1, false)}/>
        <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column' , position: 'relative'}}>
        
        <Grid container direction="column" spacing={2}>
          {rows.map((row) => (
            <Grid item key={row.id} container alignItems="center" spacing={2}>
              {renderRows(row)}
            </Grid>
          ))}
        </Grid>

        </Paper>
      <Tooltip title="Export Block">
                <IconButton
                sx={{ top: 0, right: 0 }}
                onClick={() => handleExport}
                >
                <GetAppIcon />
            </IconButton>
      </Tooltip>
      </>);
};

export default BlockCreation;


/* <Container>
      <Box sx={{ marginTop: 10}}>
        <Tabs value={currentStep} onChange={handleTabChange} centered>
          <Tab label="1. Create Block" />
          <Tab label="2. Select Templates" disabled={currentStep < 1} />
          <Tab label="3. Preview" disabled={currentStep < 2} />
          <Tab label="4. Finish" disabled={currentStep < 3} />
        </Tabs>
      </Box>

      {renderStep()}

      {currentStep < 2 && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextStep}
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
        >
          Next Step
        </Button>
      )}
    </Container>*/

    const renderStep = () => {
      switch (currentStep) {
      case 0:
          return <DynamicBlockGenerator onGenerateDynamicBlock={handleGeneratedDynamicBlock} />;
      case 1:
          return <DynamicTemplateList onSelectTemplates={handleTemplatesSelect} onSelectVersions={handleVersionsSelect} />;
      case 2:
          return (
                      <Preview 
                          generatedBlock={generatedBlock}
                          selectedTemplates={selectedTemplates} 
                          selectedVersions={selectedVersions}
                      />
                  )
        case 3:
          return (
                      <DynamicTemplatesUpdateFinalStep 
                          generatedBlock={generatedBlock}
                          selectedTemplates={selectedTemplates} 
                      />
                  )
      default:
          return null;
      }
  };

  const handleTemplatesSelect = (templates_array) => {
    console.log(templates_array)
      setSelectedTemplates(templates_array);
  };

  const handleVersionsSelect = (versions_array) => {
    console.log(versions_array)
    setSelectedVersions(versions_array);
};

  const handleTabChange = (event, newValue) => {
      if (newValue <= currentStep) {
      setCurrentStep(newValue);
      }
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
};

{/*<Dialog open={saveDialogOpen} onClose={handleSaveDialogClose}>
        <DialogTitle>Save Block</DialogTitle>
        <DialogContent>
          {folderStructure && <FolderTree folderStructure={folderStructure.folderStructure} onFolderClick={handleOnFolderClick} showFiles={false}/>}
          <TextField
          label="File Name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveDialogClose}>Cancel</Button>
          <Button onClick={handleSaveDynamicBlock} disabled={!fileName}>
            Save
          </Button>
        </DialogActions>
    </Dialog>*/}

    const domParserMerge = () => {

      console.log(selectedTemplateVersion.html_content)
      console.log("Selected block: " + selectedBlock.content)
  
      const parser = new DOMParser();
      const doc = parser.parseFromString(selectedTemplateVersion.html_content, 'text/html');
  
      const table = doc.querySelector('table[data-type="preheader"]');
      if (table) {
        const newElement = parser.parseFromString(selectedBlock.content, 'text/html').body;
        table.insertAdjacentElement('afterend', newElement);
      }
      console.log("Result: " + doc.documentElement.innerHTML)
      return doc.documentElement.innerHTML;
    }



    WORKING TREE 

    import React, { useState } from 'react';
import { TreeView, TreeItem } from '@mui/lab';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import {Menu, MenuItem} from '@mui/material'
import { Folder, InsertDriveFile } from '@mui/icons-material';
import { updateFolderStructure } from '../../Redux/reducers';

const FolderTree = ({ onFolderSelected, onFileSelected, showFiles, allowUpdates }) => {

  const [selectedFolder, setSelectedFolder] = useState("")
  const [selectedFile, setSelectedFile] = useState("")
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [renamingFolderId, setRenamingFolderId] = useState(null);
  const [renamingFolderName, setRenamingFolderName] = useState('');
  const [renamingFileId, setRenamingFileId] = useState(null);
  const [renamingFileName, setRenamingFileName] = useState('');
  const [currentElementType, setCurrentElementType] = useState("")

  const folderStructure = useSelector((state) => state.folderStructure);
  const dispatch = useDispatch()

  const handleContextMenu = (event, node, isFolder) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(event.button)
    console.log(node.id)
    if (isFolder) {
      setSelectedFolder(node)
      setCurrentElementType("folder")
    }
    else {
      setSelectedFile(node)
      setCurrentElementType("file")
    }
    setMenuAnchorEl(event.currentTarget);
    setContextMenuPosition({ x: event.clientX, y: event.clientY }); 
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleOnFolderClick = (folder) => {
    setSelectedFolder(folder)
    if (onFolderSelected) onFolderSelected(folder)
    handleMenuClose()
  }

  const handleOnFileClick = (file) => {
    setSelectedFile(file)
    if (onFileSelected) onFileSelected(file)
    handleMenuClose()
  }

  const handleAddFolderRecursive = (folders) => {
    return folders.map((folder) => {
      if (folder.id === selectedFolder.id) {
        return {
          ...folder,
          children: [...folder.children, { id: uuid(), type: 'folder', name: "New Folder", children: [] }],
        };
      } else if ( folder.children && folder.children.length > 0) {
        return {
          ...folder,
          children: handleAddFolderRecursive(folder.children)
        };
      }
      return folder;
    });
  }

  const handleAddFolder = () => {
    dispatch(updateFolderStructure(handleAddFolderRecursive(folderStructure.folderStructure)));
    handleMenuClose()
  };


  const handleDeleteFolder = () => {
    console.log(selectedFolder)
    handleMenuClose()
  };

  const handleRenameFolder = () => {
    setRenamingFolderId(selectedFolder.id);
    setRenamingFolderName(selectedFolder.name);
    handleMenuClose()
  };

  const handleRenameFile = () => {
    setRenamingFileId(selectedFile.id);
    setRenamingFileName(selectedFile.name);
    handleMenuClose()
  };

  const handleInputChange = (event) => {
    setRenamingFolderName(event.target.value);
  };

  const handleInputFileChange = (event) => {
    setRenamingFileName(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      dispatch(updateFolderStructure(handleRenameFolderRecursive(folderStructure.folderStructure, renamingFolderName)));
      setRenamingFolderId(null);
      setRenamingFolderName('');
    }
  };

  const handleInputKeyPressFile = (event) => {
    if (event.key === 'Enter') {
      dispatch(updateFolderStructure(handleRenameFileRecursive(folderStructure.folderStructure, renamingFileName)));
      setRenamingFileId(null);
      setRenamingFileName('');
    }
  };

  const handleRenameFolderRecursive = (folders, newName) => {
    return folders.map((folder) => {
      if (folder.id === selectedFolder.id) {
        return {
          ...folder,
          name: newName
        };
      } else if ( folder.children && folder.children.length > 0) {
        return {
          ...folder,
          children: handleRenameFolderRecursive(folder.children, newName)
        };
      }
      return folder;
    });
  }

  const handleRenameFileRecursive = (folders, newName) => {
    return folders.map((item) => {
      if (item.id === selectedFile.id) {
        return {
          ...item,
          name: newName
        };
      } else if ( item.children && item.children.length > 0) {
        return {
          ...item,
          children: handleRenameFileRecursive(item.children, newName)
        };
      }
      return item;
    });
  }

  const renderTree = (nodes) => {
    return nodes.map((node) => {
      if (node.children) {
        return (
          <TreeItem 
            key={node.id} 
            nodeId={node.id} 
            label={
              renamingFolderId === node.id ? (
                <input
                  type="text"
                  value={renamingFolderName}
                  onChange={handleInputChange}
                  onKeyPress={(event) => handleInputKeyPress(event, node.id)}
                  onBlur={() => {
                    setRenamingFolderId(null);
                    setRenamingFolderName('');
                  }}
                />
              ) : (
                <>{node.name}</>
              )
            }
            endIcon={<Folder />}
            onContextMenu={(event) => handleContextMenu(event, node, true)} 
            onClick={() => handleOnFolderClick(node)}
              >
            {renderTree(node.children)}
          </TreeItem>
        );
      } else {
        if(showFiles){
          return (
            <TreeItem 
              key={node.id} 
              nodeId={node.id} 
              label={
                renamingFileId === node.id ? (
                  <input
                    type="text"
                    value={renamingFileName}
                    onChange={handleInputFileChange}
                    onKeyPress={(event) => handleInputKeyPressFile(event, node.id)}
                    onBlur={() => {
                      setRenamingFileId(null);
                      setRenamingFileName('');
                    }}
                  />
                ) : (
                  <>{node.name}</>
                )
              }
              endIcon={<InsertDriveFile />}
              onContextMenu={(event) => handleContextMenu(event, node, false)} 
              onClick={() => handleOnFileClick(node)}
              >
            </TreeItem>
          );
        }
        
      }
    });
  };

  const renderMenu = () => {
    return (
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        anchorReference="anchorPosition"
        anchorPosition={{
          top: contextMenuPosition.y,
          left: contextMenuPosition.x,
        }}
        onClose={handleMenuClose}
      >
        {
          currentElementType === "folder" ?
          (
            <>
            <MenuItem onClick={handleAddFolder}>Add Folder</MenuItem>
            <MenuItem onClick={handleRenameFolder}>Rename Folder</MenuItem>
            <MenuItem onClick={handleDeleteFolder}>Delete Folder</MenuItem>
            </>
          )
          :
          (
            <>
              <MenuItem onClick={handleRenameFile}>Rename File</MenuItem>
              <MenuItem onClick={handleDeleteFolder}>Delete Folder</MenuItem>
            </>
          )
        }
        
      </Menu>
    )
  }

  return (
    <TreeView
      sx={{ width: '100%', overflowY: 'auto' }}
      defaultCollapseIcon={<Folder />}
      defaultExpandIcon={<Folder />}
    >
      {renderTree(folderStructure.folderStructure)}
      { allowUpdates ? renderMenu() : <></>}
      
    </TreeView>
  );
};

export default FolderTree;


{/*<div style={tabContainerStyle}>
      <div style={contentStyle}>
        <Tabs value={selectedTab} onChange={handleTabChange} centered variant='fullWidth'>
          <Tab label="Update Single" />
          <Tab label="Update Multiple" />
        </Tabs>
        <Box>
          {selectedTab === 0 && <UpdateSingle 
                            selectedBlock={selectedBlock}
                            selectedTemplates={selectedTemplates} 
                            selectedVersions={selectedVersions}
                        />}
          {selectedTab === 1 && <UpdateMultiple 
                            selectedBlock={selectedBlock}
                            selectedTemplates={selectedTemplates} 
                            selectedVersions={selectedVersions}
          />}
        </Box>
      </div>
    </div>*/}




    Update multiple:


    <Grid container spacing={5} direction="row" sx={{marginTop: "10px"}}>
      <Grid item xs={6}>
        <div style={selectContainerStyle} >
        <div style={blockContainerStyle}>
        <FormControl fullWidth>
          <InputLabel>Select Sample Template</InputLabel>
          <Select onChange={handleExampleTemplateSelect} style={selectStyle}>
          {selectedTemplates.map((template) => (
              <MenuItem key={template.id} value={template.id}>
                  {template.name}
              </MenuItem>
          ))}
          </Select>
        </FormControl>
        <RadioGroup name="options" value={selectedRadioOption} onChange={handleRadioChange}>
          <FormControlLabel value="header" control={<Radio />} label="Set as Header" />
          <FormControlLabel value="footer" control={<Radio />} label="Set as Footer" />
        </RadioGroup>
        <div>
          <Checkbox
            color="primary"
            checked={createVersionChecked}
            onChange={handleCreateVersionChange}
          />
          <span>Create new Version</span>
          <Tooltip title="If selected, a new version will be created for every merged template. If not selected, the current selected versions will be updated">
            <HelpIcon />
          </Tooltip>
          
        </div>
          <Button onClick={() => handleMergeContent()}>
          Merge
        </Button>
        <Button onClick={() => handleUpdateAll()}>
          Update all
        </Button>
        </div>
        </div>
      </Grid>
      <Grid item xs={6}>
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


<Grid item xs={4}>
        <Grid container direction="column">
          <Grid item>
          
          </Grid>
          <Grid item>
            <Paper style={blockStyle}>
              <div dangerouslySetInnerHTML={{ __html: selectedBlock.content}} />
            </Paper>    
          </Grid>
        </Grid>
        
      </Grid>



      {/*<Modal scrollable={true} open={saveModalOpen} onClose={handleSaveModalClose}>
        
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          maxWidth: 400,
          width: '100%',
          outline: 'none',
        }}
      >*/}

      const FormData = require('form-data');
const fs = require('fs');
var path = require('path');
var tmp_dir = require('os').tmpdir();
const axios = require('axios')
const formData = new FormData();
exports.handler = async function(context, event, callback) {

  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'POST');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  const {imgBase64, imgFileName, isValidForSG} = event;

  let newAsset = null;

  let url = '';

  const timeStamp = Date.now()

  if(isValidForSG === 0) {
    const twilioClient = context.getTwilioClient();
    try {
      const extension = imgFileName.split('.').pop().toLowerCase()
      newAsset = await twilioClient.serverless.v1.services(context.SERVICE_SID)
                    .assets
                    .create({friendlyName: `${imgFileName}_${timeStamp}.${extension}`})
      console.log(newAsset.sid)
      url = `https://serverless-upload.twilio.com/v1/Services/${context.SERVICE_SID}/Assets/${newAsset.sid}/Versions`
    }
    catch (error) {
      console.error(error)
      return callback(error)
    }
    
  }
  else if(isValidForSG === 1) {
    url = 'https://api.sendgrid.com/v3/images'
  }

  const imageBuffer = Buffer.from(imgBase64, 'base64');
  
  fs.writeFile(path.join(tmp_dir, imgFileName), imageBuffer, function(err) {
      if (err) return callback(err);

      fs.readdir(tmp_dir, async function(err, files) {
          if (err) return callback(err);        
          const formHeaders = formData.getHeaders();

          console.log(files[0])
          if (isValidForSG === 0) {
            const extension = files[0].split('.').pop().toLowerCase()
            console.log(extension)
            formData.append('Path', `/${files[0]}_${timeStamp}.${extension}`);
            formData.append('Visibility', 'public');
            formData.append('Content', fs.createReadStream(tmp_dir + "/" + files[0]), {
              contentType: (extension === "svg" ? 'image/svg+xml' : `image/${extension}`),
            });

            try{
              const result = await axios.post(url, formData, {
                auth: {
                  username: context.ACCOUNT_SID,
                  password: context.AUTH_TOKEN,
                },
                headers: formHeaders
              })
              let result_url = `https://${context.DOMAIN_NAME}${result.data.path}`
              console.log(result_url)
              response.setBody(JSON.stringify({url: result_url }))
              return callback(null, response)
            }
            catch (error) {
              console.error(error);
              return callback(error)
            }

          }
          else if (isValidForSG === 1) {
            try{
                const result = await axios.post(url, {upload: fs.createReadStream(tmp_dir + "/" + files[0])}, {
                  headers: {
                    ...formHeaders,
                    "Authorization": `Bearer ${context.SG_API_KEY}`
                  },

                })
                console.log(result.data)
                response.setBody(JSON.stringify({url: result.data.url }))
                return callback(null, response)
            }
            catch (error) {
              console.error(error);
              return callback(error)
            }
          }

      });
  });
  
};


import React, {useState, useRef} from 'react';
import SectionHeader from '../SectionHeader/SectionHeader'
import TemplateRenderer from '../TemplateRenderer/TemplateRenderer';
import { uploadImageBase64 } from '../../Utils/functions';
import { Grid, Button, TextField, Paper, Typography, Stack, Switch, Tooltip, IconButton } from '@mui/material';
import { HelpOutline, PanoramaVerticalSelect } from '@mui/icons-material';
import JSZip from 'jszip';

const sectionHeaderContent = {
    title: "Upload your HTML",
    subtitle: "Here you can upload a .zip file with your own html content and css / image folders so that it can be uploaded to Sendgrid"
  }

const fileUploadStyle = {
    border: '4px dashed #aaa',
    padding: '32px',
    textAlign: 'center',
    cursor: 'pointer',
    marginTop: '20px'
};
  

const ZipUploader = () => {

    const [uploadedFile, setUploadedFile] = useState(null);
    const [cssFolderName, setCssFolderName] = useState('');
    const [imgFolderName, setImgFolderName] = useState('');
    const [htmlFileName, setHtmlFileName] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);
    const [trustHtmlSource, setTrustHtmlSource] = useState(false);
    const [uploadLocalImages, setUploadLocalImages] = useState(false);
    const [localPathToPublic, setLocalPathToPublic] = useState({})

    const [processedHTML, setProcessedHTML] = useState("")

    const canvasRef = useRef(null);

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragOver(true);
      };
    
      const handleDragLeave = () => {
        setIsDragOver(false);
      };
    
      const handleDrop = (event) => {
        const file = event.dataTransfer.files[0];
        console.log(file)
        event.preventDefault();
        setIsDragOver(false);
        setUploadedFile(file);
      };
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setUploadedFile(file);
    };

    const getFileType = (bytes) => {
      const uint = new Uint8Array(bytes);
    
      if (uint[0] === 0x3C && uint[1] === 0x3F && uint[2] === 0x78 && uint[3] === 0x6D && uint[4] === 0x6C) {
        // SVG magic bytes: <?xml
        return 'svg';
      } else if (uint[0] === 0x89 && uint[1] === 0x50 && uint[2] === 0x4E && uint[3] === 0x47 && uint[4] === 0x0D && uint[5] === 0x0A && uint[6] === 0x1A && uint[7] === 0x0A) {
        // PNG magic bytes: 0x89 0x50 0x4E 0x47 0x0D 0x0A 0x1A 0x0A
        return 'image';
      } else if (uint[0] === 0xFF && uint[1] === 0xD8 && uint[2] === 0xFF) {
        // JPEG magic bytes: 0xFF 0xD8 0xFF
        return 'image';
      }
    
      return 'unknown';
    };

    const replaceImageUrls = (imageObj) => {
        
        let updatedHTML = processedHTML;

        const cssUrlPattern = /url\(['"]?([^'"\)]+)['"]?\)/g;
        let match;
        //updatedHTML.replace(cssUrlPattern, )


    }

    const convertToPng = (imageFileBase64) => {
      return new Promise((resolve, reject) => {
        const svgImage = new Image();
        svgImage.src = `data:image/svg+xml;base64,${imageFileBase64}`;
        
        svgImage.onload = () => {
          const canvas = canvasRef.current;
          const context = canvas.getContext('2d');
  
          canvas.width = svgImage.width;
          canvas.height = svgImage.height;

          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(svgImage, 0, 0);
  
          // Convert the canvas to PNG
          const pngDataUrl = canvas.toDataURL('image/png');
          const pngBase64 = pngDataUrl.split(',')[1];
  
          resolve(pngBase64);
        };
  
        svgImage.onerror = () => {
          reject(new Error('Failed to load SVG image.'));
        };
      });
    };
  
    const processZipFile = async () => {
      try {
        const zip = new JSZip();
        const zipFile = await zip.loadAsync(uploadedFile);
        
        //const cssFolder = zipFile.folder(cssFolderName || 'css');
        const imgFolder = zipFile.folder(imgFolderName || 'img');
        const htmlFile = zipFile.file(htmlFileName || 'index.html');

        const cssFiles = Object.values(zipFile.files).filter((file) => file.name.endsWith('.css'));
        let cssCode = '';

        for (const cssFile of cssFiles) {
          const code = await cssFile.async('text');
          cssCode += code;
        }

        const cssContents = [];
        cssFolder.forEach( async (relativePath, file) => {
          const cssFile = await file.async('string');
          cssContents.push(cssFile);
        });

        const htmlContents = await htmlFile.async('string');
  
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(htmlContents, 'text/html');
        const headElement = htmlDoc.querySelector('head');
        const styleTag = document.createElement('style');
        styleTag.setAttribute('type', 'text/css');
        styleTag.innerHTML = (await Promise.all(cssContents)).join('\n');
        headElement.appendChild(styleTag);

        const processedHTML = htmlDoc.documentElement.outerHTML;
        setProcessedHTML(processedHTML);

        const imgContents = [];
        imgFolder.forEach( async (relativePath, file) => {
          let imageFileBase64 = await file.async('base64');
          imgContents.push(imageFileBase64)
        })

        const resolvedImgContents = await Promise.all(imgContents)
        console.log(resolvedImgContents)
        return;



        

        /*const localPathToPublic = {}
        imgFolder.forEach( async (relativePath, file) => {
          console.log(file)
          let imageFileBase64 = await file.async('base64');
          const fileData = await file.async('arraybuffer');
          const uint8Array = new Uint8Array(fileData);
          const fileType = getFileType(uint8Array);
          const extension = file.name.split('.').pop().toLowerCase();
          let fileName = file.name.split('/').pop();
          let isValidForSG = 1;
          if (fileType === 'image' && (extension === 'png' || extension === 'jpg' || extension === 'jpeg')) {
            isValidForSG = 1;
          } 
          else if(extension === 'svg' || extension === 'gif' || extension === 'bmp') {
            console.log('Other image type:', fileName);
            imageFileBase64 = await convertToPng(imageFileBase64)
            fileName = fileName.split('.')[0] + "." + "png"
            console.log(fileName)
          }
          else {
            console.log('Unknown type: ' + fileName)
            return;
          }
          const data =  await uploadImageBase64(imageFileBase64, fileName, isValidForSG);
          
          localPathToPublic[relativePath] = data.url

          //replaceImageUrls(obj)
          console.table(localPathToPublic);

          setLocalPathToPublic(localPathToPublic)

        });*/

        

        
      } catch (error) {
        console.log('Error processing zip file:', error);
      }
    };
  
    return (
          <Grid container direction="row" spacing={5}>
            <div><canvas ref={canvasRef} style={{ display: 'none' }} /></div>
            <Grid item xs={12}>
                <SectionHeader title={sectionHeaderContent.title} subtitle={sectionHeaderContent.subtitle}/>
            </Grid>
            <Grid item xs={12}>
            <Paper
                style={{
                    ...fileUploadStyle,
                    borderColor: isDragOver ? 'green' : '',
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                >
                <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                    {uploadedFile? uploadedFile.name : "Click here to select file or drag and drop"}
                    <input
                    id="file-upload"
                    type="file"
                    accept=".zip"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    />
                </label>
                </Paper>
            </Grid>
            <Grid item xs={3} sx={{marginTop: "20px"}}>
            <Typography variant="h6" gutterBottom>
                File and folders names (Optional)
            </Typography>
            <Typography variant="subtitle1" component="p" color="textSecondary">
                We will use these names to find the correct folders (for css and image) and file (for the main html).<br/>
                The default values we will look for are: css, img, index.html
            </Typography>
            
            <Stack spacing={2} direction="column">
            <TextField
            label="CSS Folder Name"
            variant="standard"
            value={cssFolderName}
            onChange={(e) => setCssFolderName(e.target.value)}
          />
          <TextField
            label="IMG Folder Name"
            variant="standard"
            value={imgFolderName}
            onChange={(e) => setImgFolderName(e.target.value)}
          />
          <TextField
            label="HTML File Name"
            variant="standard"
            value={htmlFileName}
            onChange={(e) => setHtmlFileName(e.target.value)}
          />

        <Stack direction="row" alignItems="center">
          <Typography variant="subtitle1">Trust HTML Source</Typography>
          <Switch
            checked={trustHtmlSource}
            onChange={(e) => setTrustHtmlSource(e.target.checked)}
          />
          <Tooltip title="If enabled, the HTML source is trusted and we will not perform HTML sanitization before displaying the HTML. Make sure you trust the source of the HTML">
            <IconButton>
              <HelpOutline />
            </IconButton>
          </Tooltip>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography variant="subtitle1">Upload Local Images to SendGrid</Typography>
          <Switch
            checked={uploadLocalImages}
            onChange={(e) => setUploadLocalImages(e.target.checked)}
          />
          <Tooltip title="If enabled, we will upload all the local images of the relevant folder to the Sendgrid CDN and use that public URL to update the image URL so they are accessible by Sendgrid Editor. The processing time will be longer">
            <IconButton>
              <HelpOutline />
            </IconButton>
          </Tooltip>
        </Stack>
          
            <Button variant="contained" onClick={() => processZipFile()}>Process Zip File</Button>

            </Stack>
            </Grid>
            <Grid item={8}>
                <TemplateRenderer template={processedHTML} placeholderText="Your processed HTML file will render here" trusted={trustHtmlSource}/>
            </Grid>
            
          </Grid>

    );

}

export default ZipUploader;