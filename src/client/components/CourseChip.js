import React from 'react';
import { Chip, Avatar } from '@mui/material';
import getCourseColor from '../utils/getCourseColor';

const CourseChip = ({ course, ...props }) => {
  const color = getCourseColor(course);

  return (
    <Chip
      avatar={<Avatar style={{ backgroundColor: color }}> </Avatar>}
      label={course.name}
      variant="outlined"
      {...props}
    />
  );
};

export default CourseChip;
