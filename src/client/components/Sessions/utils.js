import { startOfWeek, endOfWeek } from 'date-fns';
import { uniqBy } from 'lodash';

import instructionSessionIsAt from '../../utils/instructionSessionIsAt';

export const getQueryOptions = (date) => ({
  from: startOfWeek(date),
  to: endOfWeek(date),
});

export const getCourses = (sessions) => {
  const courses = uniqBy(
    sessions.flatMap((session) => session.user?.competenceCourses ?? []),
    ({ id }) => id,
  );

  return courses;
};

export const getInstructedCoursesAt = (sessions, date, hour) => {
  const timeSessions = sessions.filter((session) =>
    instructionSessionIsAt(session, date, hour),
  );

  const courses = getCourses(timeSessions);

  const coursesWithInstructorCounts = courses.map((course) => {
    const usersWithCourseCompetence = uniqBy(
      timeSessions.filter((session) =>
        (session.user?.competenceCourses ?? []).find(
          (competenceCourse) => competenceCourse.id === course.id,
        ),
      ),
      ({ id }) => id,
    );

    return {
      ...course,
      instructorCount: usersWithCourseCompetence.length,
    };
  });

  return coursesWithInstructorCounts;
};
