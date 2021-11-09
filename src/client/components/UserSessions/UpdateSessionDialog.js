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
import { format as formatDate } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import DeleteIcon from '@mui/icons-material/Delete';

import useInstructionSession from '../../hooks/useInstructionSession';
import useUpdateInstructionSession from '../../hooks/useUpdateInstructionSession';
import { parseHourFromTime } from '../../utils/date';
import { getUpdateInitialValues } from './utils';
import UpdateSessionForm from './UpdateSessionForm';
import useDeleteInstructionSession from '../../hooks/useDeleteInstructionSession';

const SessionDialogContent = ({
  instructionSession,
  onSubmit,
  onClose,
  onDelete,
}) => {
  const { sessionDate, startTime, endTime } = instructionSession;
  const startHour = parseHourFromTime(startTime);
  const endHour = parseHourFromTime(endTime);

  const handleDelete = () => {
    // eslint-disable-next-line no-alert
    const confirmed = window.confirm(
      'Are you sure you want to delete this session?',
    );

    if (confirmed) {
      onDelete();
    }
  };

  return (
    <>
      <DialogTitle>
        {formatDate(new Date(sessionDate), 'EEEE d.M.')} {startHour}:00 -{' '}
        {endHour}:00
      </DialogTitle>
      <DialogContent>
        <Box mt={1}>
          <UpdateSessionForm />

          <Box mt={2}>
            <Button
              startIcon={<DeleteIcon />}
              variant="outlined"
              color="error"
              onClick={handleDelete}
            >
              Delete session
            </Button>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onSubmit}>
          Update session
        </Button>
      </DialogActions>
    </>
  );
};

const UpdateSessionDialog = ({ onRefetch }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [searchParams, setSearchParams] = useSearchParams();

  const { mutateAsync: deleteInstructionSession } =
    useDeleteInstructionSession();

  const { mutateAsync: updateInstructionSession } =
    useUpdateInstructionSession();

  const instructionSessionId = searchParams.get('instructionSessionId');

  const { instructionSession } = useInstructionSession(instructionSessionId, {
    queryKeySuffix: 'updateInstructionSession',
    cacheTime: 0,
  });

  const open = Boolean(instructionSessionId);

  const handleClose = () => {
    setSearchParams({});
  };

  const handleDeleteSession = async () => {
    try {
      await deleteInstructionSession(instructionSession.id);
      onRefetch();
      handleClose();
      enqueueSnackbar('Session has been deleted', { variant: 'success' });
    } catch (e) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  };

  const handleUpdateSession = async (values) => {
    const { instructionLocationId, description } = values;

    const payload = {
      instructionLocationId,
      description,
      id: instructionSession.id,
    };

    try {
      await await updateInstructionSession(payload);
      onRefetch();
      handleClose();
      enqueueSnackbar('Session has been updated', { variant: 'success' });
    } catch (e) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  };

  const initialValues = getUpdateInitialValues(instructionSession);

  return (
    <Formik
      onSubmit={handleUpdateSession}
      initialValues={initialValues}
      enableReinitialize
    >
      {({ handleSubmit }) => (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          {instructionSession && (
            <SessionDialogContent
              instructionSession={instructionSession}
              onDelete={handleDeleteSession}
              onSubmit={handleSubmit}
              onClose={handleClose}
            />
          )}
        </Dialog>
      )}
    </Formik>
  );
};

export default UpdateSessionDialog;
