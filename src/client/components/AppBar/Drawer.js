import React from 'react';

import {
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const LinkList = styled(List)`
  min-width: 250px;
`;

const Drawer = ({ authorizedUser, open, onClose }) => {
  const links = [
    { label: 'Sessions', to: '/' },
    { label: 'Courses', to: '/courses' },
    authorizedUser.instructorAccess && {
      label: 'My sessions',
      to: '/my-sessions',
    },
    authorizedUser.instructorAccess && { label: 'My profile', to: '/profile' },
  ].filter(Boolean);

  return (
    <MuiDrawer anchor="right" open={open} onClose={onClose}>
      <LinkList>
        {links.map(({ label, to }) => (
          <ListItem button key={to} onClick={onClose} component={Link} to={to}>
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </LinkList>
    </MuiDrawer>
  );
};

export default Drawer;
