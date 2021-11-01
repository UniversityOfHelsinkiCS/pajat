import React, { useState } from 'react';

import { AppBar as MuiAppBar, Box, Toolbar, Button } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

import useAuthorizedUser from '../../hooks/useAuthorizedUser';
import Drawer from './Drawer';
import Logo from './Logo';

const AppBar = () => {
  const { authorizedUser } = useAuthorizedUser();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <MuiAppBar position="static">
        <Toolbar>
          <Box flexGrow={1}>
            <Logo />
          </Box>
          {authorizedUser && (
            <Button
              color="inherit"
              startIcon={<MenuIcon />}
              onClick={() => setDrawerOpen(true)}
            >
              {authorizedUser.displayName}
            </Button>
          )}
        </Toolbar>
      </MuiAppBar>
      {authorizedUser && (
        <Drawer
          authorizedUser={authorizedUser}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      )}
    </>
  );
};

export default AppBar;
