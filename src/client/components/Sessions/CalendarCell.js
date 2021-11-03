import React from 'react';
import { Tooltip, ButtonBase, Box } from '@mui/material';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { amber } from '@mui/material/colors';

import { getInstructedCoursesAt } from './utils';
import CourseBadge from './CourseBadge';

const BaseCell = styled(ButtonBase)`
  padding: ${({ theme }) => theme.spacing(0.5)};
  display: block;
  width: 100%;
  text-align: left;

  ${({ hasSession }) =>
    hasSession &&
    css`
      background-color: ${amber['100']};
      border-left: 3px solid ${amber['500']};
    `}
`;

const getTooltipTitle = (course) => {
  const { name, instructorCount } = course;

  return `${name}: ${instructorCount} instructors`;
};

const CalendarCell = ({ date, hour, instructionSessions }) => {
  const courses = getInstructedCoursesAt(instructionSessions, date, hour);

  return (
    <BaseCell hasSession={courses.length > 0} focusRipple>
      {courses.map((course) => (
        <Tooltip key={course.id} title={getTooltipTitle(course)}>
          <Box sx={{ display: 'inline-block' }}>
            <CourseBadge course={course} sx={{ m: 0.5 }} />
          </Box>
        </Tooltip>
      ))}
    </BaseCell>
  );
};

export default CalendarCell;
