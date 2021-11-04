import { startOfWeek, endOfWeek } from 'date-fns';
import { useHistory } from 'react-router-dom';

import useQueryParams from '../../hooks/useQueryParams';

export const getQueryOptions = (date) => ({
  from: startOfWeek(date),
  to: endOfWeek(date),
});

export const useSelectedCourseCodes = () => {
  const query = useQueryParams();
  const history = useHistory();

  const selectedCourseCodes = (query.courseCodes ?? '')
    .split(',')
    .filter(Boolean)
    .map((code) => code.toUpperCase());

  const toggleCourseCode = (code) => {
    const nextCourseCodes = selectedCourseCodes.includes(code)
      ? selectedCourseCodes.filter((c) => c !== code)
      : [...selectedCourseCodes, code];

    if (nextCourseCodes.length > 0) {
      history.push({
        pathname: '/',
        search: `?courseCodes=${nextCourseCodes.join(',')}`,
      });
    } else {
      history.push({
        pathname: '/',
        search: '',
      });
    }
  };

  return { selectedCourseCodes, toggleCourseCode };
};
