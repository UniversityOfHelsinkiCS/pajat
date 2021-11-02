import React from 'react';
import { Box, Tooltip } from '@mui/material';

import { getInstructedCoursesAt } from './utils';
import CourseBadge from './CourseBadge';

const getTooltipTitle = (course) => {
  const { name, instructorCount } = course;

  return `${name}: ${instructorCount} instructors`;
};

const CalendarCell = ({ date, hour, instructionSessions }) => {
  const courses = getInstructedCoursesAt(instructionSessions, date, hour);

  return (
    <Box p={0.5}>
      {courses.map((course) => (
        <Tooltip key={course.id} title={getTooltipTitle(course)}>
          <span>
            <CourseBadge course={course} sx={{ m: 0.5 }} />
          </span>
        </Tooltip>
      ))}
    </Box>
  );
};

export default CalendarCell;
