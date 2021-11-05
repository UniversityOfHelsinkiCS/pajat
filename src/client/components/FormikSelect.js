import React from 'react';
import { useField } from 'formik';
import { Select, FormControl, InputLabel, FormHelperText } from '@mui/material';

const FormikSelect = ({
  name,
  label,
  fullWidth,
  helperText: helperTextProp,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);

  const showError = meta.error && meta.touched;

  const labelId = `${name}FormLabel`;

  const helperText = showError ? meta.error : helperTextProp;

  return (
    <FormControl fullWidth={fullWidth} error={showError}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        value={field.value ?? ''}
        onChange={(event) => helpers.setValue(event.target.value)}
        onBlur={() => helpers.setTouched(true)}
        error={showError}
        fullWidth={fullWidth}
        labelId={labelId}
        label={label}
        {...props}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default FormikSelect;
