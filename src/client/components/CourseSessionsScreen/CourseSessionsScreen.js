import React from 'react';
import { startOfWeek, endOfWeek } from 'date-fns';

import { useParams } from 'react-router-dom';

import usePublicInstructionSessions from '../../hooks/usePublicInstructionSessions';
import filterInstructionSessionsByCourses from '../../utils/filterInstructionSessionsByCourses';
import SessionCalendar from '../SessionCalendar';
import useScreenOptions from '../../hooks/useScreenOptions';
import useWeekCalendarControls from '../../hooks/useWeekCalendarControls';

const getQueryOptions = (date) => ({
  from: startOfWeek(date),
  to: endOfWeek(date),
});

const CourseSessionsScreen = () => {
  const { firstDate, ...calendarControls } = useWeekCalendarControls();
  const { code } = useParams();
  const { controls } = useScreenOptions();
  const normalizedCode = code.toUpperCase();

  const { instructionSessions } = usePublicInstructionSessions({
    ...getQueryOptions(firstDate),
    keepPreviousData: true,
  });

  const courseInstructionSessions = filterInstructionSessionsByCourses(
    instructionSessions ?? [],
    (c) => c.code === normalizedCode,
  );

  return (
    <SessionCalendar
      firstDate={firstDate}
      {...(controls && calendarControls)}
      instructionSessions={courseInstructionSessions}
    />
  );
};

export default CourseSessionsScreen;
