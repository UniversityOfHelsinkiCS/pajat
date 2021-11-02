const getAuthorizedUser = require('./getAuthorizedUser');
const logout = require('./logout');
const getCourses = require('./getCourses');
const createCourse = require('./createCourse');
const updateCompetenceCourses = require('./updateCompetenceCourses');
const createInsturctionSession = require('./createInstructionSession');
const getMyInstructionSessions = require('./getMyInstructionSessions');
const deleteInstructionSession = require('./deleteInstructionSession');

module.exports = {
  getAuthorizedUser,
  logout,
  getCourses,
  createCourse,
  updateCompetenceCourses,
  createInsturctionSession,
  getMyInstructionSessions,
  deleteInstructionSession,
};
