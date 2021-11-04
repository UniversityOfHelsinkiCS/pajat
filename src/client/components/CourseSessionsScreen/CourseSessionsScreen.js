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

const getQueryOptions = (date) => ({
  from: startOfWeek(date),
  to: endOfWeek(date),
});

const REFETCH_INTERVAL = 600000;

const CourseSessionsScreen = () => {
  const { code } = useParams();
  const query = useQueryParams();
  const firstDate = getCurrentMonday(new Date());
  const normalizedCode = code.toUpperCase();
  const dense = query.dense !== 'false';
  const showCourseName = query.showCourseName === 'true';

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
