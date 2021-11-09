import { startOfWeek, endOfWeek } from 'date-fns';
import { useSearchParams } from 'react-router-dom';

import filterInstructionSessionsByCourses from '../../utils/filterInstructionSessionsByCourses';

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

export const getFilteredInstructionSessions = (
  instructionSessions,
  courseCodes,
  instructionLocationId,
) => {
  if (!instructionSessions) {
    return [];
  }

  const courseSessions =
    courseCodes.length > 0
      ? filterInstructionSessionsByCourses(instructionSessions, (course) =>
          courseCodes.includes(course.code),
        )
      : instructionSessions;

  const locationSessions =
    instructionLocationId !== 'any'
      ? courseSessions.filter(
          (session) => session.instructionLocationId === instructionLocationId,
        )
      : courseSessions;

  return locationSessions;
};

export const EXTRA_LOCATION_OPTIONS = [
  {
    value: 'any',
    label: 'Any location',
  },
];
