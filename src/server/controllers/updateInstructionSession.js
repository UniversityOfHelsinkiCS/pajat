const yup = require('yup');

const { InstructionSession } = require('../models');
const { ForbiddenError, NotFoundError } = require('../utils/errors');

const bodySchema = yup.object().shape({
  description: yup.string().trim(),
  instructionLocationId: yup.string().required(),
});

const updateInstructionSession = async (req, res) => {
  const {
    user,
    params: { id },
  } = req;

  const { description, instructionLocationId } = await bodySchema.validate(
    req.body,
  );

  const session = await InstructionSession.query().findById(id);

  if (!session) {
    throw new NotFoundError('Instruction session is not found');
  }

  if (session.userId !== user.id) {
    throw new ForbiddenError('Forbidden');
  }

  await session.$query().patch({ description, instructionLocationId });

  res.send(session);
};

module.exports = updateInstructionSession;
