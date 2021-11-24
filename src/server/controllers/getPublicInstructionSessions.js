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
  courseCodes: yup.string(),
});

const parseCourseCodes = (courseCodesString) => {
  if (typeof courseCodesString !== 'string') {
    return [];
  }

  return courseCodesString
    .split(',')
    .filter(Boolean)
    .map((code) => code.toUpperCase());
};

const getPublicInstructionSessions = async (req, res) => {
  const {
    from,
    to,
    courseCodes: courseCodesString,
  } = await querySchema.validate(req.query);

  const courseCodes = parseCourseCodes(courseCodesString);

  if (dateFns.differenceInDays(from, to) > 180) {
    throw new UserInputError('Maximum from and to range is 180 days');
  }

  let query = InstructionSession.query()
    .andWhere('sessionDate', '>=', from)
    .andWhere('sessionDate', '<=', to)
    .orderBy('sessionDate')
    .withGraphFetched('[user.competenceCourses,instructionLocation]');

  if (courseCodes.length > 0) {
    query = query.modifyGraph('user.competenceCourses', (builder) =>
      builder.whereIn('code', courseCodes),
    );
  }

  const instructionSessions = await query;

  const publicInstructionSessions = instructionSessions
    .filter((session) => session.user.competenceCourses.length > 0)
    .map((session) => session.toPublicObject());

  res.send(publicInstructionSessions);
};

module.exports = getPublicInstructionSessions;
