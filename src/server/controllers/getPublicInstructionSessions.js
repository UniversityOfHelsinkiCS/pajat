const yup = require('yup');
const dateFns = require('date-fns');

const { InstructionSession } = require('../models');
const { UserInputError } = require('../utils/errors');

const querySchema = yup.object().shape({
  from: yup.date().default(() => dateFns.subDays(new Date(), 30)),
  to: yup
    .date()
    .default(() => dateFns.addDays(new Date(), 30))
    .min(yup.ref('from')),
});

const getPublicInstructionSessions = async (req, res) => {
  const { from, to } = await querySchema.validate(req.query);

  if (dateFns.differenceInDays(from, to) > 180) {
    throw new UserInputError('Maximum from and to range is 180 days');
  }

  const instructionSessions = await InstructionSession.query()
    .andWhere('sessionDate', '>=', from)
    .andWhere('sessionDate', '<=', to)
    .withGraphFetched('[user.competenceCourses,instructionLocation]');

  res.send(instructionSessions);
};

module.exports = getPublicInstructionSessions;
