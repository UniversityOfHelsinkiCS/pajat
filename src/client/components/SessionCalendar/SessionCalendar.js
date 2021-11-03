import React from 'react';

import WeekCalendar from '../WeekCalendar';
import CalendarCell from './CalendarCell';

const SessionCalendar = ({
  firstDate,
  instructionSessions,
  onPreviousWeek,
  onNextWeek,
}) => (
  <WeekCalendar
    firstDate={firstDate}
    onPreviousWeek={onPreviousWeek}
    onNextWeek={onNextWeek}
    renderCell={(date, hour) => (
      <CalendarCell
        date={date}
        hour={hour}
        instructionSessions={instructionSessions}
      />
    )}
  />
);

export default SessionCalendar;
