import { uniqBy, orderBy } from 'lodash';

const getCoursesFromInstructionSessions = (sessions) => {
  const courses = uniqBy(
    sessions.flatMap((session) => session.user?.competenceCourses ?? []),
    ({ id }) => id,
  );

  return orderBy(courses, ['code']);
};

export default getCoursesFromInstructionSessions;
