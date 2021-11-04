import React from 'react';
import { startOfWeek, endOfWeek } from 'date-fns';
import { Typography, Alert } from '@mui/material';

import { useParams } from 'react-router-dom';

import usePublicInstructionSessions from '../../hooks/usePublicInstructionSessions';
import { getCurrentMonday } from '../../utils/date';
import filterInstructionSessionsByCourses from '../../utils/filterInstructionSessionsByCourses';
import SessionCalendar from '../SessionCalendar';
import ScreenContainer from '../ScreenContainer';
import useCourse from '../../hooks/useCourse';
import PageProgress from '../PageProgress';
import useQueryParams from '../../hooks/useQueryParams';
import usePageReloadTimeout from '../../hooks/usePageReloadTimeout';

const getQueryOptions = (date) => ({
  from: startOfWeek(date),
  to: endOfWeek(date),
});

const RELOAD_INTERVAL = 900000;

const CourseSessionsScreen = () => {
  usePageReloadTimeout(RELOAD_INTERVAL);

  const { code } = useParams();
  const query = useQueryParams();

  const firstDate = getCurrentMonday(new Date());
  const normalizedCode = code.toUpperCase();
  const dense = query.dense !== 'false';
  const showCourseName = query.showCourseName === 'true';

  const { instructionSessions } = usePublicInstructionSessions(
    getQueryOptions(firstDate),
  );

  const { course, isLoading } = useCourse(normalizedCode);

  if (isLoading) {
    return <PageProgress />;
  }

  if (!course) {
    return (
      <Alert severity="error">
        Course with course code {normalizedCode} is not found
      </Alert>
    );
  }

  const courseInstructionSessions = filterInstructionSessionsByCourses(
    instructionSessions ?? [],
    (c) => c.id === course.id,
  );

  return (
    <ScreenContainer dense={dense}>
      {showCourseName && (
        <Typography component="h1" variant="h3" mb={2}>
          {course.name}
        </Typography>
      )}

      <SessionCalendar
        firstDate={firstDate}
        instructionSessions={courseInstructionSessions}
      />
    </ScreenContainer>
  );
};

export default CourseSessionsScreen;
