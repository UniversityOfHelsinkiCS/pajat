const getAuthorizedUser = require('./getAuthorizedUser');
const logout = require('./logout');
const getCourses = require('./getCourses');
const createCourse = require('./createCourse');
const updateCompetenceCourses = require('./updateCompetenceCourses');
const createInsturctionSession = require('./createInstructionSession');
const getMyInstructionSessions = require('./getMyInstructionSessions');
const deleteInstructionSession = require('./deleteInstructionSession');
const getInstructionSessions = require('./getInstructionSessions');
const getInstructorInvitationToken = require('./getInstructorInvitationToken');
const claimInstructorAccess = require('./claimInstructorAccess');
const getInstructors = require('./getInstructors');
const getPublicInstructionSessions = require('./getPublicInstructionSessions');
const getCourse = require('./getCourse');

module.exports = {
  getAuthorizedUser,
  logout,
  getCourses,
  createCourse,
  updateCompetenceCourses,
  createInsturctionSession,
  getMyInstructionSessions,
  deleteInstructionSession,
  getInstructionSessions,
  getInstructorInvitationToken,
  claimInstructorAccess,
  getInstructors,
  getPublicInstructionSessions,
  getCourse,
};
