import React from 'react';
import { startOfWeek, endOfWeek } from 'date-fns';

import {
  Typography,
  Card,
  CardContent,
  ThemeProvider,
  Alert,
} from '@mui/material';

import { useParams } from 'react-router-dom';

import usePublicInstructionSessions from '../../hooks/usePublicInstructionSessions';
import { getCurrentMonday } from '../../utils/date';
import filterInstructionSessionsByCourseId from '../../utils/filterInstructionSessionsByCourseId';
import SessionCalendar from '../SessionCalendar';
import screenTheme from '../../screenTheme';
import useCourse from '../../hooks/useCourse';
import PageProgress from '../PageProgress';

const getQueryOptions = (date) => ({
  from: startOfWeek(date),
  to: endOfWeek(date),
});

const REFETCH_INTERVAL = 600000;

const CourseSessionsScreen = () => {
  const { code } = useParams();
  const firstDate = getCurrentMonday(new Date());
  const normalizedCode = code.toUpperCase();

  const { instructionSessions } = usePublicInstructionSessions({
    ...getQueryOptions(firstDate),
    keepPreviousData: true,
    refetchInterval: REFETCH_INTERVAL,
  });

  const { course, isLoading } = useCourse(normalizedCode, {
    refetchInterval: REFETCH_INTERVAL,
  });

  if (isLoading) {
    return <PageProgress />;
  }

  if (!course) {
    return (
      <Card>
        <CardContent>
          <Alert severity="error">
            Course with course code {normalizedCode} is not found
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const courseInstructionSessions = filterInstructionSessionsByCourseId(
    instructionSessions ?? [],
    course.id,
  );

  return (
    <ThemeProvider theme={screenTheme}>
      <Typography component="h1" variant="h3" mb={2}>
        {course.name} BK107 Paja / Workshop
      </Typography>

      <Card>
        <CardContent>
          <SessionCalendar
            firstDate={firstDate}
            instructionSessions={courseInstructionSessions}
          />
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default CourseSessionsScreen;
