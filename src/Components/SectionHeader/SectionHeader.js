import React from 'react';
import { Typography, Divider } from '@material-ui/core';

const SectionHeader = ({ title, subtitle }) => {
  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="subtitle1" component="p" color="textSecondary">
          {subtitle}
        </Typography>
      )}
      <Divider style={{ margin: '20px 0' }} />
    </div>
  );
};

export default SectionHeader;