import React from 'react';
import { Tooltip, Box } from '@mui/material';

import getInstructedCoursesAt from '../../utils/getInstructedCoursesAt';
import CourseBadge from './CourseBadge';
import CalendarEvent from '../CalendarEvent';

const getTooltipTitle = (course) => {
  const { name, instructorCount } = course;

  return `${name}: ${instructorCount} instructors`;
};

const CalendarCell = ({ date, hour, instructionSessions }) => {
  const courses = getInstructedCoursesAt(instructionSessions, date, hour);

  const hasSession = courses.length > 0;

  return hasSession ? (
    <CalendarEvent sx={{ p: 0.5 }} focusRipple>
      {courses.map((course) => (
        <Tooltip key={course.id} title={getTooltipTitle(course)}>
          <Box sx={{ display: 'inline-block', m: 0.5 }}>
            <CourseBadge course={course} />
          </Box>
        </Tooltip>
      ))}
    </CalendarEvent>
  ) : null;
};

export default CalendarCell;
