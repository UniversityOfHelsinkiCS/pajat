import React, { useState, useRef } from 'react';
import { ButtonBase, Menu, MenuItem } from '@mui/material';
import styled from '@emotion/styled';
import { amber } from '@mui/material/colors';
import { isPast, endOfDay } from 'date-fns';
import { css } from '@emotion/react';

import instructionSessionIsAt from '../../utils/instructionSessionIsAt';

const BaseCell = styled(ButtonBase)`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
`;

const DisabledEmptyCell = styled(BaseCell)`
  background-color: ${({ theme }) => theme.palette.grey['50']};
`;

const SessionTimeCellBase = styled(BaseCell)`
  background-color: ${amber['100']};
  border-left: 3px solid ${amber['500']};

  ${({ disabled, theme }) =>
    disabled &&
    css`
      background-color: ${theme.palette.grey['200']};
      border-color: ${theme.palette.grey['500']};
    `}
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
        <MenuItem onClick={handleDelete}>Remove session</MenuItem>
      </Menu>

      <SessionTimeCellBase
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

  return disabled ? (
    <DisabledEmptyCell disabled={disabled} />
  ) : (
    <BaseCell onClick={() => onNew(date, hour)} focusRipple />
  );
};

export default CalendarCell;
