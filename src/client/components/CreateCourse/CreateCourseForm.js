import React from 'react';
import { Box, Button } from '@mui/material';

import FormikTextField from '../FormikTextField';

const CreateCourseForm = ({ onSubmit }) => (
  <>
    <Box mb={2}>
      <FormikTextField name="name" label="Name" fullWidth />
    </Box>

    <Box mb={2}>
      <FormikTextField name="code" label="Code" fullWidth />
    </Box>

    <Button onClick={onSubmit} variant="contained">
      Add course
    </Button>
  </>
);

export default CreateCourseForm;
