const getAuthenticatedUser = require('./getAuthenticatedUser');
const logout = require('./logout');
const getCourses = require('./getCourses');
const createCourse = require('./createCourse');
const updateMyCompetenceCourses = require('./updateMyCompetenceCourses');
const createInsturctionSession = require('./createInstructionSession');
const getMyInstructionSessions = require('./getMyInstructionSessions');
const deleteInstructionSession = require('./deleteInstructionSession');
const getInstructionSessions = require('./getInstructionSessions');
const getInstructorInvitationToken = require('./getInstructorInvitationToken');
const claimInstructorAccess = require('./claimInstructorAccess');
const getInstructors = require('./getInstructors');
const getPublicInstructionSessions = require('./getPublicInstructionSessions');
const getCourse = require('./getCourse');
const getInstructionLocations = require('./getInstructionLocations');
const updateInstructionSession = require('./updateInstructionSession');
const getInstructionSession = require('./getInstructionSession');
const updateCompetenceCourses = require('./updateCompetenceCourses');

module.exports = {
  getAuthenticatedUser,
  logout,
  getCourses,
  createCourse,
  updateMyCompetenceCourses,
  createInsturctionSession,
  getMyInstructionSessions,
  deleteInstructionSession,
  getInstructionSessions,
  getInstructorInvitationToken,
  claimInstructorAccess,
  getInstructors,
  getPublicInstructionSessions,
  getCourse,
  getInstructionLocations,
  updateInstructionSession,
  getInstructionSession,
  updateCompetenceCourses,
};
