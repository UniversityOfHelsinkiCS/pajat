const { InstructionSession } = require('../models');
const { ForbiddenError } = require('../utils/errors');

const createInstructionSession = async (req, res) => {
  const { user, body } = req;

  const { startHour, endHour, sessionDate } = body;

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
