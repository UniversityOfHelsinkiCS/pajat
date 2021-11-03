import React from 'react';
import { Box } from '@mui/material';
import styled from '@emotion/styled';

import getCourseColor from '../../utils/getCourseColor';

const Badge = styled(Box)`
  border-radius: 50%;
  width: 1.8rem;
  height: 1.8rem;
  background-color: ${({ color }) => color};
  color: ${({ theme, color }) => theme.palette.getContrastText(color)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
  border: 2px solid white;
  box-shadow: ${({ theme }) => theme.shadows[1]};
`;

const CourseBadge = ({ course, ...props }) => {
  const color = getCourseColor(course);

  return (
    <Badge color={color} {...props}>
      {Math.min(course.instructorCount, 99)}
    </Badge>
  );
};

export default CourseBadge;
