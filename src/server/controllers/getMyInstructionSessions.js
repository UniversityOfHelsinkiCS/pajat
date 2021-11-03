const yup = require('yup');
const dateFns = require('date-fns');

const { InstructionSession } = require('../models');
const { ForbiddenError } = require('../utils/errors');

const querySchema = yup.object().shape({
  from: yup.date().default(() => dateFns.subDays(new Date(), 30)),
  to: yup
    .date()
    .default(() => dateFns.addDays(new Date(), 30))
    .min(yup.ref('from')),
});

const getMyInstructionSessions = async (req, res) => {
  const { user } = req;

  if (!user.hasInstructorAccess()) {
    throw new ForbiddenError('Instructor access is required');
  }

  const { from, to } = await querySchema.validate(req.query);

  const instructionSessions = await InstructionSession.query()
    .where({
      userId: user.id,
    })
    .andWhere('sessionDate', '>=', from)
    .andWhere('sessionDate', '<=', to);

  res.send(instructionSessions);
};

module.exports = getMyInstructionSessions;
