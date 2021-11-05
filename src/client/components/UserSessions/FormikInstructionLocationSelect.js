import React from 'react';
import { MenuItem } from '@mui/material';

import FormikSelect from '../FormikSelect';
import useInstructionLocations from '../../hooks/useInstructionLocations';

const FormikInstructionLocationSelect = ({ disabled, ...props }) => {
  const { instructionLocations, isLoading } = useInstructionLocations();

  return (
    <FormikSelect disabled={isLoading || disabled} {...props}>
      {(instructionLocations ?? []).map((location) => (
        <MenuItem value={location.id} key={location.id}>
          {location.name}
        </MenuItem>
      ))}
    </FormikSelect>
  );
};

export default FormikInstructionLocationSelect;
