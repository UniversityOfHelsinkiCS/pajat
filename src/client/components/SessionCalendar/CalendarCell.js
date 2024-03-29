import React, { useState } from 'react';
import { Tooltip, Box } from '@mui/material';

import getInstructedCoursesAt from '../../utils/getInstructedCoursesAt';
import instructionSessionIsAt from '../../utils/instructionSessionIsAt';
import CourseBadge from './CourseBadge';
import CalendarEvent from '../CalendarEvent';
import SessionInstructorsDialog from '../SessionInstructorsDialog';

const getTooltipTitle = (course) => {
  const { name, instructorCount } = course;

  return `${name}: ${instructorCount} instructors`;
};

const CalendarCell = ({ date, hour, instructionSessions }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const courses = getInstructedCoursesAt(instructionSessions, date, hour);

  const sessionInstructionSessions = instructionSessions.filter((session) =>
    instructionSessionIsAt(session, date, hour),
  );

  const hasSession = courses.length > 0;

  return hasSession ? (
    <>
      <SessionInstructorsDialog
        instructionSessions={sessionInstructionSessions}
        sessionDate={date}
        startHour={hour}
        endHour={hour + 1}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
      <CalendarEvent
        sx={{ p: 0.5 }}
        onClick={() => setDialogOpen(true)}
        focusRipple
      >
        {courses.map((course) => (
          <Tooltip key={course.id} title={getTooltipTitle(course)}>
            <Box sx={{ display: 'inline-block', m: 0.5 }}>
              <CourseBadge course={course} />
            </Box>
          </Tooltip>
        ))}
      </CalendarEvent>
    </>
  ) : null;
};

export default CalendarCell;
