import React, { useState } from 'react';

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
import CourseChip from '../CourseChip';
import SessionCalendar from '../SessionCalendar';
import PageProgress from '../PageProgress';

import {
  getQueryOptions,
  useSelectedCourseCodes,
  getFilteredInstructionSessions,
  EXTRA_LOCATION_OPTIONS,
} from './utils';

import useCurrentUser from '../../hooks/useCurrentUser';
import useWeekCalendarControls from '../../hooks/useWeekCalendarControls';
import InstructionLocationSelect from '../InstructionLocationSelect';

const Sessions = () => {
  const { firstDate, ...calendarControls } = useWeekCalendarControls();
  const { currentUser } = useCurrentUser();

  const { selectedCourseCodes, toggleCourseCode, clearCourseCodes } =
    useSelectedCourseCodes();

  const [selectedLocation, setSelectedLocation] = useState(
    EXTRA_LOCATION_OPTIONS[0].value,
  );

  const { instructionSessions, isLoading } = useInstructionSessions({
    ...getQueryOptions(firstDate),
    keepPreviousData: true,
  });

  if (isLoading) {
    return <PageProgress />;
  }

  const courses = getCoursesFromInstructionSessions(instructionSessions);

  const filteredSessions = getFilteredInstructionSessions(
    instructionSessions,
    selectedCourseCodes,
    selectedLocation,
  );

  return (
    <>
      <Box mb={2} display="flex" justifyContent="center">
        <Typography component="h1" variant="h4" flexGrow={1}>
          Sessions
        </Typography>

        {currentUser?.instructorAccess && (
          <div>
            <Button variant="contained" component={Link} to="/my-sessions">
              Add session
            </Button>
          </div>
        )}
      </Box>

      <Card>
        <CardContent>
          <Box
            sx={{
              mb: 2,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Box flexGrow={1}>
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
                  label="Clear course filters"
                  variant="outlined"
                  sx={{ mr: 1, mb: 1 }}
                  onClick={() => clearCourseCodes()}
                />
              )}
            </Box>
            <Box
              sx={{
                ml: { xs: 0, md: 2 },
                mt: { xs: 2, md: 0 },
                flexGrow: { xs: 1, md: 0 },
              }}
            >
              <InstructionLocationSelect
                value={selectedLocation}
                onChange={(event) => setSelectedLocation(event.target.value)}
                extraOptions={EXTRA_LOCATION_OPTIONS}
                sx={{ minWidth: '200px' }}
                fullWidth
              />
            </Box>
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
