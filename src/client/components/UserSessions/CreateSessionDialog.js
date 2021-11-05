import React from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
} from '@mui/material';

import { Formik } from 'formik';

import CreateSessionForm from './CreateSessionForm';
import { validate } from './utils';

const CreateSessionDialog = ({
  open,
  onClose,
  initialValues,
  onSubmit,
  instructionLocations,
}) => (
  <Formik
    onSubmit={onSubmit}
    initialValues={initialValues}
    validate={validate}
    enableReinitialize
  >
    {({ handleSubmit }) => (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add session</DialogTitle>
        <DialogContent>
          <Box mt={1}>
            <CreateSessionForm instructionLocations={instructionLocations} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Add session
          </Button>
        </DialogActions>
      </Dialog>
    )}
  </Formik>
);

export default CreateSessionDialog;
