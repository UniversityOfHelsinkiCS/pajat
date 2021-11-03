import React, { useState } from 'react';
import { startOfWeek, endOfWeek } from 'date-fns';
import { Typography, Card, CardContent, Box } from '@mui/material';

import useInstructionSessions from '../../hooks/useInstructionSessions';

import {
  getCurrentMonday,
  getPreviousMonday,
  getNextMonday,
} from '../../utils/date';

import getCoursesFromInstructionSessions from '../../utils/getCoursesFromInstructionSessions';
import CourseChip from '../CourseChip';
import SessionCalendar from '../SessionCalendar';
import PageProgress from '../PageProgress';

const getQueryOptions = (date) => ({
  from: startOfWeek(date),
  to: endOfWeek(date),
});

const Sessions = () => {
  const [firstDate, setFirstDate] = useState(() =>
    getCurrentMonday(new Date()),
  );

  const { instructionSessions, isLoading } = useInstructionSessions({
    ...getQueryOptions(firstDate),
    keepPreviousData: true,
  });

  if (isLoading) {
    return <PageProgress />;
  }

  const courses = getCoursesFromInstructionSessions(instructionSessions);

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

          <SessionCalendar
            firstDate={firstDate}
            instructionSessions={instructionSessions ?? []}
            onPreviousWeek={() => setFirstDate(getPreviousMonday(firstDate))}
            onNextWeek={() => setFirstDate(getNextMonday(firstDate))}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default Sessions;
