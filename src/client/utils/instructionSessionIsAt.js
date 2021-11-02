import { format as formatDate } from 'date-fns';

import { parseHourFromTime } from './date';

const instructionSessionIsAt = (session, date, hour) => {
  const { sessionDate, startTime, endTime } = session;

  const startHour = parseHourFromTime(startTime);
  const endHour = parseHourFromTime(endTime);

  const dateFormat = 'dd.MM.yyyy';

  const normalizedHour = parseInt(hour, 10);
  const formattedSessionDate = formatDate(new Date(sessionDate), dateFormat);
  const formattedDate = formatDate(date, dateFormat);

  return (
    formattedSessionDate === formattedDate &&
    normalizedHour >= startHour &&
    normalizedHour < endHour
  );
};

export default instructionSessionIsAt;
