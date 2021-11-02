import React from 'react';
import { useField } from 'formik';
import { TextField } from '@mui/material';

const FormikTextField = ({ name, helperText, onBlur, ...props }) => {
  const [field, meta, helpers] = useField(name);

  const showError = meta.error && meta.touched;

  const handleBlur = (e) => {
    helpers.setTouched(true);

    if (typeof onBlur === 'function') {
      onBlur(e);
    }
  };

  return (
    <TextField
      value={field.value ?? ''}
      onChange={(event) => helpers.setValue(event.target.value)}
      onBlur={handleBlur}
      error={showError}
      helperText={showError ? meta.error : helperText}
      {...props}
    />
  );
};

export default FormikTextField;
