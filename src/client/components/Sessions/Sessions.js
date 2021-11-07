import React from 'react';

import {
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Button,
} from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import { Link } from 'react-router-dom';

import useInstructionSessions from '../../hooks/useInstructionSessions';

import getCoursesFromInstructionSessions from '../../utils/getCoursesFromInstructionSessions';
import filterInstructionSessionsByCourses from '../../utils/filterInstructionSessionsByCourses';
import CourseChip from '../CourseChip';
import SessionCalendar from '../SessionCalendar';
import PageProgress from '../PageProgress';
import { getQueryOptions, useSelectedCourseCodes } from './utils';
import useAuthorizedUser from '../../hooks/useAuthorizedUser';
import useWeekCalendarControls from '../../hooks/useWeekCalendarControls';

const Sessions = () => {
  const { firstDate, ...calendarControls } = useWeekCalendarControls();
  const { authorizedUser } = useAuthorizedUser();

  const { selectedCourseCodes, toggleCourseCode, clearCourseCodes } =
    useSelectedCourseCodes();

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
      <Box mb={2} display="flex" justifyContent="center">
        <Typography component="h1" variant="h4" flexGrow={1}>
          Sessions
        </Typography>

        {authorizedUser?.instructorAccess && (
          <div>
            <Button variant="contained" component={Link} to="/my-sessions">
              Add session
            </Button>
          </div>
        )}
      </Box>

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
            {...calendarControls}
            instructionSessions={filteredSessions ?? []}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default Sessions;
