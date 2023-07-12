import React from 'react';
import { Dialog, DialogContent, CircularProgress, Typography, Grid } from '@mui/material';

const LoadingDialog = ({ open, text }) => {
  return (
    <Dialog open={open}>
      <DialogContent>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <CircularProgress />
          </Grid>
          <Grid item>
            <Typography variant="body1">{text}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default LoadingDialog;
