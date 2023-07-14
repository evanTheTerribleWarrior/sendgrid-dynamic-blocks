import React, { useState, useEffect } from 'react';
import { Typography, TextField, Switch, Select, MenuItem, Grid } from '@mui/material';

const StyleSetter = ({ styles, onUpdatedStyles }) => {
  const [updatedStyles, setUpdatedStyles] = useState({});

  useEffect(()=> {
    handleApplyChanges()
  },[updatedStyles, setUpdatedStyles])

  const handleInputChange = (event, name) => {
    const { value, checked } = event.target;
    const updatedValue = event.target.type === 'checkbox' ? checked : value;

    setUpdatedStyles((prevStyles) => ({
      ...prevStyles,
      [name]: updatedValue,
    }));
    
  };

  const handleApplyChanges = () => {
    console.log(updatedStyles)
    onUpdatedStyles(updatedStyles)
  };

  const renderComponent = (style) => {
    const { name, type, label, value } = style;

    switch (type) {
      case 'text':
        return (
          <TextField
            label={label}
            variant="standard"
            value={value}
            onChange={(event) => handleInputChange(event, name)}
          />
        );
      case 'number':
        return (
          <TextField
            label={label}
            variant="standard"
            type="number"
            value={updatedStyles[name] || value}
            onChange={(event) => handleInputChange(event, name)}
            autoComplete="off"
          />
        );
      case 'boolean':

        return (<>
            <Typography variant="subtitle1">{label}</Typography>  
          <Switch
            color="primary"
            checked={updatedStyles[name] || value}
            onChange={(event) => handleInputChange(event, name)}
          />
        </>);
      case 'select':
        return (<>
        <Typography variant="subtitle1">{label}</Typography>  
          <Select
            label={label}
            value={updatedStyles[name] || value}
            onChange={(event) => handleInputChange(event, name)}
          >
            {style.selectValues.map((value)=> (
                <MenuItem value={value}>{value}</MenuItem>
            ))

            }
          </Select>
          </>);
      default:
        return null;
    }
  };

  return (
        <>
        {styles.map((style) => (
            <Grid item xs="auto" key={style.name}>
            {renderComponent(style)}
          </Grid>
        ))}
        </>
  );
};

export default StyleSetter;
