import React, { useState } from 'react';
import { MenuItem, IconButton, Menu } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const InitialSelect = ({ onAdd }) => {
  const [selection, setSelection] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    setAnchorEl(null);
    onAdd(option);
  };

  const handleSelectionChange = (event) => {
    setSelection(event.target.value);
  };

  const handleAdd = (selection) => {
    onAdd(selection);
  };

  return (
    <div>
      <IconButton color="primary" onClick={handleClick}>
        <AddIcon />
        Add
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem value="component" onClick={() => handleClose('component')}>
            Add Component
          </MenuItem>
          <MenuItem value="condition" onClick={() => handleClose('condition')}>
            Add Condition
          </MenuItem>
          </Menu>
    </div>
  );
};

export default InitialSelect;
