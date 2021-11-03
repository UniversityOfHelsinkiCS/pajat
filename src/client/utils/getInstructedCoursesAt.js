import { uniqBy } from 'lodash';

import instructionSessionIsAt from './instructionSessionIsAt';
import getCoursesFromInstructionSessions from './getCoursesFromInstructionSessions';

const getInstructedCoursesAt = (sessions, date, hour) => {
  const timeSessions = sessions.filter((session) =>
    instructionSessionIsAt(session, date, hour),
  );

  const courses = getCoursesFromInstructionSessions(timeSessions);

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

export default getInstructedCoursesAt;
