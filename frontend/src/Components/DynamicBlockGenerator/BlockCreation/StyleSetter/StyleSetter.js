import React, { useState, useEffect } from 'react';
import { Popover, Typography, TextField, Switch, Select, MenuItem, Grid, Stack } from '@mui/material';

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
            value={updatedStyles[name] || value }
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
          />
        );
      case 'boolean':
        return (
          <Switch
            color="primary"
            checked={updatedStyles[name] || false}
            onChange={(event) => handleInputChange(event, name)}
          />
        );
      case 'select':
        return (
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
        );
      default:
        return null;
    }
  };

  return (
        <>
        {styles.map((style) => (
            <Grid item xs="auto" key={style.name}>
            <Typography variant="subtitle1">{style.label}</Typography>
            {renderComponent(style)}
          </Grid>
        ))}
        </>
  );
};

export default StyleSetter;
