import React from 'react';

import {
  addDays,
  format as formatDate,
  isToday as dateIsToday,
} from 'date-fns';

import {
  IconButton,
  Typography,
  Box,
  Tooltip,
  TableContainer,
} from '@mui/material';

import LeftIcon from '@mui/icons-material/ChevronLeft';
import RightIcon from '@mui/icons-material/ChevronRight';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const Table = styled.table`
  width: 100%;
  min-width: 500px;
`;

const TimeCell = styled.td`
  border-color: ${({ theme }) => theme.palette.grey['300']};
  border-width: 1px;
  border-style: solid;
  position: relative;

  border-left-width: ${({ isLeftmostCell }) =>
    isLeftmostCell ? '1px' : '0px'};

  border-top-width: ${({ isTopmostCell }) => (isTopmostCell ? '1px' : '0px')};

  ${({ disabled, theme }) =>
    disabled &&
    css`
      background-color: ${theme.palette.grey['50']};
    `}
`;

const DayCell = styled.th`
  padding: ${({ theme }) => theme.spacing(2, 4)};
  font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
  white-space: nowrap;

  ${({ isToday, theme }) =>
    isToday &&
    css`
      color: ${theme.palette.primary.main};
      border-bottom: 3px solid ${theme.palette.primary.main};
    `}
`;

const HourCell = styled.td`
  padding: ${({ theme }) => theme.spacing(1, 2)};
  white-space: nowrap;
`;

const formatHour = (hour) => hour.toString().padStart(2, '0');

const WeekCalendar = ({
  minHour = 8,
  maxHour = 19,
  firstDate,
  numberOfDates = 7,
  renderCell = () => null,
  onPreviousWeek = () => {},
  onNextWeek = () => {},
}) => {
  const hours = [...Array(maxHour - minHour)].map(
    (value, index) => minHour + index,
  );

  const weekDates = [...Array(numberOfDates)].map((value, index) =>
    addDays(firstDate, index),
  );

  const firstWeekDate = weekDates[0];
  const lastWeekDate = weekDates[weekDates.length - 1];

  return (
    <>
      <Box mb={1} display="flex">
        <Box flexGrow={0}>
          <Tooltip title="Previous week">
            <IconButton onClick={onPreviousWeek}>
              <LeftIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Typography flexGrow={1} variant="h6" align="center">
          {formatDate(firstWeekDate, 'd.M.')} -{' '}
          {formatDate(lastWeekDate, 'd.M.')}
        </Typography>

        <Box flexGrow={0}>
          <Tooltip title="Next week">
            <IconButton onClick={onNextWeek}>
              <RightIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <TableContainer>
        <Table cellSpacing={0}>
          <thead>
            <tr>
              <th aria-hidden="true" />
              {weekDates.map((date) => {
                const formattedDate = formatDate(date, 'EE d.M.');

                return (
                  <DayCell isToday={dateIsToday(date)} key={formattedDate}>
                    {formattedDate}
                  </DayCell>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour, hourIndex) => (
              <tr key={hour}>
                <HourCell>
                  {formatHour(hour)} - {formatHour(hour + 1)}
                </HourCell>
                {[...Array(numberOfDates)].map((value, dateIndex) => {
                  const date = weekDates[dateIndex];

                  return (
                    <TimeCell
                      key={dateIndex}
                      isLeftmostCell={dateIndex === 0}
                      isTopmostCell={hourIndex === 0}
                    >
                      {renderCell(date, hour)}
                    </TimeCell>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default WeekCalendar;
