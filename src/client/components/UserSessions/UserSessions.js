import React, { useState } from 'react';
import { Typography, Card, CardContent } from '@mui/material';

import {
  set as setDate,
  format as formatDate,
  addDays,
  startOfWeek,
  getHours,
} from 'date-fns';

import { useSnackbar } from 'notistack';

import WeekCalendar from '../WeekCalendar';
import CreateSessionDialog from './CreateSessionDialog';
import useCreateInstructionSession from '../../hooks/useCreateInstructionSession';
import CalendarCell from './CalendarCell';
import useMyInstructionSessions from '../../hooks/useMyInstructionSessions';
import useDeleteInstructionSession from '../../hooks/useDeleteInstructionSession';

const getMondayOfWeek = (date) => addDays(startOfWeek(date), 1);

const UserSessions = () => {
  const { instructionSessions, refetch } = useMyInstructionSessions();
  const { enqueueSnackbar } = useSnackbar();

  const { mutateAsync: createInstructionSession } =
    useCreateInstructionSession();

  const { mutateAsync: deleteInstructionSession } =
    useDeleteInstructionSession();

  const [selectedTime, setSelectedTime] = useState({ date: null, hour: null });
  const [dialogOpen, setDialogOpen] = useState(false);

  const initialValues = {
    sessionDate: selectedTime.date,
    startTime: selectedTime.date
      ? setDate(selectedTime.date, {
          hours: selectedTime.hour,
          minutes: 0,
        })
      : null,
    endTime: selectedTime.date
      ? setDate(selectedTime.date, {
          hours: selectedTime.hour + 1,
          minutes: 0,
        })
      : null,
  };

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
    const { sessionDate, startTime, endTime } = values;

    const startHour = getHours(startTime);
    const endHour = getHours(endTime);
    const normalizedSessionDate = formatDate(sessionDate, 'yyyy-MM-dd');

    try {
      await createInstructionSession({
        sessionDate: normalizedSessionDate,
        startHour,
        endHour,
      });

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
            firstDate={getMondayOfWeek(new Date())}
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
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};

export default UserSessions;
