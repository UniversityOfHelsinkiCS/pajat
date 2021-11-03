const filterInstructionSessionsByCourseId = (sessions, courseId) => {
  const filteredSessions = sessions
    .map((session) => ({
      ...session,
      user: session.user
        ? {
            ...session.user,
            competenceCourses: session.user.competenceCourses.filter(
              (course) => course.id === courseId,
            ),
          }
        : null,
    }))
    .filter((session) => session.user?.competenceCourses.length > 0);

  return filteredSessions;
};

export default filterInstructionSessionsByCourseId;
