import React from 'react';
import { startOfWeek, endOfWeek } from 'date-fns';

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
import CourseChip from '../CourseChip';
import SessionCalendar from '../SessionCalendar';
import screenTheme from '../../screenTheme';

const getQueryOptions = (date) => ({
  from: startOfWeek(date),
  to: endOfWeek(date),
});

const REFETCH_INTERVAL = 600000;

const SessionScreen = () => {
  const firstDate = getCurrentMonday(new Date());

  const { instructionSessions } = usePublicInstructionSessions({
    ...getQueryOptions(firstDate),
    keepPreviousData: true,
    refetchInterval: REFETCH_INTERVAL,
  });

  const courses = getCoursesFromInstructionSessions(instructionSessions ?? []);

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
            instructionSessions={instructionSessions ?? []}
          />
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default SessionScreen;
