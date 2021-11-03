import React from 'react';
import { ButtonBase } from '@mui/material';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { amber } from '@mui/material/colors';

const BaseCalendarEvent = styled(ButtonBase)`
  display: block;
  width: 100%;
  text-align: left;
  background-color: ${amber['100']};
  border-left: 3px solid ${amber['500']};

  ${({ disabled, theme }) =>
    disabled &&
    css`
      background-color: ${theme.palette.grey['200']};
      border-color: ${theme.palette.grey['500']};
    `}
`;

const CalendarEvent = React.forwardRef((props, ref) => (
  <BaseCalendarEvent ref={ref} {...props} />
));

export default CalendarEvent;
