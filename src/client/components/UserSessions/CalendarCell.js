import React from 'react';

import { ButtonBase } from '@mui/material';

import { Link } from 'react-router-dom';
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

const SessionTimeCell = ({ session, disabled }) => (
  <BaseSessionTimeCell
    component={Link}
    to={`.?instructionSessionId=${session.id}`}
    disabled={disabled}
  />
);

const CalendarCell = ({ date, hour, onNew, instructionSessions }) => {
  const disabled = isPast(endOfDay(date));

  const session = instructionSessions.find((s) =>
    instructionSessionIsAt(s, date, hour),
  );

  if (session) {
    return (
      <SessionTimeCell session={session} disabled={disabled} focusRipple />
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
