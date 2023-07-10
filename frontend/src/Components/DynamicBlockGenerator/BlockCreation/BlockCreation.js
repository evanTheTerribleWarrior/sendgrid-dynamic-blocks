import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import HandlebarsSelect from '../HandlebarsSelect/HandlebarsSelect';
import ComponentsSelect from '../ComponentsSelect/ComponentsSelect';
import ItemCreation from '../ItemCreation/ItemCreation'
import { getCloseHandlebar, getHandlebarsObject, getComponentsObject, getCodeBlockObject } from '../../../Utils/functions';
import {
  TextField,
  Grid,
  Paper,
  Popover,
  MenuItem,
  IconButton, Modal, Button, Typography, Box, FormControl, Radio, RadioGroup,FormControlLabel
} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';

const BlockCreation = ({getCustomBlock}) => {
  const [rows, setRows] = useState([]);
  const [rowIdClicked, setRowClicked] = useState('');
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const [shouldOpenSettings, setOpenSettings] = useState(false);
  const [settingsRow, setSettingsRow] = useState("")

  /////////////////////////////////
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [altText, setAltText] = useState('');
  const [padding, setPadding] = useState({ top: 0, right: 0, bottom: 0, left: 0 });
  const [responsive, setResponsive] = useState(false);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [alignment, setAlignment] = useState('');
  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);

  const handleOpenPopover = (event, row) => {
    setPopoverOpen(true);
    setSettingsAnchorEl(event.currentTarget)
    setSettingsRow(row)
  };

  const handleClosePopover = () => {
    setPopoverOpen(false);
  };

  const handleAlignmentChange = (event) => {
    setAlignment(event.target.value);
  };

  ////////////////////////////////

  
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
  
  /* This function is for selecting a "Condition" value e.g. "equals"
    We use the getHandlebarObject function to get the right condition string
    Then we assign a data object with the condition and the number of
    variables/fields it has
  */
  const handleHandlebarSelectChange = (event, rowId) => {
    const selectedOption = getHandlebarsObject(event.target.value)
    const data = {
      condition: selectedOption.value,
      hasVariables: selectedOption.hasVariables
    }
    setRows((prevRows) => updateRowRecursive(prevRows, rowId, data));
  };

  /* This function is for the variables/text fields that a condition has.
  We get the new data for the field(s) and then update the row*/
  const handleVariableChange = (event, rowId, variableCount) => {
    let data = {};
    if(variableCount === 1)
      data.variable1 = event.target.value;
    else if(variableCount === 2)
      data.variable2 = event.target.value;
    setRows((prevRows) => updateRowRecursive(prevRows, rowId, data));
  };

  /*This function is specific for a component e.g. image field.
  It uses the getComponentsObject function to get the full component fields
  based on the dropdown selection. Then creates a copy of that component
  and updates the row, so the fields are all available*/
  const handleComponentRowChange = (event, rowId) => {
    const component = getComponentsObject(event.target.value, true)
    const data = {
      component: JSON.parse(JSON.stringify(component))
    }
    setRows((prevRows) => updateRowRecursive(prevRows, rowId, data));
  };

  /* Recursive function to get the specific component row*/
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
  

  /* Recursive function to update the value of a specific component field.
  For example if the component is image, updating the URL text field*/
  const handleComponentRowContentChange = (event, rowId, fieldIndex) => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
  
      const findRow = (rows) => {
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          if (row.id === rowId) {
            // Assuming fields array always has at least one object
            row.component.fields[fieldIndex].value = event.target.value;
            return;
          }
          if (row.nestedRows && row.nestedRows.length) {
            findRow(row.nestedRows);
          }
        }
      };
  
      findRow(updatedRows);
  
      return updatedRows;
    });
  }

  /* Function to add a new row. It gets the row parentId,
  and if it is found adds the new row as nested row.
  Otherwise keeps going deeper in nestedRows until it finds it.
  If we are adding top level row, we dont do the recursion
  */
  const addRow = (type, parentId, isNested) => {

    console.log(parentId)
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

    if (!isNested && parentId === -1) {
      setRows((prevRows) => [...prevRows, newRow]);
    } else {
      setRows((prevRows) => addNestedRow(prevRows));
    }
  };

  /* Recursive function to remove a specific row id*/
  const removeRowRecursive = (rowId, rows) => {
    return rows.filter(row => {
      if (row.id === rowId) {
        return false;
      }
      if (row.nestedRows && row.nestedRows.length > 0) {
        row.nestedRows = removeRowRecursive(rowId, row.nestedRows);
      }
      return true;
    });
  };

  const removeRow = (rowId) => {
    console.log(`Removing row: ${rowId}`)
    const updatedRows = removeRowRecursive(rowId, rows);
    setRows(updatedRows);
  };

  /* Handles the click of the Popover icon that allows to add
  a nested row. It saves the clicked row Id, to keep track of which
  level the new row should be added each time */
  const handleAddClick = (event, rowId) => {
    setAnchorEl(event.currentTarget);
    setRowClicked(rowId);
  };

  /* Linked to the above function. When a selection from the popover is chosen,
  it adds the new row taking into account the parent row Id to add
  to the correct level
  */
  const handleAddOptionClick = (option, parentId, isNested) => {
    
    if (option === "condition") {
      addRow("condition", parentId, isNested);
    } else if (option === "component") {
      addRow("component", parentId, isNested);
    }
    setAnchorEl(null);
  };

  /* Function to allow user to change styles for a component */
  const openSettings = (row) => {

    const component = getComponentsObject(row.component.type, true)
    const data = {
      component: JSON.parse(JSON.stringify(component))
    }
    setOpenSettings(true)
    setSettingsRow(row)
  }

  const handleCloseSettings = () => {
    setOpenSettings(false);
  };

  /* Recursive function that generates the code/steps and HTML
  it is used by useEffect to present changes as they happen
  It uses helper functions to get the right code blocks and also the "close" part
  of each condition at each level e.g. opening an if that has 3 nested levels should close
  at the right step*/
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
        html += `${indent}${getCodeBlockObject(row.component.type, row.component.fields[0].value)}\n`
        return;
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
    getCustomBlock(html, code);
    console.table(rows)
    return code;
  };

  /* Function that applies to rows that are Components, not conditions */
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
        <IconButton size="small" disabled={!row.component} onClick={(event) =>  handleOpenPopover(event, row)}>
          <SettingsIcon />
        </IconButton>
      </Grid>

      <Grid item>
        <IconButton size="small" onClick={() =>  removeRow(row.id)}>
          <CloseIcon />
        </IconButton>
      </Grid>
    </>)
    )
  }

  const renderComponentSettings = (row) => {
    return (<>{
      row.type === "component" && popoverOpen && (
      <div>

        <Popover
          open={Boolean(settingsAnchorEl)}
          anchorEl={settingsAnchorEl}
          onClose={() => setSettingsAnchorEl(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
           <Box padding={2}>
        <Typography variant="h6" gutterBottom>
          Choose Styles
        </Typography>

        <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
              <FormControl component="fieldset">
                <RadioGroup value={alignment} onChange={handleAlignmentChange}>
                  <FormControlLabel
                    value="left"
                    control={<Radio />}
                    label="Left"
                  />
                  <FormControlLabel
                    value="center"
                    control={<Radio />}
                    label="Center"
                  />
                  <FormControlLabel
                    value="right"
                    control={<Radio />}
                    label="Right"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

          </Grid>
          </Box>
        </Popover>

      </div>)
    }</>)
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

  const renderConditionAddNestedRow = (row) => {
    return (
      <>
        {row.type === 'condition' && (<>
          <Grid item>
            <IconButton size="small" onClick={(event) => handleAddClick(event, row.id)}>
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
              <MenuItem onClick={() => handleAddOptionClick("condition", rowIdClicked, true)}>Add Nested Condition</MenuItem>
              <MenuItem onClick={() => handleAddOptionClick("component", rowIdClicked, true)}>Add Nested Component</MenuItem>
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
          renderComponentSettings(row)
        }
        {
          renderConditionVariables(row)    
        }
        {
          renderConditionAddNestedRow(row)
        }
        {row.nestedRows &&  row.nestedRows.map((nestedRow) => (
          <Grid item key={nestedRow.id} container alignItems="center" spacing={2} marginLeft={2}>
              {renderRows(nestedRow)}
          </Grid>
        ))}

    </>);



  }

  return (
    <>
        <ItemCreation onAddNewRow={(type) => addRow(type, -1, false)}/>
        <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column' , position: 'relative', border: '1px solid #ccc', marginTop: '10px'}}>
        
        <Grid container direction="column" spacing={2}>
          {rows.map((row) => (
            <Grid item key={row.id} container alignItems="center" spacing={2}>
              {renderRows(row)}
            </Grid>
          ))}
        </Grid>

        </Paper>
      </>);
};

export default BlockCreation;
