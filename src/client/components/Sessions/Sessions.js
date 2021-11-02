import React, { useState } from 'react';

import {
  Typography,
  Card,
  CardContent,
  Box,
  CircularProgress,
} from '@mui/material';

import useInstructionSessions from '../../hooks/useInstructionSessions';
import WeekCalendar from '../WeekCalendar';

import {
  getCurrentMonday,
  getPreviousMonday,
  getNextMonday,
} from '../../utils/date';

import { getQueryOptions, getCourses } from './utils';
import CourseChip from './CourseChip';
import CalendarCell from './CalendarCell';

const Sessions = () => {
  const [firstDate, setFirstDate] = useState(() =>
    getCurrentMonday(new Date()),
  );

  const { instructionSessions, isLoading } = useInstructionSessions({
    ...getQueryOptions(firstDate),
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <Box my={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  const courses = getCourses(instructionSessions);

  return (
    <>
      <Typography component="h1" variant="h4" mb={2}>
        Sessions
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

          <WeekCalendar
            firstDate={firstDate}
            onPreviousWeek={() => setFirstDate(getPreviousMonday(firstDate))}
            onNextWeek={() => setFirstDate(getNextMonday(firstDate))}
            renderCell={(date, hour) => (
              <CalendarCell
                date={date}
                hour={hour}
                instructionSessions={instructionSessions}
              />
            )}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default Sessions;
