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
  border-spacing: 0;
`;

const TimeCell = styled.td`
  border-color: ${({ theme }) => theme.palette.grey['300']};
  border-width: 1px;
  border-style: solid;
  position: relative;
  padding: 0px;
  margin: 0px;

  border-left-width: ${({ isLeftmostCell }) =>
    isLeftmostCell ? '1px' : '0px'};

  border-top-width: ${({ isTopmostCell }) => (isTopmostCell ? '1px' : '0px')};
`;

const DayCell = styled.th`
  padding: ${({ theme }) => theme.spacing(2, 4)};
  font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
  white-space: nowrap;
  border-bottom: 3px solid transparent;

  ${({ isToday, theme }) =>
    isToday &&
    css`
      color: ${theme.palette.primary.main};
      border-bottom: 3px solid ${theme.palette.primary.main};
    `}

  ${({ theme }) => theme.components?.WeekCalendar?.styleOverrides?.dayCell}
`;

const HourCell = styled.td`
  padding: ${({ theme }) => theme.spacing(1, 2)};
  white-space: nowrap;
  text-align: right;
  font-size: 1rem;

  ${({ theme }) => theme.components?.WeekCalendar?.styleOverrides?.hourCell}
`;

const WeekSelect = ({ firstDate, lastDate, onPreviousWeek, onNextWeek }) => (
  <Box display="flex">
    <Box flexGrow={0}>
      <Tooltip title="Previous week">
        <IconButton onClick={onPreviousWeek}>
          <LeftIcon />
        </IconButton>
      </Tooltip>
    </Box>

    <Typography flexGrow={1} variant="h6" component="div" align="center">
      {formatDate(firstDate, 'd.M.')} - {formatDate(lastDate, 'd.M.')}
    </Typography>

    <Box flexGrow={0}>
      <Tooltip title="Next week">
        <IconButton onClick={onNextWeek}>
          <RightIcon />
        </IconButton>
      </Tooltip>
    </Box>
  </Box>
);

const formatHour = (hour) => hour.toString().padStart(2, '0');

const WeekCalendar = ({
  minHour = 8,
  maxHour = 19,
  firstDate,
  numberOfDates = 5,
  renderCell = () => null,
  onPreviousWeek,
  onNextWeek,
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
      {onNextWeek && onPreviousWeek && (
        <WeekSelect
          firstDate={firstWeekDate}
          lastDate={lastWeekDate}
          onPreviousWeek={onPreviousWeek}
          onNextWeek={onNextWeek}
        />
      )}

      <TableContainer>
        <Table cellSpacing={0}>
          <thead>
            <tr>
              <th aria-hidden="true" />
              {weekDates.map((date) => {
                const formattedDate = formatDate(date, 'EE dd.MM.');

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
