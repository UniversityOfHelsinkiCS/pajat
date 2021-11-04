const yup = require('yup');
const dateFns = require('date-fns');

const { InstructionSession } = require('../models');
const { ForbiddenError } = require('../utils/errors');

const hourSchema = yup.number().min(0).max(23);

const bodySchema = yup.object().shape({
  startHour: hourSchema.required(),
  endHour: hourSchema.required().moreThan(yup.ref('startHour')),
  sessionDate: yup.date().required(),
  repeat: yup.number().min(1).max(48).default(1),
});

const createInstructionSession = async (req, res) => {
  const { user } = req;

  const { repeat, startHour, endHour, sessionDate } = await bodySchema.validate(
    req.body,
  );

  const sessionPayloads = [...Array(repeat)].map((value, index) =>
    InstructionSession.fromHourRange({
      startHour,
      endHour,
      sessionDate: dateFns.addWeeks(sessionDate, index),
      userId: user.id,
    }),
  );

  if (!user.hasInstructorAccess()) {
    throw new ForbiddenError('Instructor access is required');
  }

  const sessions = await InstructionSession.query()
    .insert(sessionPayloads)
    .returning('*');

  res.send(sessions);
};

module.exports = createInstructionSession;
