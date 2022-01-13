import React from 'react';

import {
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';

import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSnackbar } from 'notistack';

import { logout } from './utils';

const LinkList = styled(List)`
  min-width: 250px;
`;

const Drawer = ({ user, open, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();

  const links = [
    { label: 'Sessions', to: '/' },
    { label: 'Courses', to: '/courses' },
    user.adminAccess && { label: 'Instructors', to: '/instructors' },
    user.instructorAccess && {
      label: 'My sessions',
      to: '/my-sessions',
    },
    user.instructorAccess && { label: 'My profile', to: '/profile' },
  ].filter(Boolean);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      enqueueSnackbar('Logging out failed', { variant: 'error' });
    }
  };

  return (
    <MuiDrawer anchor="right" open={open} onClose={onClose}>
      <LinkList>
        {links.map(({ label, to }) => (
          <ListItem key={to} disablePadding>
            <ListItemButton key={to} onClick={onClose} component={Link} to={to}>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider component="li" sx={{ my: 1 }} />

        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </ListItem>
      </LinkList>
    </MuiDrawer>
  );
};

export default Drawer;
