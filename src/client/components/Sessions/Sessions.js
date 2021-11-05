import React, { useState } from 'react';
import { Typography, Card, CardContent, Box, Chip } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import useInstructionSessions from '../../hooks/useInstructionSessions';

import {
  getCurrentMonday,
  getPreviousMonday,
  getNextMonday,
} from '../../utils/date';

import getCoursesFromInstructionSessions from '../../utils/getCoursesFromInstructionSessions';
import filterInstructionSessionsByCourses from '../../utils/filterInstructionSessionsByCourses';
import CourseChip from '../CourseChip';
import SessionCalendar from '../SessionCalendar';
import PageProgress from '../PageProgress';
import { getQueryOptions, useSelectedCourseCodes } from './utils';

const Sessions = () => {
  const { selectedCourseCodes, toggleCourseCode, clearCourseCodes } =
    useSelectedCourseCodes();

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

  const filteredSessions =
    selectedCourseCodes.length > 0
      ? filterInstructionSessionsByCourses(
          instructionSessions ?? [],
          (course) => selectedCourseCodes.includes(course.code),
        )
      : instructionSessions;

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
                sx={{
                  mr: 1,
                  mb: 1,
                  opacity:
                    selectedCourseCodes.length === 0 ||
                    selectedCourseCodes.includes(course.code)
                      ? 1
                      : 0.5,
                }}
                onClick={() => toggleCourseCode(course.code)}
              />
            ))}
            {selectedCourseCodes.length > 0 && (
              <Chip
                icon={<ClearIcon />}
                label="Clear filters"
                variant="outlined"
                sx={{ mr: 1, mb: 1 }}
                onClick={() => clearCourseCodes()}
              />
            )}
          </Box>

          <SessionCalendar
            firstDate={firstDate}
            instructionSessions={filteredSessions ?? []}
            onPreviousWeek={() => setFirstDate(getPreviousMonday(firstDate))}
            onNextWeek={() => setFirstDate(getNextMonday(firstDate))}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default Sessions;
