import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home, Settings, Help } from '@mui/icons-material';

const SideBar = () => {
  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        <ListItem button>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Help />
          </ListItemIcon>
          <ListItemText primary="Help" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideBar;