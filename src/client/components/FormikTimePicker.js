import React from 'react';
import { useField } from 'formik';
import { TextField } from '@mui/material';
import { TimePicker } from '@mui/lab';

const FormikTimePicker = ({ name, fullWidth, ...props }) => {
  const [field, meta, helpers] = useField(name);

  const showError = meta.error && meta.touched;

  return (
    <TimePicker
      clearable
      ampm={false}
      value={field.value ?? ''}
      onChange={(value) => {
        helpers.setValue(value);
        helpers.setTouched(true);
      }}
      renderInput={(textFieldProps) => (
        <TextField
          {...textFieldProps}
          error={showError}
          helperText={showError ? meta.error : ''}
          onBlur={() => helpers.setTouched(true)}
          fullWidth={fullWidth}
        />
      )}
      {...props}
    />
  );
};

export default FormikTimePicker;
