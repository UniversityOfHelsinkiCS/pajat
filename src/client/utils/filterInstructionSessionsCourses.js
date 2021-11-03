const filterInstructionSessionCourses = (sessions, fn) => {
  const filteredSessions = sessions
    .map((session) => ({
      ...session,
      user: session.user
        ? {
            ...session.user,
            competenceCourses: session.user.competenceCourses.filter((course) =>
              fn(course),
            ),
          }
        : null,
    }))
    .filter((session) => session.user?.competenceCourses.length > 0);

  return filteredSessions;
};

export default filterInstructionSessionCourses;
