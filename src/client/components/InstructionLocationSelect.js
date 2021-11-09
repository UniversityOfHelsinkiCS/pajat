import React from 'react';

import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  InputAdornment,
} from '@mui/material';

import LocationIcon from '@mui/icons-material/Room';

import useInstructionLocations from '../hooks/useInstructionLocations';

const InstructionLocationSelect = ({
  disabled: disabledProp,
  helperText,
  fullWidth,
  label: labelProp,
  error = false,
  extraOptions = [],
  ...props
}) => {
  const { instructionLocations, isLoading } = useInstructionLocations();

  const label = labelProp ?? 'Location';
  const disabled = disabledProp || isLoading;

  return (
    <FormControl fullWidth={fullWidth} error={error}>
      <InputLabel>{label}</InputLabel>
      <Select
        disabled={disabled}
        error={error}
        fullWidth={fullWidth}
        label={label}
        startAdornment={
          <InputAdornment position="start" disablePointerEvents>
            <LocationIcon />
          </InputAdornment>
        }
        {...props}
      >
        {extraOptions.map(({ value, label: optionLabel }) => (
          <MenuItem key={value} value={value}>
            {optionLabel}
          </MenuItem>
        ))}

        {(instructionLocations ?? []).map((location) => (
          <MenuItem value={location.id} key={location.id}>
            {location.name}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default InstructionLocationSelect;
