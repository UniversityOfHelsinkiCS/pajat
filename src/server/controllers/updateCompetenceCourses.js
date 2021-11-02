const { transaction } = require('objection');

const { UserCourseCompetence, User } = require('../models');
const { ForbiddenError } = require('../utils/errors');

const updateCompetenceCourses = async (req, res) => {
  const { user, body: courseIds } = req;

  if (!user.hasInstructorAccess()) {
    throw new ForbiddenError('Instructor access is required');
  }

  const payload = courseIds.map((courseId) => ({ courseId, userId: user.id }));

  await transaction(UserCourseCompetence, async (BoundUserCourseCompetence) => {
    await BoundUserCourseCompetence.query().where({ userId: user.id }).delete();

    await BoundUserCourseCompetence.query().insert(payload);
  });

  const updatedUser = await User.query()
    .findById(user.id)
    .withGraphFetched('competenceCourses');

  res.send(updatedUser);
};

module.exports = updateCompetenceCourses;
