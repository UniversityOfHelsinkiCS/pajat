import {
  previousMonday,
  nextMonday,
  startOfDay,
  startOfWeek,
  addDays,
} from 'date-fns';

export const getCurrentMonday = (date) => addDays(startOfWeek(date), 1);

export const getPreviousMonday = (date) => startOfDay(previousMonday(date));

export const getNextMonday = (date) => startOfDay(nextMonday(date));

export const parseHourFromTime = (time) => (time ? time.split(':')[0] : null);
