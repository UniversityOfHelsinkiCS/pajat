import React from 'react';
import { Box } from '@mui/material';

import FormikTextField from '../FormikTextField';
import FormikInstructionLocationSelect from './FormikInstructionLocationSelect';

const UpdateSessionForm = () => (
  <>
    <Box mb={2}>
      <FormikInstructionLocationSelect
        label="Location"
        name="instructionLocationId"
        helperText="If you choose a remote location, please add details such as a link to the description"
        fullWidth
      />
    </Box>

    <Box mb={2}>
      <FormikTextField
        label="Description"
        name="description"
        multiline
        helperText="Description supports markdown links"
        fullWidth
      />
    </Box>
  </>
);

export default UpdateSessionForm;
