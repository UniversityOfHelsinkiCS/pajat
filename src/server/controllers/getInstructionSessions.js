const yup = require('yup');
const dateFns = require('date-fns');

const { InstructionSession } = require('../models');

const querySchema = yup.object().shape({
  from: yup.date().default(() => dateFns.subDays(new Date(), 30)),
  to: yup
    .date()
    .default(() => dateFns.addDays(new Date(), 30))
    .min(yup.ref('from')),
});

const getInstructionSessions = async (req, res) => {
  const { from, to } = await querySchema.validate(req.query);

  const instructionSessions = await InstructionSession.query()
    .andWhere('sessionDate', '>=', from)
    .andWhere('sessionDate', '<=', to)
    .withGraphFetched('[user.competenceCourses,instructionLocation]');

  const publicInstructionSessions = instructionSessions.map((session) =>
    session.toPublicObject(),
  );

  res.send(publicInstructionSessions);
};

module.exports = getInstructionSessions;
