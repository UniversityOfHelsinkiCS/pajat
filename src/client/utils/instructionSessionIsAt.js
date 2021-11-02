import { format as formatDate } from 'date-fns';

const parseHour = (time) => time.split(':')[0];

const instructionSessionIsAt = (session, date, hour) => {
  const { sessionDate, startTime, endTime } = session;

  const startHour = parseHour(startTime);
  const endHour = parseHour(endTime);

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
