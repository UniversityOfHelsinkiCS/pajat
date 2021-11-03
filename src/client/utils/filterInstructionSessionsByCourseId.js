import filterInstructionSessionCourses from './filterInstructionSessionsCourses';

const filterInstructionSessionsByCourseId = (sessions, courseId) =>
  filterInstructionSessionCourses(sessions, (course) => course.id === courseId);

export default filterInstructionSessionsByCourseId;
