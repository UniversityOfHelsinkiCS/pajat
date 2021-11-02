import React from 'react';
import { Box, Grid } from '@mui/material';

import FormikDatePicker from '../FormikDatePicker';
import FormikTimePicker from '../FormikTimePicker';

const CreateSessionForm = () => (
  <>
    <Box mb={2}>
      <FormikDatePicker
        name="sessionDate"
        label="Date"
        minDate={new Date()}
        fullWidth
      />
    </Box>

    <Grid spacing={2} container>
      <Grid item xs={6}>
        <FormikTimePicker
          name="startTime"
          label="Start time"
          views={['hours']}
          inputFormat="HH"
          mask="__"
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <FormikTimePicker
          name="endTime"
          label="End time"
          views={['hours']}
          inputFormat="HH"
          mask="__"
          fullWidth
        />
      </Grid>
    </Grid>
  </>
);

export default CreateSessionForm;
