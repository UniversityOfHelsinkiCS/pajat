const yup = require('yup');

const { InstructionSession } = require('../models');
const { ForbiddenError } = require('../utils/errors');

const hourSchema = yup.number().min(0).max(23);

const bodySchema = yup.object().shape({
  startHour: hourSchema.required(),
  endHour: hourSchema.required().moreThan(yup.ref('startHour')),
  sessionDate: yup.date().required(),
});

const createInstructionSession = async (req, res) => {
  const { user } = req;

  const { startHour, endHour, sessionDate } = await bodySchema.validate(
    req.body,
  );

  if (!user.hasInstructorAccess()) {
    throw new ForbiddenError('Instructor access is required');
  }

  const course = await InstructionSession.query()
    .insert(
      InstructionSession.fromHourRange({
        startHour,
        endHour,
        sessionDate,
        userId: user.id,
      }),
    )
    .returning('*');

  res.send(course);
};

module.exports = createInstructionSession;
