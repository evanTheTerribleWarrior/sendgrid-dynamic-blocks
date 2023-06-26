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