import { startOfWeek, endOfWeek } from 'date-fns';
import { useSearchParams } from 'react-router-dom';

export const getQueryOptions = (date) => ({
  from: startOfWeek(date),
  to: endOfWeek(date),
});

export const useSelectedCourseCodes = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCourseCodes = (searchParams.get('courseCodes') ?? '')
    .split(',')
    .filter(Boolean)
    .map((code) => code.toUpperCase());

  const clearCourseCodes = () => {
    setSearchParams({});
  };

  const toggleCourseCode = (code) => {
    const nextCourseCodes = selectedCourseCodes.includes(code)
      ? selectedCourseCodes.filter((c) => c !== code)
      : [...selectedCourseCodes, code];

    if (nextCourseCodes.length > 0) {
      setSearchParams({ courseCodes: nextCourseCodes.join(',') });
    } else {
      clearCourseCodes();
    }
  };

  return { selectedCourseCodes, toggleCourseCode, clearCourseCodes };
};
