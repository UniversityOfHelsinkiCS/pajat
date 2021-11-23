const { InstructionSession } = require('../models');
const { NotFoundError } = require('../utils/errors');

const getInstructionSession = async (req, res) => {
  const { id } = req.params;

  const session = await InstructionSession.query()
    .findById(id)
    .withGraphFetched('[user.competenceCourses,instructionLocation]');

  if (!session) {
    throw new NotFoundError('Instruction session is not found');
  }

  res.send(session.toPublicObject());
};

module.exports = getInstructionSession;
