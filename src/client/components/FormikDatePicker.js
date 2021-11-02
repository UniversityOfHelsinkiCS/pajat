import React from 'react';
import { useField } from 'formik';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/lab';

const FormikDatePicker = ({ name, fullWidth, ...props }) => {
  const [field, meta, helpers] = useField(name);

  const showError = meta.error && meta.touched;

  return (
    <DatePicker
      value={field.value ?? ''}
      onChange={(value) => {
        helpers.setValue(value);
      }}
      renderInput={(textFieldProps) => (
        <TextField
          {...textFieldProps}
          error={showError}
          helperText={showError ? meta.error : ''}
          fullWidth={fullWidth}
        />
      )}
      {...props}
    />
  );
};

export default FormikDatePicker;
