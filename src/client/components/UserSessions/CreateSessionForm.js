import React from 'react';
import { Box, Grid } from '@mui/material';
import { format as formatDate, addWeeks } from 'date-fns';
import { useField } from 'formik';

import FormikDatePicker from '../FormikDatePicker';
import FormikTimePicker from '../FormikTimePicker';
import FormikTextField from '../FormikTextField';

const getRepeatHelperText = (sessionDate, repeat) => {
  if (!sessionDate || !repeat) {
    return null;
  }

  const normalizedRepeat = parseInt(repeat, 10);

  const lastSessionDate = addWeeks(sessionDate, normalizedRepeat - 1);

  return `Repeats weekly until ${formatDate(lastSessionDate, 'd.M.')}`;
};

const CreateSessionForm = () => {
  const [sessionDateField] = useField('sessionDate');
  const [repeatField] = useField('repeat');

  const repeatHelperText = getRepeatHelperText(
    sessionDateField.value,
    repeatField.value,
  );

  return (
    <>
      <Box mb={2}>
        <FormikDatePicker
          name="sessionDate"
          label="Date"
          minDate={new Date()}
          fullWidth
        />
      </Box>

      <Box mb={2}>
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
      </Box>

      <FormikTextField
        label="Weekly repeat times"
        name="repeat"
        type="number"
        min={1}
        max={48}
        helperText={repeatHelperText}
        fullWidth
      />
    </>
  );
};

export default CreateSessionForm;
