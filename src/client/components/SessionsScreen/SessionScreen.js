import React from 'react';
import { startOfWeek, endOfWeek } from 'date-fns';
import { Typography, Box } from '@mui/material';

import usePublicInstructionSessions from '../../hooks/usePublicInstructionSessions';

import { getCurrentMonday } from '../../utils/date';

import getCoursesFromInstructionSessions from '../../utils/getCoursesFromInstructionSessions';
import filterInstructionSessionsByCourses from '../../utils/filterInstructionSessionsByCourses';
import CourseChip from '../CourseChip';
import SessionCalendar from '../SessionCalendar';
import ScreenContainer from '../ScreenContainer';
import useQueryParams from '../../hooks/useQueryParams';
import usePageReloadTimeout from '../../hooks/usePageReloadTimeout';

const getQueryOptions = (date) => ({
  from: startOfWeek(date),
  to: endOfWeek(date),
});

const RELOAD_INTERVAL = 900000;

const SessionScreen = () => {
  usePageReloadTimeout(RELOAD_INTERVAL);

  const query = useQueryParams();

  const courseCodes = (query.courseCodes ?? '')
    .split(',')
    .filter(Boolean)
    .map((code) => code.toUpperCase());

  const dense = query.dense !== 'false';

  const firstDate = getCurrentMonday(new Date());

  const { instructionSessions } = usePublicInstructionSessions(
    getQueryOptions(firstDate),
  );

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
    <ScreenContainer dense={dense}>
      <Typography component="h1" variant="h3" mb={2}>
        BK107 Paja / Workshop
      </Typography>

      <Box mb={2}>
        {courses.map((course) => (
          <CourseChip key={course.id} course={course} sx={{ mr: 1, mb: 1 }} />
        ))}
      </Box>

      <SessionCalendar
        firstDate={firstDate}
        instructionSessions={filteredInstructionSessions ?? []}
      />
    </ScreenContainer>
  );
};

export default SessionScreen;
