const yup = require('yup');
const dateFns = require('date-fns');

const { InstructionSession } = require('../models');

const querySchema = yup.object().shape({
  from: yup.date().default(() => dateFns.subDays(new Date(), 30)),
  to: yup.date().default(() => dateFns.addDays(new Date(), 30)),
});

const getInstructionSessions = async (req, res) => {
  const { from, to } = await querySchema.validate(req.query);

  const instructionSessions = await InstructionSession.query()
    .where((builder) => builder.where('sessionDate', '>=', from))
    .andWhere((builder) => builder.where('sessionDate', '<=', to))
    .withGraphFetched('user.competenceCourses');

  res.send(instructionSessions);
};

module.exports = getInstructionSessions;
