import React from 'react';
import { FormControlLabel, Switch } from '@mui/material';

const CodeViewSwitch = ({ checked, onChange }) => {
  return (
    <FormControlLabel sx={{ pt: 4 }}
      control={<Switch checked={checked} onChange={onChange} />}
      label={checked ? 'Code View' : 'UI View'}
    />
  );
};

export default CodeViewSwitch;
