const { User } = require('../models');
const { ForbiddenError } = require('../utils/errors');

const updateCompetenceCourses = async (req, res) => {
  const { user, body: courseIds } = req;

  if (!user.hasInstructorAccess()) {
    throw new ForbiddenError('Instructor access is required');
  }

  await user.updateCompetenceCourses(courseIds);

  const updatedUser = await User.query()
    .findById(user.id)
    .withGraphFetched('competenceCourses');

  res.send(updatedUser);
};

module.exports = updateCompetenceCourses;
