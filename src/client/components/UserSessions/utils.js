import {
  set as setDate,
  getHours,
  format as formatDate,
  startOfWeek,
  endOfWeek,
} from 'date-fns';

export const getQueryOptions = (date) => ({
  from: startOfWeek(date),
  to: endOfWeek(date),
});

export const getInstructionSessionFromValues = (values) => {
  const {
    sessionDate,
    startTime,
    endTime,
    repeat,
    description,
    instructionLocationId,
  } = values;

  const startHour = getHours(startTime);
  const endHour = getHours(endTime);
  const normalizedSessionDate = formatDate(sessionDate, 'yyyy-MM-dd');
  const normalizedRepeat = parseInt(repeat, 10);

  return {
    startHour,
    endHour,
    sessionDate: normalizedSessionDate,
    repeat: normalizedRepeat,
    description,
    instructionLocationId,
  };
};

export const getInitialValues = ({ date, hour, instructionLocations }) => {
  const initialValues = {
    sessionDate: date,
    repeat: '1',
    description: '',
    instructionLocationId: instructionLocations[0]?.id,
    startTime: date
      ? setDate(date, {
          hours: hour,
          minutes: 0,
        })
      : null,
    endTime: date
      ? setDate(date, {
          hours: hour + 1,
          minutes: 0,
        })
      : null,
  };

  return initialValues;
};

export const getUpdateInitialValues = (session) => ({
  instructionLocationId: session?.instructionLocationId,
  description: session?.description ?? '',
});

export const validate = (values) => {
  const { sessionDate, startTime, endTime, repeat, instructionLocationId } =
    values;

  const normalizedRepeat = repeat ? parseInt(repeat, 10) : null;

  const errors = {};

  if (!sessionDate) {
    errors.sessionDate = 'Date is required';
  }

  if (!startTime) {
    errors.startTime = 'Start time is required';
  }

  if (!endTime) {
    errors.endTime = 'End time is required';
  }

  if (!instructionLocationId) {
    errors.instructionLocationId = 'Location is required';
  }

  if (normalizedRepeat && (repeat < 1 || repeat > 48)) {
    errors.repeat = 'Weekly repeat times must be between 1 and 48';
  }

  return errors;
};
