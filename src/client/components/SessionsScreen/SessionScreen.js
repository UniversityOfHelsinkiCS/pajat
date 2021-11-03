import React from 'react';
import { startOfWeek, endOfWeek } from 'date-fns';
import { useLocation } from 'react-router-dom';

import {
  Typography,
  Card,
  CardContent,
  Box,
  ThemeProvider,
} from '@mui/material';

import usePublicInstructionSessions from '../../hooks/usePublicInstructionSessions';

import { getCurrentMonday } from '../../utils/date';

import getCoursesFromInstructionSessions from '../../utils/getCoursesFromInstructionSessions';
import filterInstructionSessionsCourses from '../../utils/filterInstructionSessionsCourses';
import CourseChip from '../CourseChip';
import SessionCalendar from '../SessionCalendar';
import screenTheme from '../../screenTheme';

const getQueryOptions = (date) => ({
  from: startOfWeek(date),
  to: endOfWeek(date),
});

const REFETCH_INTERVAL = 600000;

const SessionScreen = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const courseCodes = (query.get('courseCodes') ?? '')
    .split(',')
    .filter(Boolean)
    .map((code) => code.toUpperCase());

  const firstDate = getCurrentMonday(new Date());

  const { instructionSessions } = usePublicInstructionSessions({
    ...getQueryOptions(firstDate),
    keepPreviousData: true,
    refetchInterval: REFETCH_INTERVAL,
  });

  const filteredInstructionSessions =
    courseCodes.length > 0
      ? filterInstructionSessionsCourses(instructionSessions ?? [], (course) =>
          courseCodes.includes(course.code),
        )
      : instructionSessions;

  const courses = getCoursesFromInstructionSessions(
    filteredInstructionSessions ?? [],
  );

  return (
    <ThemeProvider theme={screenTheme}>
      <Typography component="h1" variant="h3" mb={2}>
        BK107 Paja / Workshop
      </Typography>

      <Card>
        <CardContent>
          <Box mb={2}>
            {courses.map((course) => (
              <CourseChip
                key={course.id}
                course={course}
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>

          <SessionCalendar
            firstDate={firstDate}
            instructionSessions={filteredInstructionSessions ?? []}
          />
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default SessionScreen;
