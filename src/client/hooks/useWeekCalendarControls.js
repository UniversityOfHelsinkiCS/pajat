import { useState } from 'react';

import {
  getPreviousMonday,
  getNextMonday,
  getCurrentMonday,
} from '../utils/date';

const useWeekCalendarControls = (initialFirstDate) => {
  const [firstDate, setFirstDate] = useState(
    () => initialFirstDate ?? getCurrentMonday(new Date()),
  );

  const onPreviousWeek = () => {
    setFirstDate((date) => getPreviousMonday(date));
  };

  const onNextWeek = () => {
    setFirstDate((date) => getNextMonday(date));
  };

  return { firstDate, onPreviousWeek, onNextWeek };
};

export default useWeekCalendarControls;
