const filterInstructionSessionsByCourses = (sessions, filterFn) => {
  const filteredSessions = sessions
    .map((session) => ({
      ...session,
      user: session.user
        ? {
            ...session.user,
            competenceCourses: session.user.competenceCourses.filter((course) =>
              filterFn(course),
            ),
          }
        : null,
    }))
    .filter((session) => session.user?.competenceCourses.length > 0);

  return filteredSessions;
};

export default filterInstructionSessionsByCourses;
