import React from 'react';
import { startOfWeek, endOfWeek } from 'date-fns';
import { Box } from '@mui/material';

import usePublicInstructionSessions from '../../hooks/usePublicInstructionSessions';
import getCoursesFromInstructionSessions from '../../utils/getCoursesFromInstructionSessions';
import filterInstructionSessionsByCourses from '../../utils/filterInstructionSessionsByCourses';
import CourseChip from '../CourseChip';
import SessionCalendar from '../SessionCalendar';
import useScreenOptions from '../../hooks/useScreenOptions';
import useWeekCalendarControls from '../../hooks/useWeekCalendarControls';

const getQueryOptions = (date) => ({
  from: startOfWeek(date),
  to: endOfWeek(date),
});

const SessionScreen = () => {
  const { firstDate, ...calendarControls } = useWeekCalendarControls();
  const { courseCodes, controls } = useScreenOptions();

  const { instructionSessions } = usePublicInstructionSessions({
    ...getQueryOptions(firstDate),
    keepPreviousData: true,
  });

  const filteredInstructionSessions =
    courseCodes.length > 0
      ? filterInstructionSessionsByCourses(
          instructionSessions ?? [],
          (course) => courseCodes.includes(course.code),
        )
      : instructionSessions;

  const courses = getCoursesFromInstructionSessions(
    filteredInstructionSessions ?? [],
  );

  return (
    <>
      <Box mb={2}>
        {courses.map((course) => (
          <CourseChip key={course.id} course={course} sx={{ mr: 1, mb: 1 }} />
        ))}
      </Box>

      <SessionCalendar
        firstDate={firstDate}
        {...(controls && calendarControls)}
        instructionSessions={filteredInstructionSessions ?? []}
      />
    </>
  );
};

export default SessionScreen;
