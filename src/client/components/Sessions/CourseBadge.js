import React from 'react';
import stringToColor from 'string-to-color';
import { Box } from '@mui/material';
import styled from '@emotion/styled';

const Badge = styled(Box)`
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  background-color: ${({ color }) => color};
  color: ${({ theme, color }) => theme.palette.getContrastText(color)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
`;

const CourseBadge = ({ course, ...props }) => {
  const color = stringToColor(course.id);

  return (
    <Badge color={color} {...props}>
      {Math.min(course.instructorCount, 99)}
    </Badge>
  );
};

export default CourseBadge;
