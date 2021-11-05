import React, { useState } from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import { useSnackbar } from 'notistack';

import WeekCalendar from '../WeekCalendar';
import CreateSessionDialog from './CreateSessionDialog';
import useCreateInstructionSession from '../../hooks/useCreateInstructionSession';
import CalendarCell from './CalendarCell';
import useMyInstructionSessions from '../../hooks/useMyInstructionSessions';
import useDeleteInstructionSession from '../../hooks/useDeleteInstructionSession';
import useInstructionLocations from '../../hooks/useInstructionLocations';

import {
  getPreviousMonday,
  getNextMonday,
  getCurrentMonday,
} from '../../utils/date';

import {
  getInitialValues,
  getInstructionSessionFromValues,
  getQueryOptions,
} from './utils';

const UserSessions = () => {
  const [firstDate, setFirstDate] = useState(() =>
    getCurrentMonday(new Date()),
  );

  const { instructionSessions, refetch } = useMyInstructionSessions(
    getQueryOptions(firstDate),
  );

  const { instructionLocations } = useInstructionLocations();

  const { enqueueSnackbar } = useSnackbar();

  const { mutateAsync: createInstructionSession } =
    useCreateInstructionSession();

  const { mutateAsync: deleteInstructionSession } =
    useDeleteInstructionSession();

  const [selectedTime, setSelectedTime] = useState({ date: null, hour: null });
  const [dialogOpen, setDialogOpen] = useState(false);

  const initialValues = getInitialValues({
    date: selectedTime.date,
    hour: selectedTime.hour,
    instructionLocations: instructionLocations ?? [],
  });

  const handleNewSession = (date, hour) => {
    setSelectedTime({ date, hour });
    setDialogOpen(true);
  };

  const handleDeleteSession = async (session) => {
    try {
      await deleteInstructionSession(session.id);
      refetch();
      enqueueSnackbar('Session has been removed', { variant: 'success' });
    } catch (e) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  };

  const onSubmit = async (values) => {
    const session = getInstructionSessionFromValues(values);

    try {
      await createInstructionSession(session);

      refetch();
      setDialogOpen(false);

      enqueueSnackbar('Session has been added', { variant: 'success' });
    } catch (e) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  };

  return (
    <>
      <Typography component="h1" variant="h4" mb={2}>
        My sessions
      </Typography>

      <Card>
        <CardContent>
          <WeekCalendar
            firstDate={firstDate}
            onNextWeek={() => setFirstDate((date) => getNextMonday(date))}
            onPreviousWeek={() =>
              setFirstDate((date) => getPreviousMonday(date))
            }
            renderCell={(date, hour) => (
              <CalendarCell
                date={date}
                hour={hour}
                instructionSessions={instructionSessions ?? []}
                onNew={() => handleNewSession(date, hour)}
                onDelete={handleDeleteSession}
              />
            )}
          />
        </CardContent>
      </Card>

      <CreateSessionDialog
        initialValues={initialValues}
        onSubmit={onSubmit}
        open={dialogOpen}
        instructionLocations={instructionLocations ?? []}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};

export default UserSessions;
