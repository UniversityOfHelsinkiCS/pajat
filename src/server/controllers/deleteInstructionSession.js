const { InstructionSession } = require('../models');
const { ForbiddenError, NotFoundError } = require('../utils/errors');

const deleteInstructionSession = async (req, res) => {
  const {
    user,
    params: { id },
  } = req;

  const session = await InstructionSession.query().findById(id);

  if (!session) {
    throw new NotFoundError('Instruction session is not found');
  }

  if (session.userId !== user.id) {
    throw new ForbiddenError("Only instruction session's user can delete it");
  }

  await session.$query().delete();

  res.status(200).end();
};

module.exports = deleteInstructionSession;
