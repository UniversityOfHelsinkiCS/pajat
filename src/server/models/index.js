const User = require('./User');
const Course = require('./Course');
const UserCourseCompetence = require('./UserCourseCompetence');
const InstructionSession = require('./InstructionSession');
const InstructionLocation = require('./InstructionLocation');

const models = {
  User,
  Course,
  UserCourseCompetence,
  InstructionSession,
  InstructionLocation,
};

module.exports = models;
