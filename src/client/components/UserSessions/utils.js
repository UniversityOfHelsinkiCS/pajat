import {
  set as setDate,
  previousMonday,
  nextMonday,
  startOfDay,
  getHours,
  format as formatDate,
  startOfWeek,
  endOfWeek,
  addDays,
} from 'date-fns';

export const getCurrentMonday = (date) => addDays(startOfWeek(date), 1);

export const getPreviousMonday = (date) => startOfDay(previousMonday(date));

export const getNextMonday = (date) => startOfDay(nextMonday(date));

export const getQueryOptions = (date) => ({
  from: startOfWeek(date),
  to: endOfWeek(date),
});

export const getInstructionSessionFromValues = (values) => {
  const { sessionDate, startTime, endTime } = values;

  const startHour = getHours(startTime);
  const endHour = getHours(endTime);
  const normalizedSessionDate = formatDate(sessionDate, 'yyyy-MM-dd');

  return {
    startHour,
    endHour,
    sessionDate: normalizedSessionDate,
  };
};

export const getInitialValues = (date, hour) => {
  const initialValues = {
    sessionDate: date,
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

export const validate = (values) => {
  const { sessionDate, startTime, endTime } = values;
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

  return errors;
};
