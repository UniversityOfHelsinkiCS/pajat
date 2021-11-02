const { InstructionSession } = require('../models');
const { ForbiddenError } = require('../utils/errors');

const getMyInstructionSessions = async (req, res) => {
  const { user } = req;

  if (!user.hasInstructorAccess()) {
    throw new ForbiddenError('Instructor access is required');
  }

  const instructionSessions = await InstructionSession.query().where({
    userId: req.user.id,
  });

  res.send(instructionSessions);
};

module.exports = getMyInstructionSessions;
