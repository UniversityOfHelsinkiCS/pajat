import React, { useState } from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import { useSnackbar } from 'notistack';

import WeekCalendar from '../WeekCalendar';
import CreateSessionDialog from './CreateSessionDialog';
import useCreateInstructionSession from '../../hooks/useCreateInstructionSession';
import CalendarCell from './CalendarCell';
import useMyInstructionSessions from '../../hooks/useMyInstructionSessions';
import useInstructionLocations from '../../hooks/useInstructionLocations';
import UpdateSessionDialog from './UpdateSessionDialog';

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

  const handleCreateSession = async (values) => {
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
      <UpdateSessionDialog onRefetch={refetch} />

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
              />
            )}
          />
        </CardContent>
      </Card>

      <CreateSessionDialog
        initialValues={initialValues}
        onSubmit={handleCreateSession}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};

export default UserSessions;
