import React from 'react';
import { Chip, Avatar } from '@mui/material';
import stringToColor from 'string-to-color';

const CourseChip = ({ course, ...props }) => {
  const color = stringToColor(course.id);

  return (
    <Chip
      avatar={<Avatar style={{ backgroundColor: color }}> </Avatar>}
      label={course.name}
      variant="outlined"
      size="small"
      {...props}
    />
  );
};

export default CourseChip;
