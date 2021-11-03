import { uniqBy } from 'lodash';

const getCoursesFromInstructionSessions = (sessions) => {
  const courses = uniqBy(
    sessions.flatMap((session) => session.user?.competenceCourses ?? []),
    ({ id }) => id,
  );

  return courses;
};

export default getCoursesFromInstructionSessions;
