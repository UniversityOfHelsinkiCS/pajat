import React, { useState } from 'react';

import { AppBar as MuiAppBar, Box, Toolbar, Button } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

import useCurrentUser from '../../hooks/useCurrentUser';
import Drawer from './Drawer';
import Logo from './Logo';
import loginAsService from '../../utils/loginAsService';

const AppBar = () => {
  const { currentUser } = useCurrentUser();
  const isLoginAs = Boolean(loginAsService.getUsername());

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <MuiAppBar position="static">
        <Toolbar>
          <Box flexGrow={1}>
            <Logo />
          </Box>
          {currentUser && (
            <Button
              color="inherit"
              startIcon={<MenuIcon />}
              onClick={() => setDrawerOpen(true)}
            >
              {currentUser.displayName}
              {isLoginAs && <> (login as)</>}
            </Button>
          )}
        </Toolbar>
      </MuiAppBar>
      {currentUser && (
        <Drawer
          user={currentUser}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      )}
    </>
  );
};

export default AppBar;
