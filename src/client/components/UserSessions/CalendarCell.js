import React, { useState, useRef } from 'react';

import {
  ButtonBase,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { isPast, endOfDay } from 'date-fns';

import instructionSessionIsAt from '../../utils/instructionSessionIsAt';
import CalendarEvent from '../CalendarEvent';

const EmptyCell = styled(ButtonBase)`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;

  ${({ disabled, theme }) =>
    disabled &&
    css`
      background-color: ${theme.palette.grey['50']};
    `}
`;

const BaseSessionTimeCell = styled(CalendarEvent)`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
`;

const SessionTimeCell = ({ session, disabled, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const cellRef = useRef();

  const handleDelete = () => {
    onDelete(session);
    setMenuOpen(false);
  };

  return (
    <>
      <Menu
        anchorEl={cellRef.current}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      >
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete session</ListItemText>
        </MenuItem>
      </Menu>

      <BaseSessionTimeCell
        ref={cellRef}
        disabled={disabled}
        onClick={() => setMenuOpen(true)}
      />
    </>
  );
};

const CalendarCell = ({ date, hour, onNew, onDelete, instructionSessions }) => {
  const disabled = isPast(endOfDay(date));

  const session = instructionSessions.find((s) =>
    instructionSessionIsAt(s, date, hour),
  );

  if (session) {
    return (
      <SessionTimeCell
        session={session}
        disabled={disabled}
        onDelete={onDelete}
        focusRipple
      />
    );
  }

  return (
    <EmptyCell
      disabled={disabled}
      onClick={() => onNew(date, hour)}
      focusRipple
    />
  );
};

export default CalendarCell;
