import React from 'react';
import MiniDrawer from '../MiniDrawer/MiniDrawer';

const Layout = ({ children }) => {
  return (
    <div>
      <MiniDrawer />
      <div style={{ margin: '100px' }}>{children}</div>
    </div>
  );
};

export default Layout;